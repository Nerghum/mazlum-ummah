import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Blog from '../models/Blog.js';
import Category from '../models/Category.js';
import HomepageSection from '../models/HomepageSection.js';
import News from '../models/News.js';

dotenv.config();

await connectDatabase();

const news = await News.find({ status: 'Published' }).sort('-isPinned -publishDate').limit(12);
const blogs = await Blog.find({ status: 'Published' }).sort('-publishDate').limit(9);
const newsCategories = await Category.find({ type: 'news', isActive: true }).sort('sortOrder name').limit(5);
const blogCategories = await Category.find({ type: 'blog', isActive: true }).sort('sortOrder name').limit(5);

const newsCategoryIds = newsCategories.map((category) => category._id);
const blogCategoryIds = blogCategories.map((category) => category._id);

const sections = [
  {
    title: { en: 'Hero Slider', bn: 'হিরো স্লাইডার' },
    key: 'hero-slider',
    type: 'Hero Slider',
    order: 1,
    news: news.slice(0, 3).map((item) => item._id),
    cards: [
      {
        title: { en: 'Stand With The Mazlum Ummah', bn: 'মযলুম উম্মাহর পাশে দাঁড়াই' },
        buttonText: { en: 'Learn more', bn: 'আরও জানুন' },
        imageUrl: '/hero-bg.png',
        link: '/about',
        order: 1
      }
    ],
    settings: { mode: 'manual', limit: 3 }
  },
  {
    title: { en: "Today's News", bn: 'আজকের সংবাদ' },
    key: 'todays-news',
    type: "Today's News",
    order: 3,
    news: news.slice(0, 6).map((item) => item._id),
    settings: { mode: 'auto', limit: 6 }
  },
  {
    title: { en: 'Humanitarian Crisis', bn: 'মুসলিম বিশ্বে চলমান মানবিক সংকট' },
    key: 'humanitarian-crisis',
    type: 'Manual Cards',
    order: 4,
    cards: [
      {
        title: { en: 'Gaza Emergency', bn: 'গাজা জরুরি পরিস্থিতি' },
        description: { en: 'Humanitarian updates and verified relief stories.', bn: 'মানবিক আপডেট ও যাচাইকৃত সহায়তার গল্প।' },
        imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&h=400&q=80',
        link: '/news/gaza',
        order: 1
      },
      {
        title: { en: 'Sudan Crisis', bn: 'সুদান সংকট' },
        description: { en: 'Coverage from affected families and communities.', bn: 'ক্ষতিগ্রস্ত পরিবার ও কমিউনিটির খবর।' },
        imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&h=400&q=80',
        link: '/news/sudan',
        order: 2
      },
      {
        title: { en: 'Palestine Relief', bn: 'ফিলিস্তিন সহায়তা' },
        description: { en: 'Relief response, medical support, and community aid.', bn: 'ত্রাণ, চিকিৎসা সহায়তা ও কমিউনিটি সাপোর্ট।' },
        imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&h=400&q=80',
        link: '/news/gaza',
        order: 3
      },
      {
        title: { en: 'Emergency Aid', bn: 'জরুরি সহায়তা' },
        description: { en: 'Rapid response for families affected by crisis.', bn: 'সংকটে ক্ষতিগ্রস্ত পরিবারের জন্য দ্রুত সহায়তা।' },
        imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&h=400&q=80',
        link: '/get-involved',
        order: 4
      },
      {
        title: { en: 'Community Support', bn: 'কমিউনিটি সাপোর্ট' },
        description: { en: 'Stories of resilience, recovery, and collective action.', bn: 'ধৈর্য, পুনরুদ্ধার ও সম্মিলিত উদ্যোগের গল্প।' },
        imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&h=400&q=80',
        link: '/blogs',
        order: 5
      }
    ],
    settings: { mode: 'manual', limit: 5 }
  },
  {
    title: { en: 'News Categories', bn: 'সংবাদ বিভাগ' },
    key: 'news-categories',
    type: 'News Categories',
    order: 5,
    categories: newsCategoryIds,
    news: news.map((item) => item._id),
    settings: { mode: 'auto', limit: 6 }
  },
  {
    title: { en: 'Blog Categories', bn: 'ব্লগ বিভাগ' },
    key: 'blog-categories',
    type: 'Blog Categories',
    order: 6,
    categories: blogCategoryIds,
    blogs: blogs.map((item) => item._id),
    settings: { mode: 'auto', limit: 3 }
  },
  {
    title: { en: 'Videos', bn: 'ভিডিও' },
    key: 'home-videos',
    type: 'Video News',
    order: 7,
    news: news.filter((item) => item.videoUrl).map((item) => item._id),
    settings: { mode: 'auto', limit: 6 }
  },
  {
    title: { en: 'Home Ad Slot', bn: 'হোম বিজ্ঞাপন' },
    key: 'home-ad-slot',
    type: 'Ad Slot',
    order: 8,
    adPosition: 'home_builder_ad_1',
    settings: { mode: 'manual', limit: 1 }
  }
];

for (const section of sections) {
  await HomepageSection.findOneAndUpdate(
    { key: section.key },
    { $setOnInsert: { isActive: true }, $set: section },
    { upsert: true, new: true }
  );
}

console.log(`Homepage builder sections ensured: ${sections.length}`);

await mongoose.disconnect();
