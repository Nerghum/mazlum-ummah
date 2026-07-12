import HomepageSection from '../models/HomepageSection.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { normalizeHomepageSection, normalizeHomepageTitle } from '../utils/homepageTitle.js';

function normalizeTitle(value, type) {
  return normalizeHomepageTitle(value, type);
}

function normalizePayload(body) {
  return { ...body, title: normalizeTitle(body.title, body.type) };
}

export const list = asyncHandler(async (_req, res) => {
  const sections = await HomepageSection.find()
    .sort('order')
    .populate(['country', 'news', 'blogs', 'categories'])
    .lean();
  res.json({ success: true, data: sections.map(normalizeHomepageSection) });
});

export const create = asyncHandler(async (req, res) => {
  const section = await HomepageSection.create(normalizePayload(req.body));
  res.status(201).json({ success: true, data: normalizeHomepageSection(section) });
});

export const update = asyncHandler(async (req, res) => {
  const section = await HomepageSection.findByIdAndUpdate(req.params.id, normalizePayload(req.body), { new: true, runValidators: true });
  if (!section) throw new AppError('Homepage section not found', 404);
  res.json({ success: true, data: normalizeHomepageSection(section) });
});

export const reorder = asyncHandler(async (req, res) => {
  await Promise.all(req.body.sections.map((item) => HomepageSection.findByIdAndUpdate(item.id, { order: item.order })));
  res.json({ success: true, message: 'Homepage sections reordered' });
});

export const remove = asyncHandler(async (req, res) => {
  await HomepageSection.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
