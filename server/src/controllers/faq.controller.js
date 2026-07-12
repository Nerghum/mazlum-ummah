import FaqTopic from '../models/FaqTopic.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { makeSlug } from '../utils/slug.js';

function normalizeItems(items = []) {
  return items.map((item, index) => ({
    ...item,
    order: item.order ?? index + 1,
    isActive: item.isActive !== false
  }));
}

function buildPayload(body) {
  const title = body.title || {};
  return {
    ...body,
    slug: body.slug?.trim() || makeSlug(title.en || title.bn || 'faq-topic'),
    items: normalizeItems(body.items || [])
  };
}

export const list = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';
  if (req.query.search) filter.$text = { $search: req.query.search };
  const items = await FaqTopic.find(filter).sort('order createdAt').lean();
  res.json({ success: true, data: items });
});

export const get = asyncHandler(async (req, res) => {
  const topic = await FaqTopic.findById(req.params.id).lean();
  if (!topic) throw new AppError('FAQ topic not found', 404);
  res.json({ success: true, data: topic });
});

export const create = asyncHandler(async (req, res) => {
  const count = await FaqTopic.countDocuments();
  const topic = await FaqTopic.create({ order: count + 1, ...buildPayload(req.body) });
  res.status(201).json({ success: true, data: topic });
});

export const update = asyncHandler(async (req, res) => {
  const topic = await FaqTopic.findByIdAndUpdate(req.params.id, buildPayload(req.body), { new: true, runValidators: true });
  if (!topic) throw new AppError('FAQ topic not found', 404);
  res.json({ success: true, data: topic });
});

export const remove = asyncHandler(async (req, res) => {
  await FaqTopic.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export const publicFaqs = asyncHandler(async (_req, res) => {
  const topics = await FaqTopic.find({ isActive: true }).sort('order createdAt').lean();
  const data = topics.flatMap((topic) => (
    (topic.items || [])
      .filter((item) => item.isActive !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((item) => ({
        _id: item._id,
        question: item.question,
        answer: item.answer,
        order: item.order,
        isActive: item.isActive
      }))
  ));

  res.json({ success: true, data });
});
