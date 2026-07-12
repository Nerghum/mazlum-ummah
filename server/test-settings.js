import mongoose from 'mongoose';
import Setting from './src/models/Setting.js';
import Media from './src/models/Media.js';

async function run() {
  await mongoose.connect('mongodb://localhost:27017/mazlumummah2');
  const settings = await Setting.find().lean();
  console.log(settings.filter(s => s.key === 'site.logo' || s.key === 'site.favicon'));
  process.exit(0);
}
run();
