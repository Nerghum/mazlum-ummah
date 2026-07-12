import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
const allowedOrigins = (process.env.ALLOWED_ORIGINS || clientUrl)
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/newspaper_cms',
  clientUrl,
  allowedOrigins,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'dev-access-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
  jwtAccessExpires: process.env.JWT_ACCESS_EXPIRES || '15m',
  jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES || '7d',
  resetMinutes: Number(process.env.PASSWORD_RESET_EXPIRES_MINUTES || 15),
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  maxFileMb: Number(process.env.MAX_FILE_MB || 25)
};
