import crypto from 'node:crypto';
import Analytics from '../models/Analytics.js';
import Blog from '../models/Blog.js';
import MediaAchievement from '../models/MediaAchievement.js';
import News from '../models/News.js';

const DAY_MS = 24 * 60 * 60 * 1000;

function hashValue(value = '') {
  return crypto.createHash('sha256').update(String(value || '')).digest('hex');
}

function cleanPath(value = '/') {
  const path = String(value || '/').split('?')[0] || '/';
  return path.startsWith('/') ? path : `/${path}`;
}

function localizedTitle(value) {
  if (typeof value === 'string') return value;
  return value?.en || value?.bn || '';
}

function dateRange(query = {}) {
  const now = new Date();
  const fallbackFrom = new Date(now.getTime() - 30 * DAY_MS);
  const from = query.dateFrom ? new Date(query.dateFrom) : fallbackFrom;
  const to = query.dateTo ? new Date(query.dateTo) : now;
  const safeFrom = Number.isNaN(from.getTime()) ? fallbackFrom : from;
  const safeTo = Number.isNaN(to.getTime()) ? now : to;
  safeTo.setHours(23, 59, 59, 999);
  return { from: safeFrom, to: safeTo };
}

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfMonth() {
  const date = new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function parseUserAgent(userAgent = '') {
  const ua = userAgent || '';
  const isMobile = /Mobile|Android|iPhone|iPod/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua);
  const device = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';
  const browser = /Edg\//i.test(ua)
    ? 'Edge'
    : /OPR\//i.test(ua)
      ? 'Opera'
      : /Chrome\//i.test(ua)
        ? 'Chrome'
        : /Safari\//i.test(ua)
          ? 'Safari'
          : /Firefox\//i.test(ua)
            ? 'Firefox'
            : 'Other';
  const os = /Windows/i.test(ua)
    ? 'Windows'
    : /Android/i.test(ua)
      ? 'Android'
      : /iPhone|iPad|iPod/i.test(ua)
        ? 'iOS'
        : /Mac OS X|Macintosh/i.test(ua)
          ? 'macOS'
          : /Linux/i.test(ua)
            ? 'Linux'
            : 'Other';

  return { device, browser, os };
}

function requestLocation(req) {
  return {
    country: req.get('cf-ipcountry') || req.get('x-vercel-ip-country') || req.get('x-country-code') || 'Unknown',
    region: req.get('x-vercel-ip-country-region') || req.get('x-region') || '',
    city: req.get('x-vercel-ip-city') || req.get('x-city') || ''
  };
}

