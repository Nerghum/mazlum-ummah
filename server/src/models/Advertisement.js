import mongoose from 'mongoose';

const advertisementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    placements: [{ type: String, required: true, index: true }],
    media: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    mobileMedia: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    targetUrl: String,
    linkType: { type: String, enum: ['website', 'call', 'whatsapp'], default: 'website' },
    openInNewTab: { type: Boolean, default: true },
    altText: String,
    startsAt: Date,
    endsAt: Date,
    priorityOrder: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  },
  { timestamps: true }
);

advertisementSchema.index({ placements: 1, isActive: 1, priorityOrder: 1 });

export default mongoose.model('Advertisement', advertisementSchema);
