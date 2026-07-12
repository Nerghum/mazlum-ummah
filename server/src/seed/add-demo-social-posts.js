import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';
import mongoose from 'mongoose';
import sharp from 'sharp';
import { connectDatabase } from '../config/database.js';
import Media from '../models/Media.js';
import SocialPost from '../models/SocialPost.js';
import User from '../models/User.js';

dotenv.config();
await connectDatabase();

const projectRoot = path.resolve(process.cwd(), '..');
const assetDir = path.join(projectRoot, 'mazlum-ummah-main', 'public', 'assets', 'posts');
const uploadDir = path.resolve(process.cwd(), 'uploads');

const assetNames = [
  'image-copy-6.png',
  'image-copy.png',
  'image-copy-2.png',
  'image-copy-3.png',
  'image-copy-4.png',
  'image-copy-5.png',
  'image-copy-7.png',
  'image-copy-8.png',
  'image-copy-9.png'
];

async function ensureMedia(originalName, altText) {
  const filename = `demo-social-${originalName}`;
  const targetPath = path.join(uploadDir, filename);
  const sourcePath = path.join(assetDir, originalName);
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.copyFile(sourcePath, targetPath);
  const [stat, meta] = await Promise.all([fs.stat(targetPath), sharp(targetPath).metadata()]);

  return Media.findOneAndUpdate(
    { filename },
    {
      filename,
      originalName,
      mimeType: 'image/png',
      size: stat.size,
      url: `/uploads/${filename}`,
      folder: 'social-posts',
      type: 'image',
      altText,
      width: meta.width,
      height: meta.height,
      uploadedBy: (await User.findOne({ role: 'Super Admin' }).select('_id').lean())?._id
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
}

const mediaItems = {};
for (const name of assetNames) {
  mediaItems[name] = await ensureMedia(name, `Demo social post ${name}`);
}

const demoPosts = [
  {
    postType: 'video',
    authorName: 'Mazlum Ummah-মজলুম উম্মাহ',
    content: 'মজলুম উম্মাহর বিশেষ প্রতিবেদন',
    hashtags: ['#মজলুম_উম্মাহ', '#Syrian', '#syriaisraelconflict'],
    videoUrl: 'https://www.youtube.com/watch?v=4LXnIpuIYgA',
    videoThumbnail: mediaItems['image-copy-6.png']._id,
    status: 'Published',
    isPinned: true,
    sortOrder: 1,
    publishDate: new Date(Date.now() - 60 * 60 * 1000)
  },
  {
    postType: 'image',
    authorName: 'Mazlum Ummah-মজলুম উম্মাহ',
    content: 'Team Mazlum Ummah - মজলুম উম্মাহ\nবিশ্ব মজলুমের কণ্ঠস্বর | The Voice of the Persecuted Muslim World',
    hashtags: ['#মজলুম_উম্মাহ', '#MuftiRezwanRafiqi', '#VoiceOfTheVoiceless', '#HumanitarianJournalism', '#HCSB', '#MazlumUmmah'],
    images: [
      mediaItems['image-copy.png']._id,
      mediaItems['image-copy-2.png']._id,
      mediaItems['image-copy-3.png']._id,
      mediaItems['image-copy-4.png']._id
    ],
    status: 'Published',
    sortOrder: 2,
    publishDate: new Date(Date.now() - 3 * 60 * 60 * 1000)
  },
  {
    postType: 'image',
    authorName: 'Mazlum Ummah-মজলুম উম্মাহ',
    content: 'সিরিয়া ইরান-ইসরায়েল উত্তেজনা',
    hashtags: ['#IRGC', '#IraqNews', '#IranConflict', '#MiddleEastNews'],
    images: [mediaItems['image-copy-5.png']._id],
    status: 'Published',
    sortOrder: 3,
    publishDate: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    postType: 'image',
    authorName: 'Mazlum Ummah-মজলুম উম্মাহ',
    content: 'মাঠ পর্যায়ের কার্যক্রম থেকে নির্বাচিত কিছু মুহূর্ত।',
    hashtags: ['#MazlumUmmah', '#ReliefWork', '#HumanitarianAid'],
    images: [
      mediaItems['image-copy-7.png']._id,
      mediaItems['image-copy-8.png']._id,
      mediaItems['image-copy-9.png']._id
    ],
    status: 'Published',
    sortOrder: 4,
    publishDate: new Date(Date.now() - 8 * 60 * 60 * 1000)
  }
];

await SocialPost.deleteMany({ content: { $in: demoPosts.map((post) => post.content) } });
await SocialPost.insertMany(demoPosts);

console.log(`Seeded ${demoPosts.length} demo social posts.`);
await mongoose.disconnect();
