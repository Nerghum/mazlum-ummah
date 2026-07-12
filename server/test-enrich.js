import mongoose from 'mongoose';
import Setting from './src/models/Setting.js';
import Media from './src/models/Media.js';

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

async function run() {
  await mongoose.connect('mongodb://localhost:27017/mazlumummah2');
  const settings = await Setting.find({ key: { $in: ['site.logo', 'site.favicon'] } }).lean();
  console.log(await enrichSettings(settings));
  process.exit(0);
}
run();
