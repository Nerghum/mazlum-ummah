import SocialPost from '../models/SocialPost.js';
import * as SocialPostService from '../services/socialPost.service.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await SocialPostService.listSocialPosts(req.query) });
});

export const get = asyncHandler(async (req, res) => {
  const item = await SocialPost.findById(req.params.id).populate(SocialPostService.socialPostPopulate);
  if (!item) throw new AppError('Social post not found', 404);
  res.json({ success: true, data: item });
});

export const create = asyncHandler(async (req, res) => {
  const item = await SocialPostService.createSocialPost(req.body);
  res.status(201).json({ success: true, data: item });
});

export const update = asyncHandler(async (req, res) => {
  const item = await SocialPostService.updateSocialPost(req.params.id, req.body);
  res.json({ success: true, data: item });
});

export const remove = asyncHandler(async (req, res) => {
  await SocialPost.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export const bulk = asyncHandler(async (req, res) => {
  const result = await SocialPostService.bulkSocialPosts(req.body);
  res.json({ success: true, data: result });
});
