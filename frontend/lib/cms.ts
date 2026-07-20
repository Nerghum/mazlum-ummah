import { Metadata } from "next";
import { youtubeEmbedUrl, youtubeThumbnailUrl } from "./video";

export type LocaleCode = "en" | "bn";

export type LocalizedText = {
  en?: string;
  bn?: string;
};

export type CmsMedia = {
  url?: string;
  altText?: string;
  originalName?: string;
};

export type CmsAuthor = {
  name?: string;
};

export type CmsCategory = {
  _id?: string;
  name?: string;
  nameBn?: string;
  slug?: string;
  type?: "news" | "blog";
  description?: string;
  image?: CmsMedia;
  bannerImage?: CmsMedia;
  pageTitle?: string;
  pageTitleBn?: string;
  pageSubtitle?: string;
  pageSubtitleBn?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

export type CmsPost = {
  _id: string;
  title?: LocalizedText;
  subtitle?: LocalizedText;
  shortDescription?: LocalizedText;
  content?: LocalizedText;
  slug: string;
  publishDate?: string;
  thumbnailImage?: CmsMedia;
  imageGallery?: CmsMedia[];
  videoUrl?: string;
  author?: CmsAuthor;
  mainCategory?: CmsCategory;
  categories?: CmsCategory[];
  views?: number;
  shortUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

export type CmsMediaAchievement = CmsPost & {
  source?: LocalizedText;
  linkLabel?: LocalizedText;
  externalUrl?: string;
  achievementDate?: LocalizedText;
  cardType?: "photo" | "accent";
  isFeatured?: boolean;
};

export type CmsNotice = {
  _id: string;
  title?: LocalizedText;
  summary?: LocalizedText;
  content?: LocalizedText;
  slug: string;
  publishDate?: string;
  expiresAt?: string;
  isPinned?: boolean;
  priorityOrder?: number;
};

export type CmsSocialPost = {
  _id: string;
  postType?: "image" | "video";
  authorName?: string;
  authorAvatar?: CmsMedia;
  content: string;
  hashtags?: string[];
  images?: CmsMedia[];
  videoUrl?: string;
  videoThumbnail?: CmsMedia;
  publishDate?: string;
  createdAt?: string;
  isPinned?: boolean;
};

export type CmsAd = {
  _id: string;
  title: string;
  placements?: string[];
  media?: CmsMedia;
  mobileMedia?: CmsMedia;
  targetUrl?: string;
  linkType?: 'website' | 'call' | 'whatsapp';
  openInNewTab?: boolean;
  altText?: string;
};

export type CmsHomepageCard = {
  _id?: string;
  title?: LocalizedText;
  description?: LocalizedText;
  buttonText?: LocalizedText;
  imageUrl?: string;
  link?: string;
  order?: number;
};

export type CmsHomepageSection = {
  _id: string;
  title?: LocalizedText | string;
  key: string;
  type:
    | "Hero Slider"
    | "Breaking News"
    | "Today's News"
    | "Latest News"
    | "Manual Cards"
    | "News Categories"
    | "Blog Categories"
    | "Video News"
    | "Ad Slot"
    | string;
  order?: number;
  isActive?: boolean;
  news?: CmsPost[];
  blogs?: CmsPost[];
  categories?: CmsCategory[];
  cards?: CmsHomepageCard[];
  adPosition?: string;
  settings?: {
    mode?: "auto" | "manual";
    limit?: number;
    layout?: string;
    crisisNumbers?: {
      gaza?: LocalizedText | string;
      sudan?: LocalizedText | string;
      middleEast?: LocalizedText | string;
    };
  };
};

export type CmsMenuItem = {
  _id: string;
  label?: LocalizedText;
  url: string;
  target?: "self" | "blank";
  children?: CmsMenuItem[];
};

export type CmsFaqItem = {
  _id?: string;
  question?: LocalizedText;
  answer?: LocalizedText;
  order?: number;
  isActive?: boolean;
};

export type CmsFaqTopic = {
  _id: string;
  title?: LocalizedText;
  description?: LocalizedText;
  slug: string;
  order?: number;
  isActive?: boolean;
  items?: CmsFaqItem[];
};

export type CmsFaqEntry = CmsFaqItem & {
  _id: string;
};

export type CmsSiteSettings = {
  "site.title"?: string;
  "site.tagline"?: string;
  "site.description"?: string;
  "site.logo"?: string;
  "site.favicon"?: string;
  "site.logoMedia"?: CmsMedia | null;
  "site.faviconMedia"?: CmsMedia | null;
  "site.facebookUrl"?: string;
  "site.youtubeUrl"?: string;
  "site.linkedinUrl"?: string;
  "site.instagramUrl"?: string;
  "site.whatsappUrl"?: string;
  [key: string]: any;
};

export type CardItem = {
  href: string;
  src: string;
  alt: string;
  title: string;
  excerpt: string;
  date: string;
  content?: string;
  author?: string;
  categorySlug?: string;
  gallery?: string[];
  videoUrl?: string;
  videoEmbedUrl?: string;
  isVideo?: boolean;
  loaded?: boolean;
  shortUrl?: string;
  fullExcerpt?: string;
};

export type CmsShortlinkTarget = {
  type: "news" | "blog";
  slug: string;
  shortUrl: string;
  url: string;
};

const API_URL = (typeof window === "undefined" ? process.env.INTERNAL_API_URL : null) || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
const ASSET_ORIGIN = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1").replace(/\/api\/v1\/?$/, "");

export function text(value: LocalizedText | string | undefined, locale: LocaleCode) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[locale] || value.en || value.bn || "";
}

export function categoryName(category: CmsCategory | undefined, locale: LocaleCode) {
  if (!category) return "";
  if (locale === "bn") return category.nameBn || category.name || category.slug || "";
  return category.name || category.nameBn || category.slug || "";
}

export function formatCmsDate(value: string | undefined, locale: LocaleCode) {
  if (!value) return "";
  return new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function mediaUrl(media: CmsMedia | undefined, _fallbackIndex = 0) {
  if (!media?.url) return "/logo.png";
  if (media.url.startsWith("http")) return encodeURI(media.url);
  return encodeURI(`${ASSET_ORIGIN}${media.url}`);
}

export function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").trim();
}

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!response.ok) return null;
    const json = await response.json();
    return json.data as T;
  } catch {
    return null;
  }
}

