import Blog from '../models/Blog.js';
import News from '../models/News.js';
import Tag from '../models/Tag.js';
import { AppError } from '../utils/AppError.js';
import { paginate } from '../utils/apiFeatures.js';
import { sanitizeHtml } from '../utils/sanitize.js';
import { makeShortCode, makeSlug } from '../utils/slug.js';
import { resolveTags } from './tag.service.js';
import { hasPermission } from '../config/roles.js';

function localized(value) {
  if (typeof value === 'string') return { en: value, bn: '' };
  return { en: value?.en || '', bn: value?.bn || '' };
}

function primaryTitle(value) {
  const text = localized(value);
  return text.en || text.bn;
}

function sanitizeLocalized(value) {
  const text = localized(value);
  return { en: sanitizeHtml(text.en), bn: sanitizeHtml(text.bn) };
}

function readingTime(content) {
  const text = localized(content);
  const words = `${text.en} ${text.bn}`.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

async function uniqueSlug(title, currentId) {
  const base = makeSlug(title);
  let slug = base;
  let count = 1;
  while (await Blog.exists({ slug, _id: { $ne: currentId } })) slug = `${base}-${count++}`;
  return slug;
}

async function uniqueShortUrl(currentId) {
  let code = makeShortCode();
  let candidates = [`/${code}`, `/n/${code}`, `/b/${code}`];
  while (
    await Blog.exists({ shortUrl: { $in: candidates }, _id: { $ne: currentId } })
    || await News.exists({ shortUrl: { $in: candidates } })
  ) {
    code = makeShortCode();
    candidates = [`/${code}`, `/n/${code}`, `/b/${code}`];
  }
  return `/${code}`;
}

export async function listBlogs(query, user) {
  const filter = {};
  if (user && !hasPermission(user.role, 'blog:*')) {
    filter.author = user.id;
  }
  if (query.status) filter.status = query.status;
  if (query.mainCategory) filter.mainCategory = query.mainCategory;
  if (query.language) filter.language = query.language;
  if (query.search) filter.$text = { $search: query.search };
  if (query.isFeatured !== undefined) filter.isFeatured = query.isFeatured === 'true';
  if (query.isPinned !== undefined) filter.isPinned = query.isPinned === 'true';
  if (query.categories) filter.categories = { $in: Array.isArray(query.categories) ? query.categories : [query.categories] };
  return paginate(Blog, filter, query, null, ['author', 'publishedBy', 'mainCategory', 'subCategory', 'categories', 'tags', 'thumbnailImage', 'imageGallery']);
}

export async function createBlog(payload, user) {
  const tags = await resolveTags(payload.tags, payload.tagNames);
  const status = payload.status || 'Draft';
  const title = localized(payload.title);
  const content = sanitizeLocalized(payload.content);
  const blog = await Blog.create({
    ...payload,
    title,
    subtitle: payload.subtitle ? localized(payload.subtitle) : undefined,
    shortDescription: payload.shortDescription ? localized(payload.shortDescription) : undefined,
    content,
    slug: await uniqueSlug(primaryTitle(title)),
    shortUrl: await uniqueShortUrl(),
    tags,
    status,
    author: payload.author || user.id,
    publishedBy: status === 'Published' ? user.id : undefined,
    publishDate: status === 'Published' ? payload.publishDate || new Date() : payload.publishDate,
    readingTime: readingTime(content)
  });
  await Tag.updateMany({ _id: { $in: tags } }, { $inc: { usageCount: 1 } });
  return blog.populate(['author', 'mainCategory', 'categories', 'tags', 'thumbnailImage', 'imageGallery']);
}

export async function updateBlog(id, payload, user) {
  const blog = await Blog.findById(id);
  if (!blog) throw new AppError('Blog not found', 404);
  if (!hasPermission(user.role, 'blog:*') && blog.author.toString() !== user.id.toString()) {
    throw new AppError('You can only update your own blog', 403);
  }
  const previousTitle = primaryTitle(blog.title);
  const tags = await resolveTags(payload.tags, payload.tagNames);
  Object.assign(blog, payload, {
    title: payload.title ? localized(payload.title) : blog.title,
    subtitle: payload.subtitle ? localized(payload.subtitle) : blog.subtitle,
    shortDescription: payload.shortDescription ? localized(payload.shortDescription) : blog.shortDescription,
    content: payload.content ? sanitizeLocalized(payload.content) : blog.content,
    tags: tags.length ? tags : blog.tags,
    readingTime: payload.content ? readingTime(payload.content) : blog.readingTime
  });
  if (payload.title && primaryTitle(payload.title) !== previousTitle) blog.slug = await uniqueSlug(primaryTitle(payload.title), id);
  if (payload.status === 'Published' && blog.status !== 'Published') {
    blog.publishedBy = user.id;
    blog.publishDate = payload.publishDate || new Date();
  }
  await blog.save();
  return blog.populate(['author', 'publishedBy', 'mainCategory', 'subCategory', 'categories', 'tags', 'thumbnailImage', 'imageGallery']);
}

export async function bulkBlogs({ ids, action, mainCategory, subCategory }, user) {
  if (action === 'delete') return Blog.deleteMany({ _id: { $in: ids } });
  if (action === 'publish') return Blog.updateMany({ _id: { $in: ids } }, { status: 'Published', publishedBy: user.id, publishDate: new Date() });
  if (action === 'category') return Blog.updateMany({ _id: { $in: ids } }, { mainCategory, subCategory });
  throw new AppError('Unsupported bulk action', 400);
}
