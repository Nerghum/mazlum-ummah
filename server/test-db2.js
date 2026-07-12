import mongoose from 'mongoose';
import Setting from './src/models/Setting.js';

async function run() {
  await mongoose.connect('mongodb://localhost:27017/mazlumummah2');
  const settings = await Setting.find().lean();
  console.log(settings.map(s => ({ key: s.key, value: s.value })));
  process.exit(0);
}
run();
