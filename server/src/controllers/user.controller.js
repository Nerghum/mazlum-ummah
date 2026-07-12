import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { paginate } from '../utils/apiFeatures.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { publicUser } from '../services/auth.service.js';

export const list = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.search) filter.$or = [{ name: new RegExp(req.query.search, 'i') }, { email: new RegExp(req.query.search, 'i') }];
  res.json({ success: true, data: await paginate(User, filter, req.query) });
});

export const get = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  res.json({ success: true, data: publicUser(user) });
});

export const create = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: publicUser(user) });
});

export const update = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('+password');
  if (!user) throw new AppError('User not found', 404);
  Object.assign(user, req.body);
  await user.save();
  res.json({ success: true, data: publicUser(user) });
});

export const remove = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
