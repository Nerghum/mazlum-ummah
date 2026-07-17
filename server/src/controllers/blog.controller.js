import Blog from '../models/Blog.js';
import * as BlogService from '../services/blog.service.js';
import { AppError } from '../utils/AppError.js';
import { hasPermission } from '../config/roles.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await BlogService.listBlogs(req.query, req.user) });
});

export const get = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate(['author', 'publishedBy', 'mainCategory', 'subCategory', 'categories', 'tags', 'thumbnailImage', 'imageGallery']);
  if (!blog) throw new AppError('Blog not found', 404);
  res.json({ success: true, data: blog });
});

export const create = asyncHandler(async (req, res) => {
  const blog = await BlogService.createBlog(req.body, req.user);
  res.status(201).json({ success: true, data: blog });
});

export const update = asyncHandler(async (req, res) => {
  const blog = await BlogService.updateBlog(req.params.id, req.body, req.user);
  res.json({ success: true, data: blog });
});

export const remove = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new AppError('Blog not found', 404);
  if (!hasPermission(req.user.role, 'blog:*') && blog.author.toString() !== req.user.id.toString()) {
    throw new AppError('You can only delete your own blog', 403);
  }
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export const bulk = asyncHandler(async (req, res) => {
  const result = await BlogService.bulkBlogs(req.body, req.user);
  res.json({ success: true, data: result });
});
