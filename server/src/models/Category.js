import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['news', 'blog'], default: 'news', index: true },
    name: { type: String, required: true, trim: true },
    nameBn: { type: String, trim: true, default: '' },
    slug: { type: String, required: true, index: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null, index: true },
    description: String,
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    bannerImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    icon: String,
    sortOrder: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true },
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],
    pageSettings: { layout: String, showOnMenu: { type: Boolean, default: true } },
    pageTitle: String,
    pageTitleBn: { type: String, default: '' },
    pageSubtitle: String,
    pageSubtitleBn: { type: String, default: '' }
  },
  { timestamps: true }
);

categorySchema.index({ name: 'text', nameBn: 'text', description: 'text' });
categorySchema.index({ type: 1, slug: 1 }, { unique: true });

export default mongoose.model('Category', categorySchema);
