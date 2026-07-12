import News from '../models/News.js';
import * as NewsService from '../services/news.service.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await NewsService.listNews(req.query) });
});

export const get = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id).populate(['author', 'publishedBy', 'mainCategory', 'subCategory', 'categories', 'country', 'tags', 'thumbnailImage', 'imageGallery']);
  if (!news) throw new AppError('News not found', 404);
  res.json({ success: true, data: news });
});

export const create = asyncHandler(async (req, res) => {
  const news = await NewsService.createNews(req.body, req.user);
  res.status(201).json({ success: true, data: news });
});

export const update = asyncHandler(async (req, res) => {
  const news = await NewsService.updateNews(req.params.id, req.body, req.user);
  res.json({ success: true, data: news });
});

export const remove = asyncHandler(async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export const bulk = asyncHandler(async (req, res) => {
  const result = await NewsService.bulkNews(req.body, req.user);
  res.json({ success: true, data: result });
});
