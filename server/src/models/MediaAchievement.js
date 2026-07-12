import mongoose from 'mongoose';

const localizedTextSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: '' },
    bn: { type: String, trim: true, default: '' }
  },
  { _id: false }
);

const mediaAchievementSchema = new mongoose.Schema(
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
    source: { type: localizedTextSchema, default: () => ({}) },
    linkLabel: { type: localizedTextSchema, default: () => ({}) },
    externalUrl: String,
    achievementDate: { type: localizedTextSchema, default: () => ({}) },
    cardType: { type: String, enum: ['photo', 'accent'], default: 'photo', index: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    publishDate: { type: Date, index: true },
    scheduledPublishDate: { type: Date, index: true },
    status: { type: String, enum: ['Draft', 'Pending', 'Published', 'Archived'], default: 'Draft', index: true },
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],
    views: { type: Number, default: 0, index: true },
    shares: { type: Number, default: 0 },
    readingTime: { type: Number, default: 1 },
    language: { type: String, enum: ['en', 'bn', 'both'], default: 'both', index: true },
    isFeatured: { type: Boolean, default: false, index: true },
    isPinned: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);

mediaAchievementSchema.index({ status: 1, publishDate: -1 });
mediaAchievementSchema.index({
  'title.en': 'text',
  'title.bn': 'text',
  'shortDescription.en': 'text',
  'shortDescription.bn': 'text',
  'content.en': 'text',
  'content.bn': 'text',
  'source.en': 'text',
  'source.bn': 'text'
}, { default_language: 'none', language_override: 'searchLanguage' });

export default mongoose.model('MediaAchievement', mediaAchievementSchema);
