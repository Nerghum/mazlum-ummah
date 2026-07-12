import mongoose from 'mongoose';

const localizedTextSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: '' },
    bn: { type: String, trim: true, default: '' }
  },
  { _id: false }
);

const faqItemSchema = new mongoose.Schema(
  {
    question: { type: localizedTextSchema, required: true },
    answer: { type: localizedTextSchema, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { _id: true }
);

const faqTopicSchema = new mongoose.Schema(
  {
    title: { type: localizedTextSchema, required: true },
    description: { type: localizedTextSchema, default: () => ({}) },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    order: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true },
    items: { type: [faqItemSchema], default: [] }
  },
  { timestamps: true }
);

faqTopicSchema.index({ 'title.en': 'text', 'title.bn': 'text', 'items.question.en': 'text', 'items.question.bn': 'text' });
faqTopicSchema.index({ isActive: 1, order: 1 });

export default mongoose.model('FaqTopic', faqTopicSchema);
