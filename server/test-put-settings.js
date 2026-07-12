import mongoose from 'mongoose';
import Setting from './src/models/Setting.js';

async function run() {
  await mongoose.connect('mongodb://localhost:27017/mazlumummah2');
  const values = {
    'site.logo': '66919db1d3f56303f8888888',
    'site.favicon': '66919db1d3f56303f8888888',
  };
  const entries = Object.entries(values);
  await Promise.all(entries.map(([key, value]) => Setting.findOneAndUpdate({ key }, { value, group: key.split('.')[0] || 'general' }, { upsert: true, new: true })));
  const settings = await Setting.find({ key: { $in: ['site.logo', 'site.favicon'] } }).lean();
  console.log(settings);
  process.exit(0);
}
run();
