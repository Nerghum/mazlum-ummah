import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from './src/config/database.js';
import News from './src/models/News.js';
import User from './src/models/User.js';
import Category from './src/models/Category.js';
import { makeSlug } from './src/utils/slug.js';

dotenv.config();

async function run() {
  await connectDatabase();
  
  const author = await User.findOne({ role: 'Editor' }) || await User.findOne();
  const publisher = await User.findOne({ role: 'Super Admin' }) || await User.findOne();
  const category = await Category.findOne({ type: 'news' });
  
  const lotsOfText = Array(15).fill('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>').join('\n<br>\n');
  const lotsOfTextBn = Array(15).fill('<p>লরেম ইপসাম ডলার সিট আমেট, কনসেক্টেটুর এডিপিসিং এলিট। সেড ডো ইয়াসমড টেম্পর ইনসিডিন্ট উট লেবোর এট ডলোরে ম্যাগনা এলিকুয়া। উট এনিম এড মিনিম ভেনিয়াম, কুইস নসট্রুড এক্সারসিটেশন উলামকো ল্যাবোরিস নিসি উট এলিকুইপ এক্স ইয়া কমোডো কনসেকুয়াট। ডুইস আউটে ইরুরে ডলার ইন রেপ্রিহেন্ডারিট ইন ভোলুপটেট ভেলিট এস্সে সিলাম ডলোরে ইউ ফুগিয়াট নুলা প্যারিয়াটুর। এক্সেপ্টুর সিন্ট ওকায়েকাট কিউপিডাট নন প্রোইডেন্ট, সুন্ট ইন কুলপা কুই অফিসিয়া ডেজারেন্ট মলিট এনিম ইড এস্ট ল্যাবরাম।</p>').join('\n<br>\n');
  
  const posts = [
    {
      title: { en: 'In-Depth Analysis: The Global Economic Shifts', bn: 'গভীর বিশ্লেষণ: বিশ্ব অর্থনীতিতে পরিবর্তন' },
      slug: makeSlug('In Depth Analysis The Global Economic Shifts ' + Date.now()),
      shortUrl: '/n/demo' + Date.now(),
      shortDescription: { en: 'A comprehensive look at how emerging markets are reshaping the global economy.', bn: 'উদীয়মান বাজারগুলো কীভাবে বিশ্ব অর্থনীতিকে নতুন আকার দিচ্ছে তার একটি বিস্তৃত দৃষ্টিভঙ্গি।' },
      content: { en: lotsOfText, bn: lotsOfTextBn },
      author: author._id,
      publishedBy: publisher._id,
      status: 'Published',
      publishDate: new Date(),
      mainCategory: category ? category._id : null,
      featuredNews: true,
      readingTime: 10,
      language: 'both'
    },
    {
      title: { en: 'Technological Advancements in the Next Decade', bn: 'আগামী দশকে প্রযুক্তিগত অগ্রগতি' },
      slug: makeSlug('Technological Advancements in the Next Decade ' + Date.now()),
      shortUrl: '/n/demo' + (Date.now() + 1),
      shortDescription: { en: 'Exploring the potential of AI, quantum computing, and renewable energy.', bn: 'এআই, কোয়ান্টাম কম্পিউটিং এবং নবায়নযোগ্য শক্তির সম্ভাবনা অন্বেষণ।' },
      content: { en: lotsOfText, bn: lotsOfTextBn },
      author: author._id,
      publishedBy: publisher._id,
      status: 'Published',
      publishDate: new Date(),
      mainCategory: category ? category._id : null,
      featuredNews: true,
      readingTime: 10,
      language: 'both'
    },
    {
      title: { en: 'Climate Change: Policy, Practice, and Prognosis', bn: 'জলবায়ু পরিবর্তন: নীতি, অনুশীলন এবং পূর্বাভাস' },
      slug: makeSlug('Climate Change Policy Practice and Prognosis ' + Date.now()),
      shortUrl: '/n/demo' + (Date.now() + 2),
      shortDescription: { en: 'A deep dive into international agreements and grassroots movements.', bn: 'আন্তর্জাতিক চুক্তি এবং তৃণমূল আন্দোলনের একটি গভীর বিশ্লেষণ।' },
      content: { en: lotsOfText, bn: lotsOfTextBn },
      author: author._id,
      publishedBy: publisher._id,
      status: 'Published',
      publishDate: new Date(),
      mainCategory: category ? category._id : null,
      featuredNews: true,
      readingTime: 10,
      language: 'both'
    }
  ];

  await News.insertMany(posts);
  console.log('Added 3 demo posts.');
  process.exit(0);
}

run().catch(console.error);
