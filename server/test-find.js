import mongoose from 'mongoose';
import News from './src/models/News.js';

await mongoose.connect('mongodb://root:rootpassword@localhost:27017/newspaper_cms?authSource=admin');

const now = new Date();
const nowString = now.toISOString();

const filter = {
  status: 'Published',
  $or: [
    { publishDate: { $exists: false } },
    { publishDate: null },
    { publishDate: { $lte: now } },
    { publishDate: { $type: 'string', $lte: nowString } }
  ]
};

const news = await News.find(filter).select('title status publishDate').lean();
console.log('Matches:', news.length);

const all = await News.find().select('title status publishDate').lean();
console.log('All:', all.length);

mongoose.disconnect();
