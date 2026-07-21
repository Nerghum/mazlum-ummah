import { Router } from 'express';
import Advertisement from '../models/Advertisement.js';
import Media from '../models/Media.js';
import MediaAchievement from '../models/MediaAchievement.js';
import News from '../models/News.js';
import Blog from '../models/Blog.js';
import Category from '../models/Category.js';
import Notice from '../models/Notice.js';
import Setting from '../models/Setting.js';
import SocialPost from '../models/SocialPost.js';
import HomepageSection from '../models/HomepageSection.js';
import * as FaqController from '../controllers/faq.controller.js';
import * as MenuController from '../controllers/menu.controller.js';
import { submitContactForm } from '../controllers/contact.controller.js';
import Comment from '../models/Comment.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { normalizeHomepageSection } from '../utils/homepageTitle.js';

const router = Router();

function visiblePublishedFilter(extra = {}) {
  const now = new Date();
  const nowString = now.toISOString();
  return {
    ...extra,
    status: 'Published',
    $and: [
      ...(extra.$and || []),
      { $or: [
        { publishDate: { $exists: false } }, 
        { publishDate: null }, 
        { publishDate: { $lte: now } },
        { publishDate: { $type: 'string', $lte: nowString } }
      ] }
    ]
  };
}

function shortUrlCandidates(code) {
  const cleanCode = String(code || '').replace(/^\/+/, '');
  return [`/${cleanCode}`, `/n/${cleanCode}`, `/b/${cleanCode}`];
}

function newsPath(news) {
  const categorySlug = news.mainCategory?.slug || news.categories?.[0]?.slug || 'general';
  return `/news/${categorySlug}/${news.slug}`;
}

router.get('/advertisements', asyncHandler(async (req, res) => {
  const now = new Date();
  const filter = {
    isActive: true,
    $and: [
      { $or: [{ startsAt: { $exists: false } }, { startsAt: null }, { startsAt: { $lte: now } }] },
      { $or: [{ endsAt: { $exists: false } }, { endsAt: null }, { endsAt: { $gte: now } }] }
    ]
  };
  if (req.query.position) filter.placements = req.query.position;
  const ads = await Advertisement.find(filter)
    .sort('priorityOrder -createdAt')
    .limit(Number(req.query.limit || 10))
    .populate(['media', 'mobileMedia'])
    .lean();
  res.json({ success: true, data: ads });
}));

router.get('/settings', asyncHandler(async (_req, res) => {
  const allowedKeys = [
    'site.title',
    'site.tagline',
    'site.description',
    'site.logo',
    'site.favicon',
    'site.facebookUrl',
    'site.youtubeUrl',
    'site.linkedinUrl',
    'site.instagramUrl',
    'site.whatsappUrl'
  ];
  const settings = await Setting.find({
    $or: [
      { key: { $in: allowedKeys } },
      { key: /^policy\./ }
    ]
  }).lean();
  const data = settings.reduce((items, item) => ({ ...items, [item.key]: item.value }), {});
  const mediaKeys = ['site.logo', 'site.favicon'];
  const mediaIds = mediaKeys.map((key) => data[key]).filter(Boolean);
  const mediaItems = mediaIds.length ? await Media.find({ _id: { $in: mediaIds } }).lean() : [];
  const mediaById = new Map(mediaItems.map((item) => [String(item._id), item]));
  res.json({
    success: true,
    data: {
      ...data,
      'site.logoMedia': mediaById.get(String(data['site.logo'])) || null,
      'site.faviconMedia': mediaById.get(String(data['site.favicon'])) || null
    }
  });
}));

router.get('/menu', MenuController.publicMenu);
router.get('/faqs', FaqController.publicFaqs);

