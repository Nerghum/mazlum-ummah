import Notice from '../models/Notice.js';
import { AppError } from '../utils/AppError.js';
import { paginate } from '../utils/apiFeatures.js';
import { sanitizeHtml } from '../utils/sanitize.js';
import { makeSlug } from '../utils/slug.js';

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

async function uniqueSlug(title, currentId) {
  const base = makeSlug(title);
  let slug = base;
  let count = 1;
  while (await Notice.exists({ slug, _id: { $ne: currentId } })) {
    slug = `${base}-${count++}`;
  }
  return slug;
}

function cleanDate(value) {
  return value ? new Date(value) : undefined;
}

export async function listNotices(query) {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.search) filter.$text = { $search: query.search };
  return paginate(Notice, filter, query, null, ['createdBy', 'publishedBy']);
}

export async function createNotice(payload, user) {
  const status = payload.status || 'Draft';
  const title = localized(payload.title);
  const notice = await Notice.create({
    ...payload,
    title,
    summary: payload.summary ? localized(payload.summary) : undefined,
    content: sanitizeLocalized(payload.content),
    slug: await uniqueSlug(primaryTitle(title)),
    status,
    publishDate: status === 'Published' ? cleanDate(payload.publishDate) || new Date() : cleanDate(payload.publishDate),
    expiresAt: cleanDate(payload.expiresAt),
    createdBy: user.id,
    publishedBy: status === 'Published' ? user.id : undefined
  });
  return notice.populate(['createdBy', 'publishedBy']);
}

export async function updateNotice(id, payload, user) {
  const notice = await Notice.findById(id);
  if (!notice) throw new AppError('Notice not found', 404);
  const previousTitle = primaryTitle(notice.title);
  Object.assign(notice, payload, {
    title: payload.title ? localized(payload.title) : notice.title,
    summary: payload.summary ? localized(payload.summary) : notice.summary,
    content: payload.content ? sanitizeLocalized(payload.content) : notice.content,
    publishDate: cleanDate(payload.publishDate) || notice.publishDate,
    expiresAt: cleanDate(payload.expiresAt) || undefined
  });
  if (payload.title && primaryTitle(payload.title) !== previousTitle) {
    notice.slug = await uniqueSlug(primaryTitle(payload.title), id);
  }
  if (payload.status === 'Published' && notice.status !== 'Published') {
    notice.publishedBy = user.id;
    notice.publishDate = cleanDate(payload.publishDate) || new Date();
  }
  await notice.save();
  return notice.populate(['createdBy', 'publishedBy']);
}

export async function bulkNotices({ ids, action }, user) {
  if (action === 'delete') return Notice.deleteMany({ _id: { $in: ids } });
  if (action === 'publish') return Notice.updateMany({ _id: { $in: ids } }, { status: 'Published', publishedBy: user.id, publishDate: new Date() });
  if (action === 'archive') return Notice.updateMany({ _id: { $in: ids } }, { status: 'Archived' });
  throw new AppError('Unsupported bulk action', 400);
}
