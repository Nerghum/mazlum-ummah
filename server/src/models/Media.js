import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    originalName: String,
    mimeType: String,
    size: Number,
    url: { type: String, required: true },
    folder: { type: String, default: 'library', index: true },
    type: { type: String, enum: ['image', 'video', 'document'], default: 'image', index: true },
    altText: String,
    width: Number,
    height: Number,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

mediaSchema.index({ originalName: 'text', altText: 'text', folder: 'text' });

export default mongoose.model('Media', mediaSchema);
