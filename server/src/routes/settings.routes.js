import { Router } from 'express';
import mongoose from 'mongoose';
import Setting from '../models/Setting.js';
import Media from '../models/Media.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

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

export default router;


