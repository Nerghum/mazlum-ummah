import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Category from '../models/Category.js';
import Country from '../models/Country.js';
import HomepageSection from '../models/HomepageSection.js';
import News from '../models/News.js';
import User from '../models/User.js';
import { makeSlug } from '../utils/slug.js';

dotenv.config();

const now = new Date();

const categorySeeds = [
  { type: 'news', name: 'General', slug: 'general', sortOrder: 1, seoTitle: 'General News' },
  { type: 'news', name: 'World', slug: 'world', sortOrder: 2, seoTitle: 'World News' },
  { type: 'news', name: 'Politics', slug: 'politics', sortOrder: 3, seoTitle: 'Politics News' },
  { type: 'news', name: 'Technology', slug: 'technology', sortOrder: 4, seoTitle: 'Technology News' },
  { type: 'news', name: 'Human Rights', slug: 'human-rights', sortOrder: 5, seoTitle: 'Human Rights News' }
];

const countrySeeds = [
  { name: 'Bangladesh', code: 'BD', slug: 'bangladesh', flag: 'BD', sortOrder: 1 },
  { name: 'Palestine', code: 'PS', slug: 'palestine', flag: 'PS', sortOrder: 2 },
  { name: 'Sudan', code: 'SD', slug: 'sudan', flag: 'SD', sortOrder: 3 }
];

