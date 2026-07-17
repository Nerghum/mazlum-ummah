import { Router } from 'express';
import mongoose from 'mongoose';
import Setting from '../models/Setting.js';
import Media from '../models/Media.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import archiver from 'archiver';
import AdmZip from 'adm-zip';
import fs from 'node:fs';
import path from 'node:path';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.use(authenticate);

function flatten(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
      flatten(value, path, result);
    } else {
      result[path] = value;
    }
  }
  return result;
}

function isNestedObject(val) {
  return val && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date);
}

async function normalizeSettings(settings) {
  // Flatten any corrupted nested-value docs (e.g. key="site" value={title:...,logo:...})
  // into proper flat keys (key="site.title", key="site.logo", etc.)
  const flat = [];
  const corruptedIds = [];
  for (const doc of settings) {
    if (isNestedObject(doc.value)) {
      corruptedIds.push(doc._id);
      const entries = flatten(doc.value, doc.key);
      for (const [key, value] of Object.entries(entries)) {
        flat.push({ ...doc, _id: undefined, key, value, group: key.split('.')[0] || 'general' });
      }
    } else {
      flat.push(doc);
    }
  }
  // Auto-repair: persist flattened entries and remove corrupted docs
  if (corruptedIds.length) {
    const ops = flat
      .filter((item) => !item._id)
      .map((item) => ({
        updateOne: {
          filter: { key: item.key },
          update: { $set: { value: item.value, group: item.group } },
          upsert: true
        }
      }));
    if (ops.length) await Setting.bulkWrite(ops);
    await Setting.deleteMany({ _id: { $in: corruptedIds } });
  }
  return flat;
}

async function enrichSettings(settings) {
  const mediaKeys = ['site.logo', 'site.favicon'];
  const mediaIds = settings
    .filter((item) => mediaKeys.includes(item.key) && mongoose.Types.ObjectId.isValid(String(item.value)))
    .map((item) => item.value);
  const mediaItems = mediaIds.length ? await Media.find({ _id: { $in: mediaIds } }).lean() : [];
  const mediaById = new Map(mediaItems.map((item) => [String(item._id), item]));
  return settings.map((item) => ({
    ...item,
    media: mediaById.get(String(item.value))
  }));
}

router.get('/', authorize('settings:*'), asyncHandler(async (_req, res) => {
  const settings = await Setting.find().lean();
  const normalized = await normalizeSettings(settings);
  res.json({ success: true, data: await enrichSettings(normalized) });
}));

router.put('/', authorize('settings:*'), asyncHandler(async (req, res) => {
  const entries = Object.entries(flatten(req.body));
  await Promise.all(entries.map(([key, value]) => Setting.findOneAndUpdate({ key }, { value, group: key.split('.')[0] || 'general' }, { upsert: true, new: true })));
  res.json({ success: true, message: 'Settings saved' });
}));

router.get('/export', authorize('settings:*'), asyncHandler(async (req, res) => {
  res.attachment('mazlum-ummah-backup.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.on('error', (err) => {
    res.status(500).send({ error: err.message });
  });
  archive.pipe(res);

  const exportData = {};
  for (const modelName of Object.keys(mongoose.models)) {
    const model = mongoose.models[modelName];
    // Find fields that have select: false in the schema so we can explicitly select them for export
    const hiddenFields = Object.keys(model.schema.paths)
      .filter((path) => model.schema.paths[path].options && model.schema.paths[path].options.select === false)
      .map((path) => '+' + path)
      .join(' ');
      
    if (hiddenFields) {
      exportData[modelName] = await model.find({}).select(hiddenFields).lean();
    } else {
      exportData[modelName] = await model.find({}).lean();
    }
  }

  archive.append(JSON.stringify(exportData, null, 2), { name: 'data.json' });

  const uploadsPath = path.resolve(process.cwd(), 'uploads');
  if (fs.existsSync(uploadsPath)) {
    archive.directory(uploadsPath, 'uploads');
  }

  await archive.finalize();
}));

router.post('/import', authorize('settings:*'), upload.single('backup'), asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No backup file uploaded' });
  }

  const zipPath = req.file.path;
  const extractDir = path.resolve(process.cwd(), 'temp_extract_' + Date.now());

  try {
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractDir, true);

    const dataJsonPath = path.join(extractDir, 'data.json');
    if (!fs.existsSync(dataJsonPath)) {
      throw new Error('Invalid backup file: data.json is missing');
    }

    const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));

    // Restore database
    for (const modelName of Object.keys(data)) {
      const model = mongoose.models[modelName];
      if (model && Array.isArray(data[modelName])) {
        await model.collection.deleteMany({});
        if (data[modelName].length > 0) {
          // Ensure _id is properly cast to ObjectId so we don't insert string IDs
          const docs = data[modelName].map((doc) => {
            if (doc._id && typeof doc._id === 'string' && mongoose.Types.ObjectId.isValid(doc._id)) {
              doc._id = new mongoose.Types.ObjectId(doc._id);
            }
            return doc;
          });
          await model.collection.insertMany(docs);
        }
      }
    }

    // Restore uploads
    const uploadsExtractPath = path.join(extractDir, 'uploads');
    if (fs.existsSync(uploadsExtractPath)) {
      const currentUploads = path.resolve(process.cwd(), 'uploads');
      fs.cpSync(uploadsExtractPath, currentUploads, { recursive: true, force: true });
    }

    res.json({ success: true, message: 'Site data imported successfully' });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ success: false, message: 'Failed to import data: ' + error.message });
  } finally {
    if (fs.existsSync(extractDir)) {
      fs.rmSync(extractDir, { recursive: true, force: true });
    }
    if (fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
    }
  }
}));

export default router;


