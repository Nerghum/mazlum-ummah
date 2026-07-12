import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    usageCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Tag', tagSchema);
