import mongoose from 'mongoose';

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: String,
    language: { type: String, default: 'en' },
    status: { type: String, enum: ['Subscribed', 'Unsubscribed'], default: 'Subscribed', index: true },
    source: String
  },
  { timestamps: true }
);

export default mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);
