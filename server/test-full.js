import mongoose from 'mongoose';
import Setting from './src/models/Setting.js';
import Media from './src/models/Media.js';

async function run() {
  await mongoose.connect('mongodb://localhost:27017/mazlumummah2');
  
  // 1. Create a dummy media
  const media = await Media.create({
    originalName: 'logo.png',
    filename: 'logo-123.png',
    mimeType: 'image/png',
    size: 1024,
    url: '/uploads/logo-123.png',
    uploadedBy: new mongoose.Types.ObjectId()
  });

  // 2. Simulate saving setting
  await Setting.findOneAndUpdate(
    { key: 'site.logo' },
    { value: media._id.toString(), group: 'site' },
    { upsert: true, new: true }
  );

  // 3. Simulate api.get('/settings')
  const settings = await Setting.find({ key: 'site.logo' }).lean();
  
  const mediaKeys = ['site.logo', 'site.favicon'];
  const mediaIds = settings
    .filter((item) => mediaKeys.includes(item.key) && mongoose.Types.ObjectId.isValid(String(item.value)))
    .map((item) => item.value);
    
  const mediaItems = mediaIds.length ? await Media.find({ _id: { $in: mediaIds } }).lean() : [];
  const mediaById = new Map(mediaItems.map((item) => [String(item._id), item]));
  
  const enrichedSettings = settings.map((item) => ({
    ...item,
    media: mediaById.get(String(item.value))
  }));

  console.log("Enriched:", JSON.stringify(enrichedSettings, null, 2));

  // cleanup
  await Media.findByIdAndDelete(media._id);
  await Setting.findOneAndDelete({ key: 'site.logo' });

  process.exit(0);
}
run();