async function inferContent(path) {
  const newsMatch = path.match(/^\/news\/[^/]+\/([^/?#]+)/);
  if (newsMatch) {
    const news = await News.findOne({ slug: newsMatch[1] }).select('_id title mainCategory').lean();
    if (news) {
      return {
        contentType: 'news',
        news: news._id,
        category: news.mainCategory,
        pageTitle: localizedTitle(news.title)
      };
    }
  }

  const blogMatch = path.match(/^\/blogs\/([^/?#]+)/);
  if (blogMatch && blogMatch[1] !== 'category') {
    const blog = await Blog.findOne({ slug: blogMatch[1] }).select('_id title mainCategory').lean();
    if (blog) {
      return {
        contentType: 'blog',
        blog: blog._id,
        category: blog.mainCategory,
        pageTitle: localizedTitle(blog.title)
      };
    }
  }

  const mediaMatch = path.match(/^\/media-achievements\/([^/?#]+)/);
  if (mediaMatch) {
    const mediaAchievement = await MediaAchievement.findOne({ slug: mediaMatch[1] }).select('_id title').lean();
    if (mediaAchievement) {
      return {
        contentType: 'media-achievement',
        mediaAchievement: mediaAchievement._id,
        pageTitle: localizedTitle(mediaAchievement.title)
      };
    }
  }

  return { contentType: 'page' };
}

async function uniqueVisitors(match) {
  const rows = await Analytics.aggregate([
    { $match: match },
    { $group: { _id: { $ifNull: ['$visitorIdHash', '$ipHash'] } } },
    { $count: 'count' }
  ]);
  return rows[0]?.count || 0;
}

async function groupedCounts(match, field, limit = 12) {
  return Analytics.aggregate([
    { $match: match },
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit }
  ]);
}

export async function trackEvent({ req, news, event, metadata = {} }) {
  const ipHash = hashValue(req.ip || '');
  const userAgent = req.get('user-agent') || '';
  const parsedAgent = parseUserAgent(userAgent);
  const location = requestLocation(req);
  await Analytics.create({
    news,
    event,
    contentType: news ? 'news' : 'page',
    userAgent,
    ipHash,
    ...parsedAgent,
    ...location,
    metadata
  });
  if (event === 'view') await News.findByIdAndUpdate(news, { $inc: { views: 1 } });
  if (event === 'share') await News.findByIdAndUpdate(news, { $inc: { shares: 1 } });
}

export async function trackPageView({ req, payload = {} }) {
  const path = cleanPath(payload.path);
  const inferred = await inferContent(path);
  const userAgent = req.get('user-agent') || '';
  const parsedAgent = parseUserAgent(userAgent);
  const location = requestLocation(req);
  const referrer = payload.referrer || req.get('referer') || '';

  const row = await Analytics.create({
    event: 'page-view',
    path,
    pageTitle: inferred.pageTitle || payload.title || path,
    news: inferred.news,
    blog: inferred.blog,
    mediaAchievement: inferred.mediaAchievement,
    category: inferred.category,
    contentType: inferred.contentType,
    userAgent,
    ipHash: hashValue(req.ip || ''),
    visitorIdHash: payload.visitorId ? hashValue(payload.visitorId) : undefined,
    referrer,
    language: payload.language || req.get('accept-language') || '',
    timezone: payload.timezone || '',
    metadata: {
      screen: payload.screen || null
    },
    ...parsedAgent,
    ...location
  });

  if (inferred.news) await News.findByIdAndUpdate(inferred.news, { $inc: { views: 1 } });
  if (inferred.blog) await Blog.findByIdAndUpdate(inferred.blog, { $inc: { views: 1 } });
  if (inferred.mediaAchievement) await MediaAchievement.findByIdAndUpdate(inferred.mediaAchievement, { $inc: { views: 1 } });

  return row;
}

export async function dashboardStats(query = {}) {
  const { from, to } = dateRange(query);
  const selectedDay = query.day ? new Date(query.day) : startOfToday();
  const dayFrom = Number.isNaN(selectedDay.getTime()) ? startOfToday() : selectedDay;
  dayFrom.setHours(0, 0, 0, 0);
  const dayTo = new Date(dayFrom);
  dayTo.setHours(23, 59, 59, 999);

  const rangeMatch = { event: 'page-view', createdAt: { $gte: from, $lte: to } };
  const todayMatch = { event: 'page-view', createdAt: { $gte: startOfToday() } };
  const monthMatch = { event: 'page-view', createdAt: { $gte: startOfMonth() } };
  const allViewsMatch = { event: 'page-view' };

  const [
    totalNews,
    publishedNews,
    draftNews,
    trendingNews,
    totalViews,
    totalVisitors,
    todayViews,
    todayVisitors,
    monthViews,
    monthVisitors,
    mostViewed,
    dailyVisitors,
    monthlyVisitors,
    mostVisitedPages,
    mostVisitedPosts,
    mostVisitedByDay,
    devices,
    browsers,
    operatingSystems,
    countries,
    referrers,
    recentVisitors
  ] = await Promise.all([
    News.countDocuments(),
    News.countDocuments({ status: 'Published' }),
    News.countDocuments({ status: 'Draft' }),
    News.countDocuments({ isTrending: true }),
    Analytics.countDocuments(allViewsMatch),
    uniqueVisitors(allViewsMatch),
    Analytics.countDocuments(todayMatch),
    uniqueVisitors(todayMatch),
    Analytics.countDocuments(monthMatch),
    uniqueVisitors(monthMatch),
    News.find().sort('-views').limit(5).select('title views slug').lean(),
    Analytics.aggregate([
      { $match: rangeMatch },
      {
        $group: {
          _id: { $dateToString: { date: '$createdAt', format: '%Y-%m-%d' } },
          views: { $sum: 1 },
          visitors: { $addToSet: { $ifNull: ['$visitorIdHash', '$ipHash'] } }
        }
      },
      { $project: { _id: 1, views: 1, visitors: { $size: '$visitors' } } },
      { $sort: { _id: 1 } }
    ]),
    Analytics.aggregate([
      { $match: { event: 'page-view', createdAt: { $gte: new Date(Date.now() - 365 * DAY_MS) } } },
      {
        $group: {
          _id: { $dateToString: { date: '$createdAt', format: '%Y-%m' } },
          views: { $sum: 1 },
          visitors: { $addToSet: { $ifNull: ['$visitorIdHash', '$ipHash'] } }
        }
      },
      { $project: { _id: 1, views: 1, visitors: { $size: '$visitors' } } },
      { $sort: { _id: 1 } }
    ]),
    Analytics.aggregate([
      { $match: { ...rangeMatch, path: { $exists: true, $ne: '' } } },
      { $group: { _id: '$path', title: { $last: '$pageTitle' }, views: { $sum: 1 }, visitors: { $addToSet: { $ifNull: ['$visitorIdHash', '$ipHash'] } } } },
      { $project: { path: '$_id', title: 1, views: 1, visitors: { $size: '$visitors' } } },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]),
    Analytics.aggregate([
      { $match: { ...rangeMatch, contentType: { $in: ['news', 'blog'] } } },
      { $group: { _id: '$path', title: { $last: '$pageTitle' }, type: { $last: '$contentType' }, views: { $sum: 1 }, visitors: { $addToSet: { $ifNull: ['$visitorIdHash', '$ipHash'] } } } },
      { $project: { path: '$_id', title: 1, type: 1, views: 1, visitors: { $size: '$visitors' } } },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]),
    Analytics.aggregate([
      { $match: { event: 'page-view', createdAt: { $gte: dayFrom, $lte: dayTo }, path: { $exists: true, $ne: '' } } },
      { $group: { _id: '$path', title: { $last: '$pageTitle' }, views: { $sum: 1 }, visitors: { $addToSet: { $ifNull: ['$visitorIdHash', '$ipHash'] } } } },
      { $project: { path: '$_id', title: 1, views: 1, visitors: { $size: '$visitors' } } },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]),
    groupedCounts(rangeMatch, 'device'),
    groupedCounts(rangeMatch, 'browser'),
    groupedCounts(rangeMatch, 'os'),
    groupedCounts(rangeMatch, 'country', 20),
    groupedCounts({ ...rangeMatch, referrer: { $exists: true, $ne: '' } }, 'referrer', 10),
    Analytics.find(rangeMatch)
      .sort('-createdAt')
      .limit(50)
      .select('createdAt path pageTitle contentType country region city device browser os referrer language timezone visitorIdHash ipHash')
      .lean()
  ]);

  const dailyViews = dailyVisitors.map((item) => ({
    _id: { day: item._id, event: 'page-view' },
    count: item.views
  }));

  return {
    totalNews,
    publishedNews,
    draftNews,
    trendingNews,
    mostViewed,
    dailyViews,
    filters: {
      dateFrom: from.toISOString().slice(0, 10),
      dateTo: to.toISOString().slice(0, 10),
      day: dayFrom.toISOString().slice(0, 10)
    },
    summary: {
      totalViews,
      totalVisitors,
      todayViews,
      todayVisitors,
      monthViews,
      monthVisitors
    },
    dailyVisitors,
    monthlyVisitors,
    mostVisitedPages,
    mostVisitedPosts,
    mostVisitedByDay,
    breakdowns: {
      devices,
      browsers,
      operatingSystems,
      countries,
      referrers
    },
    recentVisitors: recentVisitors.map((item) => ({
      ...item,
      visitor: (item.visitorIdHash || item.ipHash || '').slice(0, 10)
    }))
  };
}
