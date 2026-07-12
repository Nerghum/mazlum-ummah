import News from '../models/News.js';
import * as Analytics from '../services/analytics.service.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const dashboard = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await Analytics.dashboardStats(req.query) });
});

export const track = asyncHandler(async (req, res) => {
  await Analytics.trackPageView({ req, payload: req.body || {} });
  res.status(201).json({ success: true });
});

export const trackView = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) throw new AppError('News not found', 404);
  await Analytics.trackEvent({ req, news: news.id, event: 'view' });
  res.json({ success: true });
});

export const shortRedirect = asyncHandler(async (req, res) => {
  const news = await News.findOne({ shortUrl: `/n/${req.params.code}` });
  if (!news) throw new AppError('Short URL not found', 404);
  await Analytics.trackEvent({ req, news: news.id, event: 'short-url-redirect' });
  res.redirect(302, `/news/${news.slug}`);
});
