import mongoose from 'mongoose';

const localizedTextSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: '' },
    bn: { type: String, trim: true, default: '' }
  },
  { _id: false }
);

const manualCardSchema = new mongoose.Schema(
  {
    title: { type: localizedTextSchema, default: () => ({}) },
    description: { type: localizedTextSchema, default: () => ({}) },
    buttonText: { type: localizedTextSchema, default: () => ({}) },
    imageUrl: String,
    link: String,
    order: { type: Number, default: 0 }
  },
  { _id: true }
);

const sectionTypes = [
  'Hero Slider',
  'Breaking News',
  "Today's News",
  'Manual Cards',
  'News Categories',
  'Blog Categories',
  'Video News',
  'Ad Slot',
  'Featured News',
  'Country-wise News',
  'Most Read',
  'Editor Picks',
  'Trending News'
];

const homepageSectionSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: () => ({ en: '', bn: '' })
    },
    key: { type: String, required: true, unique: true },
    type: { type: String, enum: sectionTypes, required: true },
    order: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    news: [{ type: mongoose.Schema.Types.ObjectId, ref: 'News' }],
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    cards: [manualCardSchema],
    adPosition: { type: String, trim: true },
    settings: {
      mode: { type: String, enum: ['auto', 'manual'], default: 'auto' },
      limit: { type: Number, default: 10 },
      layout: String,
      source: { type: String, enum: ['news', 'blogs'], default: 'news' },
      crisisNumbers: {
        gaza: { type: localizedTextSchema, default: () => ({}) },
        sudan: { type: localizedTextSchema, default: () => ({}) },
        middleEast: { type: localizedTextSchema, default: () => ({}) }
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model('HomepageSection', homepageSectionSchema);
