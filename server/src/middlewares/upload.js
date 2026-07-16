import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

const uploadPath = path.resolve(process.cwd(), env.uploadDir);
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const basename = path.basename(file.originalname, extension)
      .normalize('NFKD')
      .replace(/[^\w-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80) || 'media';
    cb(null, `${Date.now()}-${basename}${extension}`);
  }
});

const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'image/x-icon', 'image/vnd.microsoft.icon'];

export const upload = multer({
  storage,
  limits: { fileSize: env.maxFileMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowed.includes(file.mimetype)) return cb(new AppError('Unsupported file type', 400));
    cb(null, true);
  }
});
