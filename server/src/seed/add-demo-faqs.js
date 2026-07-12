import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import FaqTopic from '../models/FaqTopic.js';

dotenv.config();
await connectDatabase();

const topics = [
  {
    title: { en: 'General Questions', bn: 'সাধারণ প্রশ্ন' },
    description: {
      en: 'Common information about Mazlum Ummah and its work.',
      bn: 'মাজলুম উম্মাহ ও এর কার্যক্রম সম্পর্কে সাধারণ তথ্য।'
    },
    slug: 'general-questions',
    order: 1,
    isActive: true,
    items: [
      {
        question: { en: 'What is Mazlum Ummah?', bn: 'মাজলুম উম্মাহ কী?' },
        answer: {
          en: 'Mazlum Ummah is a platform focused on sharing news, updates, and support-oriented information for oppressed communities.',
          bn: 'মাজলুম উম্মাহ হলো নিপীড়িত জনগোষ্ঠীর সংবাদ, আপডেট ও সহায়তামূলক তথ্য প্রকাশের একটি প্ল্যাটফর্ম।'
        },
        order: 1,
        isActive: true
      },
      {
        question: { en: 'How can I contact the team?', bn: 'আমি কীভাবে টিমের সাথে যোগাযোগ করব?' },
        answer: {
          en: 'You can use the contact form, email the team, or reach out through the social links listed on the website.',
          bn: 'আপনি যোগাযোগ ফর্ম ব্যবহার করতে পারেন, ইমেইল করতে পারেন অথবা ওয়েবসাইটে দেওয়া সামাজিক যোগাযোগের লিংকের মাধ্যমে যোগাযোগ করতে পারেন।'
        },
        order: 2,
        isActive: true
      }
    ]
  },
  {
    title: { en: 'Donation and Support', bn: 'দান ও সহায়তা' },
    description: {
      en: 'Frequently asked questions about support, donations, and cooperation.',
      bn: 'সহায়তা, দান ও সহযোগিতা সম্পর্কিত সাধারণ প্রশ্ন।'
    },
    slug: 'donation-and-support',
    order: 2,
    isActive: true,
    items: [
      {
        question: { en: 'How can I support a campaign?', bn: 'আমি কীভাবে কোনো ক্যাম্পেইনে সহায়তা করতে পারি?' },
        answer: {
          en: 'Follow the campaign instructions published on the website and verify official contact details before sending any support.',
          bn: 'ওয়েবসাইটে প্রকাশিত ক্যাম্পেইনের নির্দেশনা অনুসরণ করুন এবং কোনো সহায়তা পাঠানোর আগে অফিসিয়াল যোগাযোগের তথ্য যাচাই করুন।'
        },
        order: 1,
        isActive: true
      },
      {
        question: { en: 'Can organizations cooperate with Mazlum Ummah?', bn: 'সংগঠনগুলো কি মাজলুম উম্মাহর সাথে সহযোগিতা করতে পারে?' },
        answer: {
          en: 'Yes. Organizations can contact the team with a short proposal and relevant verification details.',
          bn: 'হ্যাঁ। সংগঠনগুলো সংক্ষিপ্ত প্রস্তাবনা ও প্রয়োজনীয় যাচাই তথ্যসহ টিমের সাথে যোগাযোগ করতে পারে।'
        },
        order: 2,
        isActive: true
      }
    ]
  },
  {
    title: { en: 'Volunteering', bn: 'স্বেচ্ছাসেবা' },
    description: {
      en: 'Questions about volunteering and contribution opportunities.',
      bn: 'স্বেচ্ছাসেবা ও অবদান রাখার সুযোগ সম্পর্কিত প্রশ্ন।'
    },
    slug: 'volunteering',
    order: 3,
    isActive: true,
    items: [
      {
        question: { en: 'Can I volunteer?', bn: 'আমি কি স্বেচ্ছাসেবক হতে পারি?' },
        answer: {
          en: 'Yes. Share your skills, availability, and preferred contribution area through the contact page.',
          bn: 'হ্যাঁ। যোগাযোগ পাতার মাধ্যমে আপনার দক্ষতা, সময়সূচি ও পছন্দের কাজের ক্ষেত্র জানান।'
        },
        order: 1,
        isActive: true
      },
      {
        question: { en: 'What kind of skills are useful?', bn: 'কোন ধরনের দক্ষতা কাজে লাগে?' },
        answer: {
          en: 'Writing, translation, design, research, media editing, technology, and community coordination can all be helpful.',
          bn: 'লেখালেখি, অনুবাদ, ডিজাইন, গবেষণা, মিডিয়া এডিটিং, প্রযুক্তি এবং কমিউনিটি সমন্বয় সবই সহায়ক হতে পারে।'
        },
        order: 2,
        isActive: true
      }
    ]
  }
];

const items = topics.flatMap((topic) => topic.items).map((item, index) => ({ ...item, order: index + 1 }));

await FaqTopic.deleteMany({ slug: { $ne: 'faqs' } });
await FaqTopic.findOneAndUpdate(
  { slug: 'faqs' },
  {
    title: { en: 'FAQs', bn: 'সচরাচর জিজ্ঞাসিত প্রশ্ন' },
    description: { en: 'Common questions and answers.', bn: 'সাধারণ প্রশ্ন ও উত্তর।' },
    slug: 'faqs',
    order: 1,
    isActive: true,
    items
  },
  { upsert: true, new: true, runValidators: true }
);

console.log(`Seeded ${items.length} FAQ items.`);
await mongoose.disconnect();
process.exit(0);
