import { env } from '../config/env.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { hashToken, randomToken, signAccessToken, signRefreshToken } from '../utils/tokens.js';

export async function login(email, password) {
  const user = await User.findOne({ email }).select('+password +tokenVersion');
  if (!user || !(await user.comparePassword(password))) throw new AppError('Invalid email or password', 401);
  if (!user.isActive) throw new AppError('Account is disabled', 403);

  user.lastLoginAt = new Date();
  await user.save();

  return issueTokens(user);
}

export function issueTokens(user) {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user, user.tokenVersion || 0);
  return { accessToken, refreshToken, user: publicUser(user) };
}

export async function refresh(refreshToken) {
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, env.jwtRefreshSecret);
  } catch {
    throw new AppError('Invalid refresh token', 401);
  }

  const user = await User.findById(decoded.sub).select('+tokenVersion');
  if (!user || decoded.tokenVersion !== user.tokenVersion) throw new AppError('Invalid refresh token', 401);
  return issueTokens(user);
}

export async function logout(userId) {
  await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
}

export async function forgotPassword(email) {
  const user = await User.findOne({ email }).select('+resetPasswordToken +resetPasswordExpires');
  if (!user) return null;
  const rawToken = randomToken();
  user.resetPasswordToken = hashToken(rawToken);
  user.resetPasswordExpires = new Date(Date.now() + env.resetMinutes * 60 * 1000);
  await user.save();
  return rawToken;
}

export async function resetPassword(token, password) {
  const user = await User.findOne({
    resetPasswordToken: hashToken(token),
    resetPasswordExpires: { $gt: new Date() }
  }).select('+resetPasswordToken +resetPasswordExpires +password +tokenVersion');
  if (!user) throw new AppError('Reset token is invalid or expired', 400);
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.tokenVersion += 1;
  await user.save();
}

export function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isActive: user.isActive
  };
}