router.get('/shortlinks/:code', asyncHandler(async (req, res) => {
  const candidates = shortUrlCandidates(req.params.code);
  const news = await News.findOne(visiblePublishedFilter({ shortUrl: { $in: candidates } }))
    .populate(['mainCategory', 'categories'])
    .lean();
  if (news) {
    return res.json({
      success: true,
      data: {
        type: 'news',
        slug: news.slug,
        shortUrl: news.shortUrl,
        url: newsPath(news)
      }
    });
  }

  const blog = await Blog.findOne(visiblePublishedFilter({ shortUrl: { $in: candidates } }))
    .lean();
  if (blog) {
    return res.json({
      success: true,
      data: {
        type: 'blog',
        slug: blog.slug,
        shortUrl: blog.shortUrl,
        url: `/blogs/${blog.slug}`
      }
    });
  }

  return res.status(404).json({ success: false, message: 'Shortlink not found' });
}));

router.get('/rss', asyncHandler(async (_req, res) => {
  const items = await News.find(visiblePublishedFilter()).sort('-publishDate').limit(30).select('title slug shortDescription publishDate').lean();
  const xml = `<?xml version="1.0"?><rss version="2.0"><channel><title>News Portal</title>${items.map((item) => `<item><title>${item.title?.en || item.title?.bn || ''}</title><link>/news/${item.slug}</link><description>${item.shortDescription?.en || item.shortDescription?.bn || ''}</description><pubDate>${item.publishDate?.toUTCString() || ''}</pubDate></item>`).join('')}</channel></rss>`;
  res.type('application/rss+xml').send(xml);
}));

router.get('/homepage', asyncHandler(async (_req, res) => {
  const sections = await HomepageSection.find({ isActive: true })
    .sort('order')
    .populate([
      { path: 'news', match: visiblePublishedFilter(), populate: [{ path: 'author' }, { path: 'mainCategory' }, { path: 'categories' }, { path: 'thumbnailImage' }, { path: 'imageGallery' }] },
      { path: 'blogs', match: { status: 'Published' }, populate: [{ path: 'author' }, { path: 'mainCategory' }, { path: 'categories' }, { path: 'thumbnailImage' }, { path: 'imageGallery' }] },
      { path: 'categories' }
    ])
    .lean();
  res.json({ success: true, data: sections.map(normalizeHomepageSection) });
}));

router.get('/categories/:type', asyncHandler(async (req, res) => {
  const { type } = req.params;
  if (!['news', 'blog'].includes(type)) {
    return res.status(400).json({ success: false, message: 'Unsupported category type' });
  }

  const categories = await Category.find({ type, isActive: true })
    .sort('sortOrder name')
    .populate(['image', 'bannerImage'])
    .lean();
  res.json({ success: true, data: categories });
}));

router.get('/categories/:type/:slug', asyncHandler(async (req, res) => {
  const { type, slug } = req.params;
  if (!['news', 'blog'].includes(type)) {
    return res.status(400).json({ success: false, message: 'Unsupported category type' });
  }

  const category = await Category.findOne({ type, slug, isActive: true })
    .populate(['image', 'bannerImage'])
    .lean();
  res.json({ success: true, data: category });
}));

router.get('/news', asyncHandler(async (req, res) => {
  const filter = visiblePublishedFilter();
  if (req.query.language) filter.language = req.query.language;
  if (req.query.breakingNews !== undefined) filter.breakingNews = req.query.breakingNews === 'true';
  if (req.query.mostRead !== undefined) filter.mostRead = req.query.mostRead === 'true';
  if (req.query.featuredNews !== undefined) filter.featuredNews = req.query.featuredNews === 'true';
  const publishDateRange = {};
  if (req.query.dateFrom) {
    const dateFrom = new Date(req.query.dateFrom);
    if (!Number.isNaN(dateFrom.getTime())) publishDateRange.$gte = dateFrom;
  }
  if (req.query.dateTo) {
    const dateTo = new Date(req.query.dateTo);
    if (!Number.isNaN(dateTo.getTime())) publishDateRange.$lte = dateTo;
  }
  if (Object.keys(publishDateRange).length) {
    filter.$and.push({ publishDate: publishDateRange });
  }
  if (req.query.categorySlug) {
    const category = await Category.findOne({ slug: req.query.categorySlug, type: 'news' }).select('_id').lean();
    if (category) {
      filter.$and.push({ $or: [{ mainCategory: category._id }, { categories: category._id }] });
    } else {
      filter._id = null;
    }
  }
  if (req.query.search) filter.$text = { $search: req.query.search };
  const sort = req.query.sort === 'views' ? '-views -publishDate' : '-isPinned -publishDate';
  const news = await News.find(filter).sort(sort).limit(Number(req.query.limit || 48)).populate(['author', 'mainCategory', 'subCategory', 'categories', 'country', 'tags', 'thumbnailImage', 'imageGallery']).lean();
  res.json({ success: true, data: news });
}));

