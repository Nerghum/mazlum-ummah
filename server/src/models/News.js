import mongoose from 'mongoose';

const localizedTextSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: '' },
    bn: { type: String, trim: true, default: '' }
  },
  { _id: false }
);

const newsSchema = new mongoose.Schema(
  {
    title: { type: localizedTextSchema, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortUrl: { type: String, required: true, unique: true, index: true },
    subtitle: { type: localizedTextSchema, default: () => ({}) },
    shortDescription: { type: localizedTextSchema, default: () => ({}) },
    content: { type: localizedTextSchema, required: true },
    thumbnailImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    thumbnailVideo: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    imageGallery: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
    videoUrl: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    publishDate: { type: Date, index: true },
    scheduledPublishDate: { type: Date, index: true },
    status: { type: String, enum: ['Draft', 'Pending', 'Scheduled', 'Published', 'Archived'], default: 'Draft', index: true },
    country: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country', index: true }],
    mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', index: true }],
    breakingNews: { type: Boolean, default: false, index: true },
    selectedNews: { type: Boolean, default: false },
    featuredNews: { type: Boolean, default: false, index: true },
    countryWiseFeaturedNews: { type: Boolean, default: false },
    mostRead: { type: Boolean, default: false },
    videoNews: { type: Boolean, default: false, index: true },
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],
    views: { type: Number, default: 0, index: true },
    shares: { type: Number, default: 0 },
    readingTime: { type: Number, default: 1 },
    language: { type: String, enum: ['en', 'bn', 'both'], default: 'both', index: true },
    isTrending: { type: Boolean, default: false, index: true },
    isHeadline: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false, index: true },
    priorityOrder: { type: Number, default: 0, index: true },
    homepagePosition: { type: String, index: true },
    copyrightProtected: { type: Boolean, default: false },
    allowComments: { type: Boolean, default: true }
  },
  { timestamps: true }
);

newsSchema.index({ status: 1, publishDate: -1, priorityOrder: 1 });
newsSchema.index({
  'title.en': 'text',
  'title.bn': 'text',
  'shortDescription.en': 'text',
  'shortDescription.bn': 'text',
  'content.en': 'text',
  'content.bn': 'text'
}, { default_language: 'none', language_override: 'searchLanguage' });

export default mongoose.model('News', newsSchema);