export async function generateSeoMetadata(
  titleOverride?: string | null,
  descriptionOverride?: string | null,
  imageOverrideUrl?: string | null,
  keywordsOverride?: string[] | null
): Promise<Metadata> {
  const settings = await fetchSiteSettings();
  const siteTitle = settings["site.title"] || "Mazlum Ummah";
  const siteDescription =
    settings["site.description"] ||
    "A platform to support the oppressed and marginalized communities around the world.";
  const siteLogoUrl = settings["site.logoMedia"]
    ? mediaUrl(settings["site.logoMedia"])
    : "/favicon.ico";

  const finalTitle = titleOverride
    ? `${titleOverride} | ${siteTitle}`
    : siteTitle;
  const finalDescription = descriptionOverride || siteDescription;
  const finalImageUrl = imageOverrideUrl || siteLogoUrl;

  const metadata: Metadata = {
    title: finalTitle,
    description: finalDescription,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      siteName: siteTitle,
      images: [
        {
          url: finalImageUrl,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [finalImageUrl],
    },
  };

  if (keywordsOverride && keywordsOverride.length > 0) {
    metadata.keywords = keywordsOverride;
  }

  return metadata;
}

export type FetchNewsOptions = {
  limit?: number;
  categorySlug?: string;
  breakingNews?: boolean;
  mostRead?: boolean;
  featuredNews?: boolean;
  dateFrom?: string;
  dateTo?: string;
  sort?: "views" | "latest" | "-updatedAt";
};

export async function fetchNews(options: number | FetchNewsOptions = 48) {
  const params = new URLSearchParams();
  if (typeof options === "number") {
    params.set("limit", String(options));
  } else {
    params.set("limit", String(options.limit || 48));
    if (options.categorySlug) params.set("categorySlug", options.categorySlug);
    if (options.breakingNews !== undefined) params.set("breakingNews", String(options.breakingNews));
    if (options.mostRead !== undefined) params.set("mostRead", String(options.mostRead));
    if (options.featuredNews !== undefined) params.set("featuredNews", String(options.featuredNews));
    if (options.dateFrom) params.set("dateFrom", options.dateFrom);
    if (options.dateTo) params.set("dateTo", options.dateTo);
    if (options.sort) params.set("sort", options.sort);
  }
  return (await getJson<CmsPost[]>(`/public/news?${params.toString()}`)) || [];
}

export async function fetchBlogs(limit = 48) {
  return (await getJson<CmsPost[]>(`/public/blogs?limit=${limit}&sort=-publishDate`)) || [];
}

export async function fetchBlogsByCategory(categorySlug: string, limit = 48) {
  return (await getJson<CmsPost[]>(`/public/blogs?categorySlug=${categorySlug}&limit=${limit}&sort=-publishDate`)) || [];
}

export async function fetchCategories(type: "news" | "blog") {
  return (await getJson<CmsCategory[]>(`/public/categories/${type}`)) || [];
}

export async function fetchCategory(type: "news" | "blog", slug: string) {
  return getJson<CmsCategory>(`/public/categories/${type}/${slug}`);
}

export async function fetchMediaAchievements(limit = 48) {
  return (await getJson<CmsMediaAchievement[]>(`/public/media-achievements?limit=${limit}`)) || [];
}

export async function fetchNewsBySlug(slug: string) {
  return getJson<CmsPost>(`/public/news/${slug}`);
}

export async function fetchBlogBySlug(slug: string) {
  return getJson<CmsPost>(`/public/blogs/${slug}`);
}

export async function fetchMediaAchievementBySlug(slug: string) {
  return getJson<CmsMediaAchievement>(`/public/media-achievements/${slug}`);
}

export async function fetchShortlinkTarget(code: string) {
  return getJson<CmsShortlinkTarget>(`/public/shortlinks/${encodeURIComponent(code)}`);
}

export async function fetchNotices(limit = 50) {
  return (await getJson<CmsNotice[]>(`/public/notices?limit=${limit}`)) || [];
}

export async function fetchSocialPosts(limit = 48) {
  return (await getJson<CmsSocialPost[]>(`/public/social-posts?limit=${limit}`)) || [];
}

export async function fetchAds(position: string, limit = 1) {
  return (await getJson<CmsAd[]>(`/public/advertisements?position=${position}&limit=${limit}`)) || [];
}

export async function fetchHomepageSections() {
  return (await getJson<CmsHomepageSection[]>("/public/homepage")) || [];
}

export async function fetchMenuItems() {
  return (await getJson<CmsMenuItem[]>("/public/menu")) || [];
}

export async function fetchFaqTopics() {
  return (await getJson<CmsFaqTopic[]>("/public/faqs")) || [];
}

export async function fetchFaqItems() {
  return (await getJson<CmsFaqEntry[]>("/public/faqs")) || [];
}

export function adImageUrl(ad: CmsAd | null | undefined) {
  return mediaUrl(ad?.media);
}

export async function fetchSiteSettings() {
  return (await getJson<CmsSiteSettings>("/public/settings")) || {};
}

export function postToCard(post: CmsPost, locale: LocaleCode, hrefPrefix: string, index = 0): CardItem {
  const videoThumbnail = youtubeThumbnailUrl(post.videoUrl || "");
  const videoEmbed = youtubeEmbedUrl(post.videoUrl || "");
  const categorySlug = post.mainCategory?.slug || post.categories?.[0]?.slug;
  return {
    href: `${hrefPrefix}/${post.slug}`,
    src: videoThumbnail || mediaUrl(post.thumbnailImage, index),
    alt: text(post.title, locale),
    title: text(post.title, locale),
    excerpt: text(post.shortDescription, locale),
    content: text(post.content, locale),
    date: formatCmsDate(post.publishDate, locale),
    author: post.author?.name,
    categorySlug,
    gallery: (post.imageGallery || []).map((item, imageIndex) => mediaUrl(item, imageIndex)),
    videoUrl: post.videoUrl,
    videoEmbedUrl: videoEmbed,
    isVideo: Boolean(videoEmbed),
    loaded: true,
    shortUrl: post.shortUrl,
    fullExcerpt: stripHtml(text(post.content, locale)),
  };
}
