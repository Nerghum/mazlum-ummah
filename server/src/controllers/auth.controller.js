import * as Auth from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const login = asyncHandler(async (req, res) => {
  const result = await Auth.login(req.body.email, req.body.password);
  res.json({ success: true, data: result });
});

export const refresh = asyncHandler(async (req, res) => {
  const result = await Auth.refresh(req.body.refreshToken);
  res.json({ success: true, data: result });
});

export const logout = asyncHandler(async (req, res) => {
  await Auth.logout(req.user.id);
  res.json({ success: true, message: 'Logged out' });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: Auth.publicUser(req.user) });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const token = await Auth.forgotPassword(req.body.email);
  res.json({ success: true, message: 'If that email exists, reset instructions were created', resetToken: process.env.NODE_ENV === 'production' ? undefined : token });
});

export const resetPassword = asyncHandler(async (req, res) => {
  await Auth.resetPassword(req.body.token, req.body.password);
  res.json({ success: true, message: 'Password reset successful' });
});
