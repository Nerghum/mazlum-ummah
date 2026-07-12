import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Blog from '../models/Blog.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import { makeSlug } from '../utils/slug.js';

dotenv.config();

const now = new Date();

const categorySeeds = [
  { type: 'blog', name: 'General', slug: 'general', sortOrder: 1, seoTitle: 'General' },
  { type: 'blog', name: 'Community', slug: 'community', sortOrder: 2, seoTitle: 'Community' },
  { type: 'blog', name: 'Education', slug: 'education', sortOrder: 3, seoTitle: 'Education' },
  { type: 'blog', name: 'Human Rights', slug: 'human-rights', sortOrder: 4, seoTitle: 'Human Rights' },
  { type: 'blog', name: 'Technology', slug: 'technology', sortOrder: 5, seoTitle: 'Technology' }
];

const blogSeeds = [
  {
    title: {
      en: 'Building A Bilingual Editorial Workflow',
      bn: 'দ্বিভাষিক সম্পাদকীয় কর্মপ্রবাহ তৈরি'
    },
    subtitle: {
      en: 'How a newsroom can publish clearly in Bangla and English.',
      bn: 'বাংলা ও ইংরেজিতে কীভাবে পরিষ্কারভাবে প্রকাশনা করা যায়।'
    },
    shortDescription: {
      en: 'A practical guide to organizing multilingual blog and news content.',
      bn: 'বহুভাষিক ব্লগ ও সংবাদ কনটেন্ট সাজানোর একটি ব্যবহারিক গাইড।'
    },
    content: {
      en: '<p>A bilingual editorial workflow helps teams publish consistently for readers in different languages.</p><p>The key is to keep every core field structured, review both language versions, and preserve one shared SEO strategy for search visibility.</p>',
      bn: '<p>দ্বিভাষিক সম্পাদকীয় কর্মপ্রবাহ ভিন্ন ভাষার পাঠকদের জন্য ধারাবাহিকভাবে প্রকাশ করতে দলকে সহায়তা করে।</p><p>মূল বিষয় হলো প্রতিটি প্রধান ফিল্ড গঠনমূলক রাখা, দুই ভাষার সংস্করণ পর্যালোচনা করা এবং সার্চ ভিজিবিলিটির জন্য একটি একক এসইও কৌশল বজায় রাখা।</p>'
    },
    categorySlug: 'education',
    isFeatured: true,
    isPinned: true,
    views: 740
  },
  {
    title: {
      en: 'Why Community Documentation Matters',
      bn: 'কমিউনিটি ডকুমেন্টেশন কেন গুরুত্বপূর্ণ'
    },
    subtitle: {
      en: 'Preserving stories, context, and trusted local knowledge.',
      bn: 'গল্প, প্রেক্ষাপট ও বিশ্বস্ত স্থানীয় জ্ঞান সংরক্ষণ।'
    },
    shortDescription: {
      en: 'Community documentation creates a living record of needs, action, and impact.',
      bn: 'কমিউনিটি ডকুমেন্টেশন প্রয়োজন, উদ্যোগ ও প্রভাবের জীবন্ত রেকর্ড তৈরি করে।'
    },
    content: {
      en: '<p>When communities document their own stories, they protect memory and make support efforts more transparent.</p><p>Good documentation includes dates, locations, verified voices, and clear updates so future readers can understand what happened and why it mattered.</p>',
      bn: '<p>কমিউনিটি যখন নিজের গল্প নিজেই নথিভুক্ত করে, তখন স্মৃতি সংরক্ষিত হয় এবং সহায়তা কার্যক্রম আরও স্বচ্ছ হয়।</p><p>ভালো ডকুমেন্টেশনে তারিখ, স্থান, যাচাইকৃত বক্তব্য এবং পরিষ্কার আপডেট থাকে, যাতে ভবিষ্যৎ পাঠক বুঝতে পারেন কী ঘটেছে এবং কেন তা গুরুত্বপূর্ণ।</p>'
    },
    categorySlug: 'community',
    isFeatured: true,
    views: 620
  },
  {
    title: {
      en: 'Designing Humane Digital Archives',
      bn: 'মানবিক ডিজিটাল আর্কাইভ ডিজাইন'
    },
    subtitle: {
      en: 'Balancing access, dignity, and long-term preservation.',
      bn: 'প্রবেশাধিকার, মর্যাদা ও দীর্ঘমেয়াদি সংরক্ষণের ভারসাম্য।'
    },
    shortDescription: {
      en: 'Digital archives should protect people while keeping important records accessible.',
      bn: 'ডিজিটাল আর্কাইভ গুরুত্বপূর্ণ রেকর্ড সহজলভ্য রাখার পাশাপাশি মানুষকে সুরক্ষিত রাখবে।'
    },
    content: {
      en: '<p>A humane archive does more than store files. It considers consent, context, safety, and how material may be used over time.</p><p>Editorial teams should define review policies, metadata standards, and privacy boundaries before publishing sensitive records.</p>',
      bn: '<p>মানবিক আর্কাইভ শুধু ফাইল সংরক্ষণ করে না। এটি সম্মতি, প্রেক্ষাপট, নিরাপত্তা এবং সময়ের সঙ্গে তথ্যের ব্যবহার কীভাবে হবে তা বিবেচনা করে।</p><p>সংবেদনশীল রেকর্ড প্রকাশের আগে সম্পাদকীয় দলকে রিভিউ নীতি, মেটাডেটা মান এবং গোপনীয়তার সীমা নির্ধারণ করা উচিত।</p>'
    },
    categorySlug: 'technology',
    isFeatured: false,
    views: 510
  },
  {
    title: {
      en: 'A Field Guide For Volunteer Writers',
      bn: 'স্বেচ্ছাসেবী লেখকদের জন্য মাঠপর্যায়ের গাইড'
    },
    subtitle: {
      en: 'Simple rules for accurate, respectful reporting.',
      bn: 'সঠিক ও সম্মানজনক প্রতিবেদনের সহজ নিয়ম।'
    },
    shortDescription: {
      en: 'Volunteer writers can improve quality by following a simple editorial checklist.',
      bn: 'স্বেচ্ছাসেবী লেখকেরা সহজ সম্পাদকীয় চেকলিস্ট অনুসরণ করে মান উন্নত করতে পারেন।'
    },
    content: {
      en: '<p>Volunteer writers often work close to the people and events they cover. That closeness is valuable, but it also requires care.</p><p>Check names, avoid assumptions, separate observation from opinion, and always preserve the dignity of the people being described.</p>',
      bn: '<p>স্বেচ্ছাসেবী লেখকেরা প্রায়ই যাদের নিয়ে লেখেন তাদের খুব কাছাকাছি থেকে কাজ করেন। এই ঘনিষ্ঠতা মূল্যবান, তবে এতে সতর্কতাও প্রয়োজন।</p><p>নাম যাচাই করুন, অনুমান এড়িয়ে চলুন, পর্যবেক্ষণ ও মতামত আলাদা রাখুন এবং যাদের নিয়ে লেখা হচ্ছে তাদের মর্যাদা সবসময় বজায় রাখুন।</p>'
    },
    categorySlug: 'general',
    isFeatured: false,
    views: 430
  },
  {
    title: {
      en: 'The Ethics Of Publishing Sensitive Stories',
      bn: 'সংবেদনশীল গল্প প্রকাশের নৈতিকতা'
    },
    subtitle: {
      en: 'Editorial caution is part of responsible storytelling.',
      bn: 'দায়িত্বশীল গল্প বলার অংশ হলো সম্পাদকীয় সতর্কতা।'
    },
    shortDescription: {
      en: 'Sensitive stories need verification, care, and clear editorial boundaries.',
      bn: 'সংবেদনশীল গল্পের জন্য যাচাই, যত্ন ও পরিষ্কার সম্পাদকীয় সীমা প্রয়োজন।'
    },
    content: {
      en: '<p>Publishing sensitive stories can help communities be seen, but careless publication can also create risk.</p><p>Editors should weigh public interest, consent, identifying details, and potential harm before publishing any personal or traumatic account.</p>',
      bn: '<p>সংবেদনশীল গল্প প্রকাশ কমিউনিটিকে দৃশ্যমান করতে পারে, তবে অসতর্ক প্রকাশ ঝুঁকিও তৈরি করতে পারে।</p><p>ব্যক্তিগত বা ট্রমাটিক বিবরণ প্রকাশের আগে সম্পাদকদের জনস্বার্থ, সম্মতি, পরিচয় প্রকাশের ঝুঁকি এবং সম্ভাব্য ক্ষতি বিবেচনা করা উচিত।</p>'
    },
    categorySlug: 'human-rights',
    isFeatured: true,
    views: 890
  }
];

