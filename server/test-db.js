import mongoose from 'mongoose';
import News from './src/models/News.js';
import Category from './src/models/Category.js';

await mongoose.connect('mongodb://localhost:27017/mazlum-ummah');

const news = await News.find().select('title slug status publishDate categories mainCategory').lean();
console.log('News:', JSON.stringify(news, null, 2));

const cats = await Category.find().select('name slug isActive type').lean();
console.log('Categories:', JSON.stringify(cats, null, 2));

mongoose.disconnect();
