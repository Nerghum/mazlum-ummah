import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import Media from '../models/Media.js';
import { env } from '../config/env.js';
import { paginate } from '../utils/apiFeatures.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

export const list = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.type) filter.type = req.query.type;
  if (req.query.folder) filter.folder = req.query.folder;
  if (req.query.search) filter.$text = { $search: req.query.search };
  res.json({ success: true, data: await paginate(Media, filter, req.query) });
});

export const uploadMedia = asyncHandler(async (req, res) => {
  const file = req.file;
  let width;
  let height;
  const isImage = file.mimetype.startsWith('image/');
  if (isImage) {
    const meta = await sharp(file.path).metadata();
    width = meta.width;
    height = meta.height;
  }
  const media = await Media.create({
    filename: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    url: `/uploads/${file.filename}`,
    folder: req.body.folder || 'library',
    type: file.mimetype.startsWith('video/') ? 'video' : 'image',
    altText: req.body.altText,
    width,
    height,
    uploadedBy: req.user.id
  });
  res.status(201).json({ success: true, data: media });
});

export const remove = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) return res.status(204).send();

  const uploadPath = path.resolve(process.cwd(), env.uploadDir);
  const filePath = path.join(uploadPath, media.filename);
  
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  await Media.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export const replaceMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) throw new AppError('Media not found', 404);
  
  const file = req.file;
  if (!file) throw new AppError('No file provided', 400);

  const uploadPath = path.resolve(process.cwd(), env.uploadDir);
  const targetPath = path.join(uploadPath, media.filename);

  // Overwrite the old file with the new file
  fs.copyFileSync(file.path, targetPath);
  fs.unlinkSync(file.path);

  let width, height;
  if (file.mimetype.startsWith('image/')) {
    const meta = await sharp(targetPath).metadata();
    width = meta.width;
    height = meta.height;
  }

  media.originalName = file.originalname;
  media.mimeType = file.mimetype;
  media.size = file.size;
  if (width) media.width = width;
  if (height) media.height = height;

  await media.save();
  
  res.json({ success: true, data: media });
});
