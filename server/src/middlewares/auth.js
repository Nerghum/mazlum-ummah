import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { hasPermission } from '../config/roles.js';
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const authenticate = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) throw new AppError('Authentication required', 401);

  let decoded;
  try {
    decoded = jwt.verify(token, env.jwtAccessSecret);
  } catch {
    throw new AppError('Session expired. Please login again.', 401);
  }

  const user = await User.findById(decoded.sub).select('+passwordChangedAt');
  if (!user || !user.isActive) throw new AppError('Invalid token user', 401);

  req.user = user;
  next();
});

export const authorize = (...requiredPermissions) => (req, _res, next) => {
  if (!req.user) return next(new AppError('Authentication required', 401));
  const allowed = requiredPermissions.some((permission) => hasPermission(req.user.role, permission));
  if (!allowed) return next(new AppError('You do not have permission for this action', 403));
  next();
};
