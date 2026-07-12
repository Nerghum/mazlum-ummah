import MediaAchievement from '../models/MediaAchievement.js';
import * as MediaAchievementService from '../services/mediaAchievement.service.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await MediaAchievementService.listMediaAchievements(req.query) });
});

export const get = asyncHandler(async (req, res) => {
  const item = await MediaAchievement.findById(req.params.id).populate(['author', 'publishedBy', 'thumbnailImage', 'imageGallery']);
  if (!item) throw new AppError('Media achievement not found', 404);
  res.json({ success: true, data: item });
});

export const create = asyncHandler(async (req, res) => {
  const item = await MediaAchievementService.createMediaAchievement(req.body, req.user);
  res.status(201).json({ success: true, data: item });
});

export const update = asyncHandler(async (req, res) => {
  const item = await MediaAchievementService.updateMediaAchievement(req.params.id, req.body, req.user);
  res.json({ success: true, data: item });
});

export const remove = asyncHandler(async (req, res) => {
  await MediaAchievement.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export const bulk = asyncHandler(async (req, res) => {
  const result = await MediaAchievementService.bulkMediaAchievements(req.body, req.user);
  res.json({ success: true, data: result });
});
