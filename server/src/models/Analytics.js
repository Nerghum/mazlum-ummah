import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema(
  {
    news: { type: mongoose.Schema.Types.ObjectId, ref: 'News', index: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', index: true },
    mediaAchievement: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaAchievement', index: true },
    event: { type: String, enum: ['page-view', 'view', 'share', 'short-url-redirect', 'print', 'pdf'], required: true, index: true },
    contentType: { type: String, enum: ['page', 'news', 'blog', 'media-achievement'], default: 'page', index: true },
    path: { type: String, index: true },
    pageTitle: String,
    country: String,
    region: String,
    city: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    userAgent: String,
    ipHash: String,
    visitorIdHash: { type: String, index: true },
    device: String,
    browser: String,
    os: String,
    referrer: String,
    language: String,
    timezone: String,
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

analyticsSchema.index({ createdAt: -1, event: 1 });
analyticsSchema.index({ event: 1, createdAt: -1, path: 1 });
analyticsSchema.index({ contentType: 1, createdAt: -1 });

export default mongoose.model('Analytics', analyticsSchema);
