import News from '../models/News.js';
import Blog from '../models/Blog.js';
import Tag from '../models/Tag.js';
import { AppError } from '../utils/AppError.js';
import { paginate } from '../utils/apiFeatures.js';
import { makeShortCode, makeSlug } from '../utils/slug.js';
import { sanitizeHtml } from '../utils/sanitize.js';
import { resolveTags } from './tag.service.js';
import { hasPermission } from '../config/roles.js';

function localized(value) {
  if (typeof value === 'string') return { en: value, bn: '' };
  return { en: value?.en || '', bn: value?.bn || '' };
}

function localizedPlain(value) {
  const text = localized(value);
  return `${text.en} ${text.bn}`;
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
  const words = localizedPlain(content).replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function cleanDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function resolveSchedule(status, payload) {
  const requestedDate = cleanDate(payload.scheduledPublishDate || payload.publishDate);
  if (status !== 'Scheduled') {
    return { publishDate: cleanDate(payload.publishDate), scheduledPublishDate: undefined };
  }

  if (!requestedDate) {
    throw new AppError('Publish date/time is required for scheduled news', 400);
  }

  return { publishDate: requestedDate, scheduledPublishDate: requestedDate };
}

async function uniqueSlug(title, currentId) {
  const base = makeSlug(title);
  let slug = base;
  let count = 1;
  while (await News.exists({ slug, _id: { $ne: currentId } })) {
    slug = `${base}-${count++}`;
  }
  return slug;
}

async function uniqueShortUrl(currentId) {
  let code = makeShortCode();
  let candidates = [`/${code}`, `/n/${code}`, `/b/${code}`];
  while (
    await News.exists({ shortUrl: { $in: candidates }, _id: { $ne: currentId } })
    || await Blog.exists({ shortUrl: { $in: candidates } })
  ) {
    code = makeShortCode();
    candidates = [`/${code}`, `/n/${code}`, `/b/${code}`];
  }
  return `/${code}`;
}

export async function listNews(query, user) {
  const filter = {};
  if (user && !hasPermission(user.role, 'news:*')) {
    filter.author = user.id;
  }
  if (query.status) filter.status = query.status;
  if (query.scheduled === 'true') {
    filter.status = 'Scheduled';
    filter.scheduledPublishDate = { $gt: new Date() };
  }
  if (query.country) filter.country = query.country;
  if (query.mainCategory) filter.mainCategory = query.mainCategory;
  if (query.language) filter.language = query.language;
  if (query.search) filter.$text = { $search: query.search };
  ['breakingNews', 'featuredNews', 'videoNews', 'isTrending', 'isPinned'].forEach((key) => {
    if (query[key] !== undefined) filter[key] = query[key] === 'true';
  });
  if (query.categories) filter.categories = { $in: Array.isArray(query.categories) ? query.categories : [query.categories] };
  return paginate(News, filter, query, null, ['author', 'publishedBy', 'mainCategory', 'subCategory', 'categories', 'country', 'tags', 'thumbnailImage', 'imageGallery']);
}

export async function createNews(payload, user) {
  const tags = await resolveTags(payload.tags, payload.tagNames);
  const status = payload.status || 'Draft';
  const schedule = resolveSchedule(status, payload);
  const title = localized(payload.title);
  const content = sanitizeLocalized(payload.content);
  const news = await News.create({
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
    publishDate: status === 'Published' ? cleanDate(payload.publishDate) || new Date() : schedule.publishDate,
    scheduledPublishDate: status === 'Scheduled' ? schedule.scheduledPublishDate : undefined,
    readingTime: readingTime(content)
  });
  await Tag.updateMany({ _id: { $in: tags } }, { $inc: { usageCount: 1 } });
  return news.populate(['author', 'mainCategory', 'categories', 'country', 'tags', 'thumbnailImage', 'imageGallery']);
}

export async function updateNews(id, payload, user) {
  const news = await News.findById(id);
  if (!news) throw new AppError('News not found', 404);
  if (!hasPermission(user.role, 'news:*') && news.author.toString() !== user.id.toString()) {
    throw new AppError('You can only update your own news', 403);
  }
  const previousTitle = primaryTitle(news.title);
  const tags = await resolveTags(payload.tags, payload.tagNames);
  const nextStatus = payload.status || news.status;
  const schedule = resolveSchedule(nextStatus, payload);
  Object.assign(news, payload, {
    title: payload.title ? localized(payload.title) : news.title,
    subtitle: payload.subtitle ? localized(payload.subtitle) : news.subtitle,
    shortDescription: payload.shortDescription ? localized(payload.shortDescription) : news.shortDescription,
    content: payload.content ? sanitizeLocalized(payload.content) : news.content,
    tags: tags.length ? tags : news.tags,
    readingTime: payload.content ? readingTime(payload.content) : news.readingTime
  });
  if (payload.title && primaryTitle(payload.title) !== previousTitle) news.slug = await uniqueSlug(primaryTitle(payload.title), id);
  if (nextStatus === 'Scheduled') {
    news.status = 'Scheduled';
    news.publishDate = schedule.publishDate;
    news.scheduledPublishDate = schedule.scheduledPublishDate;
    news.publishedBy = undefined;
  } else if (nextStatus === 'Published') {
    news.publishedBy = user.id;
    news.publishDate = cleanDate(payload.publishDate) || news.publishDate || new Date();
    news.scheduledPublishDate = undefined;
  } else if (payload.status) {
    news.scheduledPublishDate = undefined;
    news.publishDate = schedule.publishDate;
  }
  await news.save();
  return news.populate(['author', 'publishedBy', 'mainCategory', 'subCategory', 'categories', 'country', 'tags', 'thumbnailImage', 'imageGallery']);
}

export async function bulkNews({ ids, action, mainCategory, subCategory }, user) {
  if (action === 'delete') return News.deleteMany({ _id: { $in: ids } });
  if (action === 'publish') {
    return News.updateMany({ _id: { $in: ids } }, { status: 'Published', publishedBy: user.id, publishDate: new Date(), scheduledPublishDate: undefined });
  }
  if (action === 'category') return News.updateMany({ _id: { $in: ids } }, { mainCategory, subCategory });
  throw new AppError('Unsupported bulk action', 400);
}
