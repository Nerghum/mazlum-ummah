import Notice from '../models/Notice.js';
import * as NoticeService from '../services/notice.service.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await NoticeService.listNotices(req.query) });
});

export const get = asyncHandler(async (req, res) => {
  const notice = await Notice.findById(req.params.id).populate(['createdBy', 'publishedBy']);
  if (!notice) throw new AppError('Notice not found', 404);
  res.json({ success: true, data: notice });
});

export const create = asyncHandler(async (req, res) => {
  const notice = await NoticeService.createNotice(req.body, req.user);
  res.status(201).json({ success: true, data: notice });
});

export const update = asyncHandler(async (req, res) => {
  const notice = await NoticeService.updateNotice(req.params.id, req.body, req.user);
  res.json({ success: true, data: notice });
});

export const remove = asyncHandler(async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export const bulk = asyncHandler(async (req, res) => {
  const result = await NoticeService.bulkNotices(req.body, req.user);
  res.json({ success: true, data: result });
});
