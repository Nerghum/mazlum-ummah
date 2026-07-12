import mongoose from 'mongoose';

const localizedTextSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: '' },
    bn: { type: String, trim: true, default: '' }
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: localizedTextSchema, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortUrl: { type: String, required: true, unique: true, index: true },
    subtitle: { type: localizedTextSchema, default: () => ({}) },
    shortDescription: { type: localizedTextSchema, default: () => ({}) },
    content: { type: localizedTextSchema, required: true },
    thumbnailImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    imageGallery: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
    videoUrl: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    publishDate: { type: Date, index: true },
    scheduledPublishDate: { type: Date, index: true },
    status: { type: String, enum: ['Draft', 'Pending', 'Published', 'Archived'], default: 'Draft', index: true },
    mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', index: true }],
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],
    views: { type: Number, default: 0, index: true },
    shares: { type: Number, default: 0 },
    readingTime: { type: Number, default: 1 },
    language: { type: String, enum: ['en', 'bn', 'both'], default: 'both', index: true },
    isFeatured: { type: Boolean, default: false, index: true },
    isPinned: { type: Boolean, default: false, index: true },
    allowComments: { type: Boolean, default: true }
  },
  { timestamps: true }
);

blogSchema.index({ status: 1, publishDate: -1 });
blogSchema.index({
  'title.en': 'text',
  'title.bn': 'text',
  'shortDescription.en': 'text',
  'shortDescription.bn': 'text',
  'content.en': 'text',
  'content.bn': 'text'
}, { default_language: 'none', language_override: 'searchLanguage' });

export default mongoose.model('Blog', blogSchema);
