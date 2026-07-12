import mongoose from 'mongoose';

const socialPostSchema = new mongoose.Schema(
  {
    postType: { type: String, enum: ['image', 'video'], default: 'image', index: true },
    authorName: { type: String, trim: true, default: 'Mazlum Ummah-মজলুম উম্মাহ' },
    authorAvatar: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    content: { type: String, trim: true, required: true },
    hashtags: [{ type: String, trim: true }],
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
    videoUrl: { type: String, trim: true, default: '' },
    videoThumbnail: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    publishDate: { type: Date, index: true },
    status: { type: String, enum: ['Draft', 'Pending', 'Published', 'Archived'], default: 'Draft', index: true },
    isPinned: { type: Boolean, default: false, index: true },
    sortOrder: { type: Number, default: 0, index: true }
  },
  { timestamps: true }
);

socialPostSchema.index({ content: 'text', hashtags: 'text' }, { default_language: 'none' });
socialPostSchema.index({ status: 1, isPinned: -1, publishDate: -1 });

export default mongoose.model('SocialPost', socialPostSchema);
