import mongoose from 'mongoose';

const localizedTextSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: '' },
    bn: { type: String, trim: true, default: '' }
  },
  { _id: false }
);

const noticeSchema = new mongoose.Schema(
  {
    title: { type: localizedTextSchema, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    summary: { type: localizedTextSchema, default: () => ({}) },
    content: { type: localizedTextSchema, required: true },
    status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Draft', index: true },
    publishDate: { type: Date, index: true },
    expiresAt: { type: Date, index: true },
    isPinned: { type: Boolean, default: false, index: true },
    priorityOrder: { type: Number, default: 0, index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

noticeSchema.index({ status: 1, isPinned: -1, priorityOrder: 1, publishDate: -1 });
noticeSchema.index({
  'title.en': 'text',
  'title.bn': 'text',
  'summary.en': 'text',
  'summary.bn': 'text',
  'content.en': 'text',
  'content.bn': 'text'
}, { default_language: 'none', language_override: 'searchLanguage' });

export default mongoose.model('Notice', noticeSchema);
