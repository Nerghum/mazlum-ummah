import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Blog from '../models/Blog.js';
import Category from '../models/Category.js';
import Country from '../models/Country.js';
import HomepageSection from '../models/HomepageSection.js';
import MenuItem from '../models/MenuItem.js';
import News from '../models/News.js';
import Setting from '../models/Setting.js';
import User from '../models/User.js';
import { makeSlug } from '../utils/slug.js';

dotenv.config();
await connectDatabase();

await mongoose.connection.db.dropDatabase();

const superAdmin = await User.create({
  name: 'Super Admin',
  email: 'superadmin@news.local',
  password: 'Admin123!',
  role: 'Super Admin'
});

const editor = await User.create({
  name: 'Managing Editor',
  email: 'editor@news.local',
  password: 'Admin123!',
  role: 'Editor'
});

const categories = await Category.insertMany([
  { type: 'news', name: 'Politics', slug: 'politics', sortOrder: 1, seoTitle: 'Politics News' },
  { type: 'news', name: 'World', slug: 'world', sortOrder: 2 },
  { type: 'news', name: 'Sports', slug: 'sports', sortOrder: 3 },
  { type: 'news', name: 'Technology', slug: 'technology', sortOrder: 4 }
]);

const countries = await Country.insertMany([
  { name: 'Bangladesh', code: 'BD', slug: 'bangladesh', flag: '🇧🇩', sortOrder: 1 },
  { name: 'United States', code: 'US', slug: 'united-states', flag: '🇺🇸', sortOrder: 2 },
  { name: 'United Kingdom', code: 'GB', slug: 'united-kingdom', flag: '🇬🇧', sortOrder: 3 }
]);

const sampleNews = await News.insertMany([
  {
    title: { en: 'CMS Launches With Modern Editorial Workflow', bn: 'আধুনিক সম্পাদকীয় কর্মপ্রবাহসহ সিএমএস চালু' },
    slug: makeSlug('CMS Launches With Modern Editorial Workflow'),
    shortUrl: '/n/launch1',
    shortDescription: { en: 'A production-ready workflow for fast-moving newsrooms.', bn: 'দ্রুতগতির নিউজরুমের জন্য প্রোডাকশন-রেডি কর্মপ্রবাহ।' },
    content: { en: '<p>This seeded story demonstrates publishing, SEO, homepage placement, and analytics fields.</p>', bn: '<p>এই নমুনা সংবাদে প্রকাশনা, এসইও, হোমপেজ অবস্থান এবং অ্যানালিটিক্স ফিল্ড দেখানো হয়েছে।</p>' },
    author: editor._id,
    publishedBy: superAdmin._id,
    status: 'Published',
    publishDate: new Date(),
    country: [countries[0]._id],
    mainCategory: categories[3]._id,
    featuredNews: true,
    breakingNews: true,
    isTrending: true,
    isHeadline: true,
    readingTime: 1,
    language: 'both'
  }
]);

await Blog.insertMany([
  {
    title: { en: 'Editor Blog: Building A Bilingual Newsroom', bn: 'সম্পাদকীয় ব্লগ: দ্বিভাষিক নিউজরুম তৈরি' },
    slug: makeSlug('Editor Blog Building A Bilingual Newsroom'),
    shortUrl: '/b/blog1',
    shortDescription: { en: 'A sample blog post with English and Bangla fields.', bn: 'ইংরেজি ও বাংলা ফিল্ডসহ একটি নমুনা ব্লগ পোস্ট।' },
    content: { en: '<p>This blog demonstrates bilingual blog publishing without homepage positioning.</p>', bn: '<p>এই ব্লগে হোমপেজ পজিশনিং ছাড়াই দ্বিভাষিক ব্লগ প্রকাশনা দেখানো হয়েছে।</p>' },
    author: editor._id,
    publishedBy: superAdmin._id,
    status: 'Published',
    publishDate: new Date(),
    mainCategory: categories[3]._id,
    isFeatured: true,
    readingTime: 1,
    language: 'both'
  }
]);

await HomepageSection.insertMany([
  { title: { en: 'Hero Slider', bn: 'হিরো স্লাইডার' }, key: 'hero-slider', type: 'Hero Slider', order: 1, news: sampleNews.map((item) => item._id) },
  { title: { en: 'Breaking News', bn: 'ব্রেকিং নিউজ' }, key: 'breaking-news', type: 'Breaking News', order: 2, news: sampleNews.map((item) => item._id) },
  { title: { en: 'Featured News', bn: 'ফিচার্ড নিউজ' }, key: 'featured-news', type: 'Featured News', order: 3, news: sampleNews.map((item) => item._id) }
]);

await Setting.insertMany([
  { key: 'protection.disableCopy', value: true, group: 'protection' },
  { key: 'protection.disableRightClick', value: true, group: 'protection' },
  { key: 'protection.watermark', value: 'News Portal', group: 'protection' },
  { key: 'newsletter.enabled', value: true, group: 'newsletter' },
  { key: 'push.enabled', value: false, group: 'push' },
  { key: 'ads.enabled', value: true, group: 'ads' }
]);

/* ── Header Menu Items (mirrors frontend nav-items.ts) ── */
const menuHome = await MenuItem.create({ label: { en: 'Home', bn: 'হোম' }, url: '/', order: 1 });
const menuNews = await MenuItem.create({ label: { en: 'News', bn: 'সংবাদ' }, url: '/news/sudan', order: 2 });
await MenuItem.insertMany([
  { label: { en: 'Sudan', bn: 'সুদান' }, url: '/news/sudan', parent: menuNews._id, order: 1 },
  { label: { en: 'Gaza', bn: 'গাজা' }, url: '/news/gaza', parent: menuNews._id, order: 2 },
  { label: { en: 'Middle East', bn: 'মধ্যপ্রাচ্য' }, url: '/news/middle-east', parent: menuNews._id, order: 3 },
  { label: { en: 'Africa', bn: 'আফ্রিকা' }, url: '/news/africa', parent: menuNews._id, order: 4 }
]);
await MenuItem.create({ label: { en: 'Media Achievements', bn: 'মিডিয়া অ্যাচিভমেন্টস' }, url: '/media-achievements', order: 3 });
await MenuItem.create({ label: { en: 'Social Posts', bn: 'সোশ্যাল পোস্ট' }, url: '/social-posts', order: 4 });
await MenuItem.create({ label: { en: 'Gallery', bn: 'গ্যালারি' }, url: '/gallery', order: 5 });
await MenuItem.create({ label: { en: 'Blog', bn: 'ব্লগ' }, url: '/blogs', order: 6 });
await MenuItem.create({ label: { en: 'Notice', bn: 'নোটিশ' }, url: '/notice', order: 7 });
await MenuItem.create({ label: { en: 'Contact', bn: 'যোগাযোগ' }, url: '/contact', order: 8 });

console.log('Seed complete. Login: superadmin@news.local / Admin123!');
process.exit(0);
