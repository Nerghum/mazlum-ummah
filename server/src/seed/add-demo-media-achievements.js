import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Media from '../models/Media.js';
import MediaAchievement from '../models/MediaAchievement.js';
import User from '../models/User.js';
import { makeShortCode } from '../utils/slug.js';

dotenv.config();
await connectDatabase();

const user = await User.findOne({ role: 'Super Admin' }).lean() || await User.findOne().lean();
if (!user) {
  throw new Error('No user found. Run the main seed first or create an admin user.');
}

const images = [
  {
    filename: 'media-achievement-press-room.jpg',
    originalName: 'Media achievement press room',
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    altText: 'Press room coverage'
  },
  {
    filename: 'media-achievement-conference.jpg',
    originalName: 'Media achievement conference',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    altText: 'Conference coverage'
  },
  {
    filename: 'media-achievement-analytics.jpg',
    originalName: 'Media achievement analytics',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    altText: 'Analytics media coverage'
  }
];

const media = [];
for (const image of images) {
  const item = await Media.findOneAndUpdate(
    { filename: image.filename },
    { ...image, mimeType: 'image/jpeg', size: 0, folder: 'media-achievements', type: 'image', uploadedBy: user._id },
    { upsert: true, new: true, runValidators: true }
  );
  media.push(item);
}

async function uniqueShortUrl(slug) {
  const existing = await MediaAchievement.findOne({ slug }).lean();
  if (existing?.shortUrl) return existing.shortUrl;
  return `/ma/${makeShortCode()}`;
}

