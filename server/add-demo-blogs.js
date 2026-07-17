import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from './src/config/database.js';
import Blog from './src/models/Blog.js';
import User from './src/models/User.js';
import Category from './src/models/Category.js';
import { makeSlug } from './src/utils/slug.js';

dotenv.config();

async function run() {
  await connectDatabase();

  const author = await User.findOne({ role: 'Editor' }) || await User.findOne();
  const publisher = await User.findOne({ role: 'Super Admin' }) || await User.findOne();
  const category = await Category.findOne({ type: 'blog' });

  const lotsOfText = Array(12).fill('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.</p>').join('\n<br>\n');
  const lotsOfTextBn = Array(12).fill('<p>লরেম ইপসাম ডলার সিট আমেট, কনসেক্টেটুর এডিপিসিং এলিট। সেড ডো ইয়াসমড টেম্পর ইনসিডিন্ট উট লেবোর এট ডলোরে ম্যাগনা এলিকুয়া। উট এনিম এড মিনিম ভেনিয়াম, কুইস নসট্রুড এক্সারসিটেশন উলামকো ল্যাবোরিস নিসি উট এলিকুইপ এক্স ইয়া কমোডো কনসেকুয়াট। ডুইস আউটে ইরুরে ডলার ইন রেপ্রিহেন্ডারিট ইন ভোলুপটেট ভেলিট এস্সে সিলাম ডলোরে ইউ ফুগিয়াট নুলা প্যারিয়াটুর। এক্সেপ্টুর সিন্ট ওকায়েকাট কিউপিডাট নন প্রোইডেন্ট, সুন্ট ইন কুলপা কুই অফিসিয়া ডেজারেন্ট মলিট এনিম ইড এস্ট ল্যাবরাম।</p>').join('\n<br>\n');

  const now = Date.now();

  const blogs = [
    {
      title: { en: 'The Rise of Islamic Finance: A Global Perspective', bn: 'ইসলামী অর্থায়নের উত্থান: একটি বৈশ্বিক দৃষ্টিভঙ্গি' },
      slug: makeSlug('The Rise of Islamic Finance A Global Perspective ' + now),
      shortUrl: '/b/islamic-finance-' + now,
      shortDescription: { en: 'How Islamic banking and finance has grown into a trillion-dollar global industry and what it means for the Muslim world.', bn: 'ইসলামী ব্যাংকিং ও অর্থায়ন কীভাবে ট্রিলিয়ন ডলারের বৈশ্বিক শিল্পে পরিণত হয়েছে এবং মুসলিম বিশ্বের জন্য এর অর্থ কী।' },
      content: { en: lotsOfText, bn: lotsOfTextBn },
      author: author._id,
      publishedBy: publisher._id,
      status: 'Published',
      publishDate: new Date(now),
      mainCategory: category ? category._id : null,
      categories: category ? [category._id] : [],
      readingTime: 8,
      language: 'both'
    },
    {
      title: { en: 'Humanitarian Crisis in Sudan: What the World Ignores', bn: 'সুদানে মানবিক সংকট: বিশ্ব যা উপেক্ষা করছে' },
      slug: makeSlug('Humanitarian Crisis in Sudan What the World Ignores ' + now),
      shortUrl: '/b/sudan-crisis-' + now,
      shortDescription: { en: 'An in-depth look at the ongoing conflict in Sudan and the suffering of millions caught in the crossfire.', bn: 'সুদানে চলমান সংঘাত এবং লক্ষ লক্ষ মানুষের দুর্ভোগের গভীর বিশ্লেষণ।' },
      content: { en: lotsOfText, bn: lotsOfTextBn },
      author: author._id,
      publishedBy: publisher._id,
      status: 'Published',
      publishDate: new Date(now - 86400000),
      mainCategory: category ? category._id : null,
      categories: category ? [category._id] : [],
      readingTime: 10,
      language: 'both'
    },
    {
      title: { en: 'Palestine and International Law: A Historical Overview', bn: 'ফিলিস্তিন ও আন্তর্জাতিক আইন: একটি ঐতিহাসিক পর্যালোচনা' },
      slug: makeSlug('Palestine and International Law A Historical Overview ' + now),
      shortUrl: '/b/palestine-law-' + now,
      shortDescription: { en: 'Tracing the legal arguments and international obligations surrounding the Palestinian cause across decades.', bn: 'দশকের পর দশক ধরে ফিলিস্তিনি কারণকে ঘিরে আইনি যুক্তি এবং আন্তর্জাতিক বাধ্যবাধকতার সন্ধান।' },
      content: { en: lotsOfText, bn: lotsOfTextBn },
      author: author._id,
      publishedBy: publisher._id,
      status: 'Published',
      publishDate: new Date(now - 172800000),
      mainCategory: category ? category._id : null,
      categories: category ? [category._id] : [],
      readingTime: 12,
      language: 'both'
    },
    {
      title: { en: 'Education in the Muslim World: Challenges and Opportunities', bn: 'মুসলিম বিশ্বে শিক্ষা: চ্যালেঞ্জ ও সুযোগ' },
      slug: makeSlug('Education in the Muslim World Challenges and Opportunities ' + now),
      shortUrl: '/b/muslim-education-' + now,
      shortDescription: { en: 'Examining the state of education across Muslim-majority nations and pathways toward reform and excellence.', bn: 'মুসলিম সংখ্যাগরিষ্ঠ দেশগুলিতে শিক্ষার অবস্থা পরীক্ষা করা এবং সংস্কার ও উৎকর্ষতার পথ।' },
      content: { en: lotsOfText, bn: lotsOfTextBn },
      author: author._id,
      publishedBy: publisher._id,
      status: 'Published',
      publishDate: new Date(now - 259200000),
      mainCategory: category ? category._id : null,
      categories: category ? [category._id] : [],
      readingTime: 9,
      language: 'both'
    },
    {
      title: { en: 'The Role of Muslim Youth in Global Advocacy', bn: 'বৈশ্বিক পক্ষসমর্থনে মুসলিম তরুণদের ভূমিকা' },
      slug: makeSlug('The Role of Muslim Youth in Global Advocacy ' + now),
      shortUrl: '/b/muslim-youth-' + now,
      shortDescription: { en: 'How a new generation of Muslim activists is shaping discourse on human rights, identity, and justice worldwide.', bn: 'কীভাবে মুসলিম কর্মীদের নতুন প্রজন্ম বিশ্বব্যাপী মানবাধিকার, পরিচয় এবং ন্যায়বিচারের বিষয়ে আলোচনা গঠন করছে।' },
      content: { en: lotsOfText, bn: lotsOfTextBn },
      author: author._id,
      publishedBy: publisher._id,
      status: 'Published',
      publishDate: new Date(now - 345600000),
      mainCategory: category ? category._id : null,
      categories: category ? [category._id] : [],
      readingTime: 7,
      language: 'both'
    },
    {
      title: { en: 'Rohingya Refugees: Five Years On', bn: 'রোহিঙ্গা শরণার্থী: পাঁচ বছর পরে' },
      slug: makeSlug('Rohingya Refugees Five Years On ' + now),
      shortUrl: '/b/rohingya-refugees-' + now,
      shortDescription: { en: 'A reflection on the ongoing plight of Rohingya refugees in Bangladesh and the slow path to justice.', bn: 'বাংলাদেশে রোহিঙ্গা শরণার্থীদের চলমান দুর্দশা এবং বিচারের ধীর গতির একটি প্রতিফলন।' },
      content: { en: lotsOfText, bn: lotsOfTextBn },
      author: author._id,
      publishedBy: publisher._id,
      status: 'Published',
      publishDate: new Date(now - 432000000),
      mainCategory: category ? category._id : null,
      categories: category ? [category._id] : [],
      readingTime: 11,
      language: 'both'
    }
  ];

  await Blog.insertMany(blogs);
  console.log(`Added ${blogs.length} demo blogs.`);
  process.exit(0);
}

run().catch(console.error);