const newsSeeds = [
  {
    title: {
      en: 'Relief Convoy Reaches Families After Weeks Of Blockade',
      bn: 'সপ্তাহব্যাপী অবরোধের পর পরিবারের কাছে পৌঁছাল ত্রাণবহর'
    },
    subtitle: {
      en: 'Community volunteers coordinate food, medicine, and winter supplies.',
      bn: 'খাদ্য, ওষুধ ও শীতবস্ত্র সমন্বয় করছেন কমিউনিটি স্বেচ্ছাসেবীরা।'
    },
    shortDescription: {
      en: 'Aid workers say the latest delivery will support hundreds of displaced families.',
      bn: 'ত্রাণকর্মীরা বলছেন, নতুন সহায়তা শত শত বাস্তুচ্যুত পরিবারকে সহায়তা করবে।'
    },
    content: {
      en: '<p>A community-led relief convoy has reached families who were cut off from regular supplies for weeks.</p><p>Organizers said the delivery includes staple food, essential medicine, blankets, and hygiene kits. Local coordinators will continue tracking urgent needs and distributing support through verified lists.</p>',
      bn: '<p>সপ্তাহের পর সপ্তাহ নিয়মিত সরবরাহ থেকে বিচ্ছিন্ন পরিবারগুলোর কাছে কমিউনিটি-নেতৃত্বাধীন একটি ত্রাণবহর পৌঁছেছে।</p><p>আয়োজকেরা জানান, এই সহায়তায় রয়েছে খাদ্যসামগ্রী, জরুরি ওষুধ, কম্বল এবং স্বাস্থ্যসুরক্ষা কিট। স্থানীয় সমন্বয়কারীরা যাচাইকৃত তালিকার মাধ্যমে জরুরি প্রয়োজন পর্যবেক্ষণ ও সহায়তা বিতরণ চালিয়ে যাবেন।</p>'
    },
    categorySlug: 'general',
    countrySlugs: ['bangladesh'],
    flags: { breakingNews: true, featuredNews: true, isTrending: true, isHeadline: true },
    views: 980,
    priorityOrder: 1,
    homepagePosition: 'hero-slider'
  },
  {
    title: {
      en: 'International Observers Call For Civilian Protection',
      bn: 'বেসামরিক নাগরিকদের সুরক্ষার আহ্বান আন্তর্জাতিক পর্যবেক্ষকদের'
    },
    subtitle: {
      en: 'Rights groups ask all parties to preserve humanitarian access.',
      bn: 'মানবিক সহায়তার পথ খোলা রাখার আহ্বান জানিয়েছে অধিকার সংগঠনগুলো।'
    },
    shortDescription: {
      en: 'The statement urges safe corridors, medical access, and independent monitoring.',
      bn: 'বিবৃতিতে নিরাপদ করিডর, চিকিৎসা প্রবেশাধিকার ও স্বাধীন পর্যবেক্ষণের আহ্বান জানানো হয়েছে।'
    },
    content: {
      en: '<p>International observers have renewed calls for civilian protection and uninterrupted humanitarian access.</p><p>The groups emphasized that hospitals, shelters, and aid distribution points must remain protected under international norms.</p>',
      bn: '<p>বেসামরিক নাগরিকদের সুরক্ষা ও নিরবচ্ছিন্ন মানবিক সহায়তার জন্য আন্তর্জাতিক পর্যবেক্ষকেরা নতুন করে আহ্বান জানিয়েছেন।</p><p>সংগঠনগুলো জোর দিয়ে বলেছে, হাসপাতাল, আশ্রয়কেন্দ্র এবং ত্রাণ বিতরণ কেন্দ্র আন্তর্জাতিক নীতিমালা অনুযায়ী সুরক্ষিত থাকতে হবে।</p>'
    },
    categorySlug: 'world',
    countrySlugs: ['palestine'],
    flags: { featuredNews: true, mostRead: true, isTrending: true },
    views: 1750,
    priorityOrder: 2,
    homepagePosition: 'featured-news'
  },
  {
    title: {
      en: 'Local Clinics Expand Emergency Treatment Hours',
      bn: 'জরুরি চিকিৎসার সময় বাড়াল স্থানীয় ক্লিনিকগুলো'
    },
    subtitle: {
      en: 'Doctors add evening shifts as patient pressure increases.',
      bn: 'রোগীর চাপ বাড়ায় সন্ধ্যাকালীন শিফট যুক্ত করেছেন চিকিৎসকেরা।'
    },
    shortDescription: {
      en: 'Volunteer medical teams are expanding service hours to handle urgent cases.',
      bn: 'জরুরি রোগী সামলাতে সেবার সময় বাড়াচ্ছে স্বেচ্ছাসেবী চিকিৎসক দল।'
    },
    content: {
      en: '<p>Several local clinics have extended emergency treatment hours after a rise in urgent cases.</p><p>Medical volunteers said the added shifts will help patients receive quicker triage, medication, and referral support.</p>',
      bn: '<p>জরুরি রোগীর সংখ্যা বাড়ায় কয়েকটি স্থানীয় ক্লিনিক চিকিৎসাসেবার সময় বাড়িয়েছে।</p><p>স্বেচ্ছাসেবী চিকিৎসকেরা জানান, অতিরিক্ত শিফট রোগীদের দ্রুত প্রাথমিক যাচাই, ওষুধ এবং রেফারেল সহায়তা পেতে সাহায্য করবে।</p>'
    },
    categorySlug: 'human-rights',
    countrySlugs: ['sudan'],
    flags: { selectedNews: true, mostRead: true },
    views: 1230,
    priorityOrder: 3,
    homepagePosition: 'editor-picks'
  },
  {
    title: {
      en: 'Digital Archive Preserves Testimonies From Displaced Communities',
      bn: 'বাস্তুচ্যুত কমিউনিটির সাক্ষ্য সংরক্ষণে ডিজিটাল আর্কাইভ'
    },
    subtitle: {
      en: 'Researchers and volunteers document stories in multiple languages.',
      bn: 'একাধিক ভাষায় গল্প নথিভুক্ত করছেন গবেষক ও স্বেচ্ছাসেবীরা।'
    },
    shortDescription: {
      en: 'The archive aims to protect memory, evidence, and community history.',
      bn: 'স্মৃতি, প্রমাণ ও কমিউনিটির ইতিহাস সংরক্ষণই আর্কাইভটির লক্ষ্য।'
    },
    content: {
      en: '<p>A new digital archive is collecting testimonies, photographs, and verified field notes from displaced communities.</p><p>The project team said multilingual documentation will make the material accessible to researchers, journalists, and rights advocates.</p>',
      bn: '<p>বাস্তুচ্যুত কমিউনিটির সাক্ষ্য, ছবি এবং যাচাইকৃত মাঠপর্যায়ের নোট সংগ্রহ করছে একটি নতুন ডিজিটাল আর্কাইভ।</p><p>প্রকল্প দল জানায়, বহুভাষিক নথিভুক্তি গবেষক, সাংবাদিক ও অধিকারকর্মীদের জন্য তথ্যগুলো সহজলভ্য করবে।</p>'
    },
    categorySlug: 'technology',
    countrySlugs: ['bangladesh', 'palestine'],
    flags: { featuredNews: true, videoNews: true },
    views: 860,
    priorityOrder: 4,
    homepagePosition: 'video-news'
  },
  {
    title: {
      en: 'Community Kitchen Serves Thousands During Emergency Response',
      bn: 'জরুরি সহায়তায় হাজারো মানুষকে খাবার দিচ্ছে কমিউনিটি রান্নাঘর'
    },
    subtitle: {
      en: 'Daily meal distribution continues with local donor support.',
      bn: 'স্থানীয় দাতাদের সহায়তায় প্রতিদিন খাবার বিতরণ অব্যাহত।'
    },
    shortDescription: {
      en: 'Organizers say the kitchen is prioritizing children, older people, and patients.',
      bn: 'আয়োজকেরা বলছেন, শিশু, প্রবীণ ও রোগীদের অগ্রাধিকার দেওয়া হচ্ছে।'
    },
    content: {
      en: '<p>A community kitchen is serving thousands of meals as families face limited access to food and fuel.</p><p>Volunteers are preparing simple nutritious meals and coordinating delivery points with neighborhood committees.</p>',
      bn: '<p>খাদ্য ও জ্বালানির সীমিত প্রবেশাধিকার মোকাবিলায় একটি কমিউনিটি রান্নাঘর হাজারো মানুষের জন্য খাবার পরিবেশন করছে।</p><p>স্বেচ্ছাসেবীরা সহজ পুষ্টিকর খাবার প্রস্তুত করছেন এবং মহল্লা কমিটির সঙ্গে বিতরণ কেন্দ্র সমন্বয় করছেন।</p>'
    },
    categorySlug: 'general',
    countrySlugs: ['sudan'],
    flags: { breakingNews: true, countryWiseFeaturedNews: true, isPinned: true },
    views: 1490,
    priorityOrder: 5,
    homepagePosition: 'breaking-news'
  }
];