router.get('/news/:slug', asyncHandler(async (req, res) => {
  const news = await News.findOne(visiblePublishedFilter({ slug: req.params.slug })).populate(['author', 'mainCategory', 'subCategory', 'categories', 'country', 'tags', 'thumbnailImage', 'imageGallery']).lean();
  res.json({ success: true, data: news });
}));

router.get('/blogs', asyncHandler(async (req, res) => {
  const filter = { status: 'Published' };
  if (req.query.language) filter.language = req.query.language;
  if (req.query.categorySlug) {
    const category = await Category.findOne({ slug: req.query.categorySlug, type: 'blog' }).select('_id').lean();
    if (category) {
      filter.$or = [{ mainCategory: category._id }, { categories: category._id }];
    } else {
      filter._id = null;
    }
  }
  const blogs = await Blog.find(filter).sort('-publishDate').limit(Number(req.query.limit || 30)).populate(['author', 'mainCategory', 'categories', 'tags', 'thumbnailImage', 'imageGallery']).lean();
  res.json({ success: true, data: blogs });
}));

router.get('/blogs/:slug', asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, status: 'Published' }).populate(['author', 'mainCategory', 'subCategory', 'categories', 'tags', 'thumbnailImage', 'imageGallery']).lean();
  res.json({ success: true, data: blog });
}));

router.get('/media-achievements', asyncHandler(async (req, res) => {
  const filter = { status: 'Published' };
  if (req.query.language) filter.language = req.query.language;
  if (req.query.cardType) filter.cardType = req.query.cardType;
  if (req.query.isFeatured !== undefined) filter.isFeatured = req.query.isFeatured === 'true';
  const items = await MediaAchievement.find(filter)
    .sort('-isPinned -isFeatured -publishDate')
    .limit(Number(req.query.limit || 48))
    .populate(['author', 'thumbnailImage', 'imageGallery'])
    .lean();
  res.json({ success: true, data: items });
}));

router.get('/media-achievements/:slug', asyncHandler(async (req, res) => {
  const item = await MediaAchievement.findOne({ slug: req.params.slug, status: 'Published' })
    .populate(['author', 'thumbnailImage', 'imageGallery'])
    .lean();
  res.json({ success: true, data: item });
}));

router.get('/social-posts', asyncHandler(async (req, res) => {
  const filter = { status: 'Published' };
  if (req.query.postType) filter.postType = req.query.postType;
  if (req.query.search) filter.$text = { $search: req.query.search };
  const posts = await SocialPost.find(filter)
    .sort('-isPinned sortOrder -publishDate -createdAt')
    .limit(Number(req.query.limit || 48))
    .populate(['authorAvatar', 'images', 'videoThumbnail'])
    .lean();
  res.json({ success: true, data: posts });
}));

router.get('/notices', asyncHandler(async (req, res) => {
  const now = new Date();
  const filter = {
    status: 'Published',
    $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gte: now } }]
  };
  if (req.query.search) filter.$text = { $search: req.query.search };
  const notices = await Notice.find(filter)
    .sort('-isPinned priorityOrder -publishDate')
    .limit(Number(req.query.limit || 50))
    .populate(['createdBy', 'publishedBy'])
    .lean();
  res.json({ success: true, data: notices });
}));

router.post('/comments', asyncHandler(async (req, res) => {
  const comment = await Comment.create(req.body);
  res.status(201).json({ success: true, data: comment });
}));

router.post('/contact', submitContactForm);

export default router;
