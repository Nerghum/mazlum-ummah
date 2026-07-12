import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    news: { type: mongoose.Schema.Types.ObjectId, ref: 'News', required: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending', index: true },
    moderatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);
