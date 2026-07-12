import mongoose from 'mongoose';
import Setting from './src/models/Setting.js';

async function run() {
  await mongoose.connect('mongodb://localhost:27017/mazlumummah2');
  const settings = await Setting.find({ key: { $in: ['site.logo', 'site.favicon'] } }).lean();
  console.log(settings);
  process.exit(0);
}
run();
