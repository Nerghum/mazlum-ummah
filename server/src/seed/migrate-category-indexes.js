import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Category from '../models/Category.js';

dotenv.config();

await connectDatabase();

const indexes = await Category.collection.indexes();
const legacySlugIndex = indexes.find((index) => (
  index.unique
  && Object.keys(index.key || {}).length === 1
  && index.key.slug === 1
));

if (legacySlugIndex) {
  await Category.collection.dropIndex(legacySlugIndex.name);
  console.log('Dropped legacy unique category slug index.');
}

await Category.syncIndexes();
console.log('Category indexes synced.');

await mongoose.disconnect();
