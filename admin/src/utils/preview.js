export const FRONTEND_URL = (import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');

export function newsPreviewUrl(news) {
  if (!news?.slug) return '';
  const categorySlug = news.mainCategory?.slug || news.categories?.[0]?.slug || 'general';
  return `${FRONTEND_URL}/news/${categorySlug}/${news.slug}`;
}

export function blogPreviewUrl(blog) {
  if (!blog?.slug) return '';
  return `${FRONTEND_URL}/blogs/${blog.slug}`;
}

export function shortlinkUrl(item) {
  if (!item?.shortUrl) return '';
  if (item.shortUrl.startsWith('http://') || item.shortUrl.startsWith('https://')) return item.shortUrl;
  const shortPath = item.shortUrl.startsWith('/') ? item.shortUrl : `/${item.shortUrl}`;
  return `${FRONTEND_URL}${shortPath.replace(/^\/(?:n|b)\//, '/')}`;
}

export function mediaAchievementPreviewUrl(item) {
  if (!item?.slug) return '';
  return `${FRONTEND_URL}/media-achievements/${item.slug}`;
}

export function categoryPreviewUrl(category, type = 'news') {
  if (!category?.slug) return '';
  return type === 'blog'
    ? `${FRONTEND_URL}/blogs/category/${category.slug}`
    : `${FRONTEND_URL}/news/${category.slug}`;
}

export function noticePreviewUrl(notice) {
  if (!notice?.slug) return '';
  return `${FRONTEND_URL}/notice#${notice.slug}`;
}