const achievements = [
  {
    title: {
      en: 'International Press Highlights The Humanitarian Newsroom',
      bn: 'মানবিক নিউজরুম নিয়ে আন্তর্জাতিক সংবাদমাধ্যমের প্রতিবেদন'
    },
    slug: 'international-press-highlights-humanitarian-newsroom',
    shortDescription: {
      en: 'A feature story about bilingual reporting, field updates, and community-centered media work.',
      bn: 'দ্বিভাষিক রিপোর্টিং, মাঠপর্যায়ের আপডেট এবং কমিউনিটিকেন্দ্রিক মিডিয়া কাজ নিয়ে ফিচার প্রতিবেদন।'
    },
    content: {
      en: '<p>This media achievement highlights how the platform is building a faster, clearer, and more responsible information flow for humanitarian audiences.</p>',
      bn: '<p>এই মিডিয়া অর্জনে মানবিক পাঠকের জন্য দ্রুত, পরিষ্কার ও দায়িত্বশীল তথ্যপ্রবাহ তৈরির কাজ তুলে ধরা হয়েছে।</p>'
    },
    source: { en: 'Global Media Review', bn: 'গ্লোবাল মিডিয়া রিভিউ' },
    linkLabel: { en: 'Read article', bn: 'আর্টিকেল দেখুন' },
    achievementDate: { en: 'April 2026', bn: 'এপ্রিল ২০২৬' },
    cardType: 'photo',
    thumbnailImage: media[0]._id,
    isFeatured: true,
    isPinned: true
  },
  {
    title: {
      en: 'Selected As A Top Social Impact Platform',
      bn: 'শীর্ষ সামাজিক প্রভাব প্ল্যাটফর্ম হিসেবে নির্বাচিত'
    },
    slug: 'selected-top-social-impact-platform',
    shortDescription: {
      en: 'Recognized for accessible publishing workflows and multilingual public-interest content.',
      bn: 'সহজ প্রকাশনা কর্মপ্রবাহ এবং বহুভাষিক জনস্বার্থমূলক কনটেন্টের জন্য স্বীকৃতি।'
    },
    content: {
      en: '<p>The recognition celebrates editorial consistency, public usefulness, and a scalable digital publishing system.</p>',
      bn: '<p>এই স্বীকৃতিতে সম্পাদকীয় ধারাবাহিকতা, জনসেবামূলক উপযোগিতা এবং স্কেলযোগ্য ডিজিটাল প্রকাশনা ব্যবস্থাকে মূল্যায়ন করা হয়েছে।</p>'
    },
    source: { en: 'Annual Recognition', bn: 'বার্ষিক স্বীকৃতি' },
    linkLabel: { en: 'Award profile', bn: 'পুরস্কার প্রোফাইল' },
    achievementDate: { en: '2026 Winner', bn: '২০২৬ সালের বিজয়ী' },
    cardType: 'accent',
    isFeatured: false
  },
  {
    title: {
      en: 'Regional Outlet Covers The Bilingual Editorial Workflow',
      bn: 'দ্বিভাষিক সম্পাদকীয় কর্মপ্রবাহ নিয়ে আঞ্চলিক সংবাদমাধ্যমের কভারেজ'
    },
    slug: 'regional-outlet-covers-bilingual-editorial-workflow',
    shortDescription: {
      en: 'Coverage focused on Bangla and English publishing, media library workflow, and public accessibility.',
      bn: 'বাংলা ও ইংরেজি প্রকাশনা, মিডিয়া লাইব্রেরি কর্মপ্রবাহ এবং জনসাধারণের সহজ প্রবেশাধিকার নিয়ে কভারেজ।'
    },
    content: {
      en: '<p>The article documents how editors can publish bilingual updates with rich media, galleries, and flexible presentation formats.</p>',
      bn: '<p>প্রতিবেদনটিতে সম্পাদকরা কীভাবে রিচ মিডিয়া, গ্যালারি ও নমনীয় উপস্থাপনাসহ দ্বিভাষিক আপডেট প্রকাশ করেন তা তুলে ধরা হয়েছে।</p>'
    },
    source: { en: 'Regional Press', bn: 'আঞ্চলিক প্রেস' },
    linkLabel: { en: 'Read coverage', bn: 'কভারেজ দেখুন' },
    achievementDate: { en: 'May 2026', bn: 'মে ২০২৬' },
    cardType: 'photo',
    thumbnailImage: media[1]._id,
    isFeatured: false
  },
  {
    title: {
      en: 'Digital Media Award For Community Reporting',
      bn: 'কমিউনিটি রিপোর্টিংয়ের জন্য ডিজিটাল মিডিয়া পুরস্কার'
    },
    slug: 'digital-media-award-community-reporting',
    shortDescription: {
      en: 'A recognition for clear reporting tools, transparent archives, and audience-first publishing.',
      bn: 'পরিষ্কার রিপোর্টিং টুল, স্বচ্ছ আর্কাইভ এবং দর্শককেন্দ্রিক প্রকাশনার জন্য স্বীকৃতি।'
    },
    content: {
      en: '<p>The award acknowledges the system’s role in organizing public updates and preserving important community stories.</p>',
      bn: '<p>জনসাধারণের আপডেট সংগঠিত করা এবং গুরুত্বপূর্ণ কমিউনিটি গল্প সংরক্ষণে সিস্টেমটির ভূমিকা এই পুরস্কারে স্বীকৃত হয়েছে।</p>'
    },
    source: { en: 'Digital Awards', bn: 'ডিজিটাল অ্যাওয়ার্ডস' },
    linkLabel: { en: 'Award details', bn: 'পুরস্কারের বিস্তারিত' },
    achievementDate: { en: '2026 Winner', bn: '২০২৬ সালের বিজয়ী' },
    cardType: 'accent',
    isFeatured: false
  },
  {
    title: {
      en: 'Analytics Story Shows Growing Reader Engagement',
      bn: 'পাঠক সম্পৃক্ততার বৃদ্ধি দেখিয়েছে অ্যানালিটিক্স প্রতিবেদন'
    },
    slug: 'analytics-story-growing-reader-engagement',
    shortDescription: {
      en: 'Media coverage on reader growth, content performance, and newsroom analytics.',
      bn: 'পাঠক বৃদ্ধি, কনটেন্ট পারফরম্যান্স এবং নিউজরুম অ্যানালিটিক্স নিয়ে মিডিয়া কভারেজ।'
    },
    content: {
      en: '<p>This coverage highlights how analytics can guide editorial teams while keeping public-interest reporting at the center.</p>',
      bn: '<p>এই কভারেজ দেখিয়েছে কীভাবে অ্যানালিটিক্স সম্পাদকীয় টিমকে দিকনির্দেশনা দিতে পারে, একইসাথে জনস্বার্থমূলক রিপোর্টিংকে কেন্দ্রে রাখে।</p>'
    },
    source: { en: 'Data Desk', bn: 'ডেটা ডেস্ক' },
    linkLabel: { en: 'Read report', bn: 'রিপোর্ট পড়ুন' },
    achievementDate: { en: 'March 2026', bn: 'মার্চ ২০২৬' },
    cardType: 'photo',
    thumbnailImage: media[2]._id,
    isFeatured: false
  }
];

for (const achievement of achievements) {
  await MediaAchievement.findOneAndUpdate(
    { slug: achievement.slug },
    {
      ...achievement,
      shortUrl: await uniqueShortUrl(achievement.slug),
      author: user._id,
      publishedBy: user._id,
      publishDate: new Date(),
      status: 'Published',
      language: 'both',
      readingTime: 1
    },
    { upsert: true, new: true, runValidators: true }
  );
}

console.log(`Seeded ${achievements.length} media achievements.`);
await mongoose.disconnect();
process.exit(0);
