import mongoose from 'mongoose';
import News from './src/models/News.js';

await mongoose.connect('mongodb://root:rootpassword@localhost:27017/newspaper_cms?authSource=admin');

const news = await News.find().select('title slug status publishDate').lean();
console.log('News:', JSON.stringify(news, null, 2));

mongoose.disconnect();
