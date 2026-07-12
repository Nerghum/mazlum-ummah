import MediaAchievement from '../models/MediaAchievement.js';
import { AppError } from '../utils/AppError.js';
import { paginate } from '../utils/apiFeatures.js';
import { sanitizeHtml } from '../utils/sanitize.js';
import { makeShortCode, makeSlug } from '../utils/slug.js';

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
  while (await MediaAchievement.exists({ slug, _id: { $ne: currentId } })) slug = `${base}-${count++}`;
  return slug;
}

async function uniqueShortUrl(currentId) {
  let code = makeShortCode();
  while (await MediaAchievement.exists({ shortUrl: `/ma/${code}`, _id: { $ne: currentId } })) code = makeShortCode();
  return `/ma/${code}`;
}

export async function listMediaAchievements(query) {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.language) filter.language = query.language;
  if (query.cardType) filter.cardType = query.cardType;
  if (query.search) filter.$text = { $search: query.search };
  if (query.isFeatured !== undefined) filter.isFeatured = query.isFeatured === 'true';
  if (query.isPinned !== undefined) filter.isPinned = query.isPinned === 'true';
  return paginate(MediaAchievement, filter, query, null, ['author', 'publishedBy', 'thumbnailImage', 'imageGallery']);
}

export async function createMediaAchievement(payload, user) {
  const status = payload.status || 'Draft';
  const title = localized(payload.title);
  const content = sanitizeLocalized(payload.content);
  const item = await MediaAchievement.create({
    ...payload,
    title,
    subtitle: payload.subtitle ? localized(payload.subtitle) : undefined,
    shortDescription: payload.shortDescription ? localized(payload.shortDescription) : undefined,
    content,
    source: payload.source ? localized(payload.source) : undefined,
    linkLabel: payload.linkLabel ? localized(payload.linkLabel) : undefined,
    achievementDate: payload.achievementDate ? localized(payload.achievementDate) : undefined,
    slug: await uniqueSlug(primaryTitle(title)),
    shortUrl: await uniqueShortUrl(),
    status,
    author: payload.author || user.id,
    publishedBy: status === 'Published' ? user.id : undefined,
    publishDate: status === 'Published' ? payload.publishDate || new Date() : payload.publishDate,
    readingTime: readingTime(content)
  });
  return item.populate(['author', 'thumbnailImage', 'imageGallery']);
}

export async function updateMediaAchievement(id, payload, user) {
  const item = await MediaAchievement.findById(id);
  if (!item) throw new AppError('Media achievement not found', 404);
  const previousTitle = primaryTitle(item.title);
  Object.assign(item, payload, {
    title: payload.title ? localized(payload.title) : item.title,
    subtitle: payload.subtitle ? localized(payload.subtitle) : item.subtitle,
    shortDescription: payload.shortDescription ? localized(payload.shortDescription) : item.shortDescription,
    content: payload.content ? sanitizeLocalized(payload.content) : item.content,
    source: payload.source ? localized(payload.source) : item.source,
    linkLabel: payload.linkLabel ? localized(payload.linkLabel) : item.linkLabel,
    achievementDate: payload.achievementDate ? localized(payload.achievementDate) : item.achievementDate,
    readingTime: payload.content ? readingTime(payload.content) : item.readingTime
  });
  if (payload.title && primaryTitle(payload.title) !== previousTitle) item.slug = await uniqueSlug(primaryTitle(payload.title), id);
  if (payload.status === 'Published' && item.status !== 'Published') {
    item.publishedBy = user.id;
    item.publishDate = payload.publishDate || new Date();
  }
  await item.save();
  return item.populate(['author', 'publishedBy', 'thumbnailImage', 'imageGallery']);
}

export async function bulkMediaAchievements({ ids, action }, user) {
  if (action === 'delete') return MediaAchievement.deleteMany({ _id: { $in: ids } });
  if (action === 'publish') return MediaAchievement.updateMany({ _id: { $in: ids } }, { status: 'Published', publishedBy: user.id, publishDate: new Date() });
  if (action === 'archive') return MediaAchievement.updateMany({ _id: { $in: ids } }, { status: 'Archived' });
  throw new AppError('Unsupported bulk action', 400);
}
