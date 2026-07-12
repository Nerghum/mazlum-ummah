import Advertisement from '../models/Advertisement.js';
import { AppError } from '../utils/AppError.js';
import { paginate } from '../utils/apiFeatures.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function cleanDate(value) {
  return value ? new Date(value) : undefined;
}

function normalize(payload) {
  return {
    ...payload,
    targetUrl: payload.targetUrl || '',
    startsAt: cleanDate(payload.startsAt),
    endsAt: cleanDate(payload.endsAt)
  };
}

export const list = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.placement) filter.placements = req.query.placement;
  if (req.query.isActive !== undefined && req.query.isActive !== '') filter.isActive = req.query.isActive === 'true';
  if (req.query.search) filter.title = new RegExp(req.query.search, 'i');
  res.json({ success: true, data: await paginate(Advertisement, filter, req.query, null, ['media', 'mobileMedia']) });
});

export const get = asyncHandler(async (req, res) => {
  const ad = await Advertisement.findById(req.params.id).populate(['media', 'mobileMedia']);
  if (!ad) throw new AppError('Advertisement not found', 404);
  res.json({ success: true, data: ad });
});

export const create = asyncHandler(async (req, res) => {
  const ad = await Advertisement.create(normalize(req.body));
  await ad.populate(['media', 'mobileMedia']);
  res.status(201).json({ success: true, data: ad });
});

export const update = asyncHandler(async (req, res) => {
  const ad = await Advertisement.findByIdAndUpdate(req.params.id, normalize(req.body), { new: true, runValidators: true }).populate(['media', 'mobileMedia']);
  if (!ad) throw new AppError('Advertisement not found', 404);
  res.json({ success: true, data: ad });
});

export const remove = asyncHandler(async (req, res) => {
  await Advertisement.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export const bulk = asyncHandler(async (req, res) => {
  const { ids, action } = req.body;
  if (action === 'delete') return res.json({ success: true, data: await Advertisement.deleteMany({ _id: { $in: ids } }) });
  if (action === 'activate') return res.json({ success: true, data: await Advertisement.updateMany({ _id: { $in: ids } }, { isActive: true }) });
  if (action === 'deactivate') return res.json({ success: true, data: await Advertisement.updateMany({ _id: { $in: ids } }, { isActive: false }) });
  throw new AppError('Unsupported bulk action', 400);
});
