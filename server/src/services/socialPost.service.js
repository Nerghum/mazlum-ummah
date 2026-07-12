import SocialPost from '../models/SocialPost.js';
import { AppError } from '../utils/AppError.js';
import { paginate } from '../utils/apiFeatures.js';

const populate = ['authorAvatar', 'images', 'videoThumbnail'];

function normalizeHashtags(hashtags = []) {
  return hashtags
    .map((tag) => String(tag || '').trim())
    .filter(Boolean)
    .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));
}

function normalizePayload(payload) {
  const postType = payload.postType || 'image';
  const publishDate = payload.publishDate || (payload.status === 'Published' ? new Date() : undefined);
  return {
    ...payload,
    postType,
    hashtags: normalizeHashtags(payload.hashtags),
    images: postType === 'image' ? payload.images || [] : [],
    videoUrl: postType === 'video' ? payload.videoUrl || '' : '',
    videoThumbnail: postType === 'video' ? payload.videoThumbnail || null : null,
    publishDate
  };
}

export async function listSocialPosts(query) {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.postType) filter.postType = query.postType;
  if (query.search) filter.$text = { $search: query.search };
  if (query.isPinned !== undefined) filter.isPinned = query.isPinned === 'true';
  return paginate(SocialPost, filter, query, null, populate);
}

export async function createSocialPost(payload) {
  const item = await SocialPost.create(normalizePayload(payload));
  return item.populate(populate);
}

export async function updateSocialPost(id, payload) {
  const item = await SocialPost.findById(id);
  if (!item) throw new AppError('Social post not found', 404);
  Object.assign(item, normalizePayload(payload));
  await item.save();
  return item.populate(populate);
}

export async function bulkSocialPosts({ ids, action }) {
  if (action === 'delete') return SocialPost.deleteMany({ _id: { $in: ids } });
  if (action === 'publish') return SocialPost.updateMany({ _id: { $in: ids } }, { status: 'Published', publishDate: new Date() });
  if (action === 'archive') return SocialPost.updateMany({ _id: { $in: ids } }, { status: 'Archived' });
  throw new AppError('Unsupported bulk action', 400);
}

export { populate as socialPostPopulate };
