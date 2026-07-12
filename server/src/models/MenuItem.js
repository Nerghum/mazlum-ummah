import mongoose from 'mongoose';

const localizedTextSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: '' },
    bn: { type: String, trim: true, default: '' }
  },
  { _id: false }
);

const menuItemSchema = new mongoose.Schema(
  {
    label: { type: localizedTextSchema, required: true },
    url: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', default: null, index: true },
    order: { type: Number, default: 0, index: true },
    target: { type: String, enum: ['self', 'blank'], default: 'self' },
    isActive: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

menuItemSchema.index({ parent: 1, order: 1 });

export default mongoose.model('MenuItem', menuItemSchema);