async function upsertBySlug(Model, seed) {
  const filter = seed.type ? { slug: seed.slug, type: seed.type } : { slug: seed.slug };
  return Model.findOneAndUpdate(filter, { $setOnInsert: seed }, { new: true, upsert: true });
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

const countries = new Map();
for (const seed of countrySeeds) {
  const country = await upsertBySlug(Country, seed);
  countries.set(country.slug, country);
}

const savedNews = [];
for (const [index, seed] of newsSeeds.entries()) {
  const slug = makeSlug(seed.title.en);
  const category = categories.get(seed.categorySlug);
  const newsCountries = seed.countrySlugs.map((slugKey) => countries.get(slugKey)?._id).filter(Boolean);

  const news = await News.findOneAndUpdate(
    { slug },
    {
      $set: {
        title: seed.title,
        subtitle: seed.subtitle,
        shortDescription: seed.shortDescription,
        content: seed.content,
        shortUrl: `/n/demo${index + 1}`,
        author: editor._id,
        publishedBy: publisher._id,
        publishDate: new Date(now.getTime() - index * 60 * 60 * 1000),
        status: 'Published',
        country: newsCountries,
        mainCategory: category?._id,
        seoTitle: seed.title.en,
        seoDescription: seed.shortDescription.en,
        seoKeywords: ['mazlum ummah', seed.categorySlug, 'news'],
        readingTime: 2,
        language: 'both',
        views: seed.views,
        priorityOrder: seed.priorityOrder,
        homepagePosition: seed.homepagePosition,
        allowComments: true,
        copyrightProtected: false,
        breakingNews: Boolean(seed.flags.breakingNews),
        selectedNews: Boolean(seed.flags.selectedNews),
        featuredNews: Boolean(seed.flags.featuredNews),
        countryWiseFeaturedNews: Boolean(seed.flags.countryWiseFeaturedNews),
        mostRead: Boolean(seed.flags.mostRead),
        videoNews: Boolean(seed.flags.videoNews),
        isTrending: Boolean(seed.flags.isTrending),
        isHeadline: Boolean(seed.flags.isHeadline),
        isPinned: Boolean(seed.flags.isPinned)
      }
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  savedNews.push(news);
}

await HomepageSection.findOneAndUpdate(
  { key: 'hero-slider' },
  { title: { en: 'Hero Slider', bn: 'হিরো স্লাইডার' }, key: 'hero-slider', type: 'Hero Slider', order: 1, news: savedNews.map((item) => item._id), isActive: true },
  { upsert: true }
);

await HomepageSection.findOneAndUpdate(
  { key: 'breaking-news' },
  {
    title: { en: 'Breaking News', bn: 'ব্রেকিং নিউজ' },
    key: 'breaking-news',
    type: 'Breaking News',
    order: 2,
    news: savedNews.filter((item) => item.breakingNews).map((item) => item._id),
    isActive: true
  },
  { upsert: true }
);

console.log(`Upserted ${savedNews.length} news records.`);
console.log(savedNews.map((item) => `${item.slug} -> ${item.shortUrl}`).join('\n'));

await mongoose.disconnect();
