import mongoose from 'mongoose';
import Setting from './src/models/Setting.js';
import Media from './src/models/Media.js';

async function run() {
  await mongoose.connect('mongodb://localhost:27017/mazlumummah2');
  const settings = await Setting.find({ key: { $in: ['site.logo', 'site.favicon'] } }).lean();
  console.log("Settings in DB:", settings);
  const mediaIds = settings.map(s => s.value).filter(Boolean);
  const media = await Media.find({ _id: { $in: mediaIds } }).lean();
  console.log("Media found:", media);
  process.exit(0);
}
run();