async function upsertBySlug(Model, seed) {
  return Model.findOneAndUpdate({ slug: seed.slug, type: seed.type }, { $setOnInsert: seed }, { new: true, upsert: true });
}

await connectDatabase();

const superAdmin = await User.findOne({ role: 'Super Admin' }).sort({ createdAt: 1 });
let editor = await User.findOne({ role: 'Editor' }).sort({ createdAt: 1 });

if (!editor) {
  editor = await User.create({
    name: 'Managing Editor',
    email: 'editor@news.local',
    password: 'Admin123!',
    role: 'Editor'
  });
}

const publisher = superAdmin || editor;

const categories = new Map();
for (const seed of categorySeeds) {
  const category = await upsertBySlug(Category, seed);
  categories.set(category.slug, category);
}

const savedBlogs = [];
for (const [index, seed] of blogSeeds.entries()) {
  const slug = makeSlug(seed.title.en);
  const category = categories.get(seed.categorySlug);

  const blog = await Blog.findOneAndUpdate(
    { slug },
    {
      $set: {
        title: seed.title,
        subtitle: seed.subtitle,
        shortDescription: seed.shortDescription,
        content: seed.content,
        shortUrl: `/b/demo${index + 1}`,
        author: editor._id,
        publishedBy: publisher._id,
        publishDate: new Date(now.getTime() - index * 90 * 60 * 1000),
        status: 'Published',
        mainCategory: category?._id,
        seoTitle: seed.title.en,
        seoDescription: seed.shortDescription.en,
        seoKeywords: ['mazlum ummah', seed.categorySlug, 'blog'],
        readingTime: 2,
        language: 'both',
        views: seed.views,
        isFeatured: seed.isFeatured,
        isPinned: Boolean(seed.isPinned),
        allowComments: true
      }
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  savedBlogs.push(blog);
}

console.log(`Upserted ${savedBlogs.length} blog records.`);
console.log(savedBlogs.map((item) => `${item.slug} -> ${item.shortUrl}`).join('\n'));

await mongoose.disconnect();
