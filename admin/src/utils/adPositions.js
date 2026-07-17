const staticAdPositions = [
  { value: 'home_banner', label: 'Home banner', size: '728x90' },
  { value: 'breaking_news_banner', label: 'Breaking news banner', size: '728x90' },
  { value: 'page_banner', label: 'Page banner', size: '1200x400' },
  { value: 'news_list_inline', label: 'News list inline banner', size: '1544x500' },
  { value: 'news_detail_top', label: 'News detail top', size: '728x90' },
  { value: 'news_detail_bottom', label: 'News detail bottom', size: '728x90' },
  { value: 'news_detail_sidebar', label: 'News detail sidebar', size: '300x250' },
  { value: 'blog_detail_sidebar', label: 'Blog detail sidebar', size: '300x250' },
  { value: 'blog_detail_bottom', label: 'Blog detail bottom', size: '728x90' },
  { value: 'gallery_page_banner', label: 'Gallery page banner', size: '1200x400' },
  { value: 'social_posts_page_banner', label: 'Social Posts page banner', size: '1200x400' },
  { value: 'notice_page_banner', label: 'Notice page banner', size: '1200x400' },
  { value: 'media_achievements_page_banner', label: 'Media Achievements page banner', size: '1200x400' },
  { value: 'privacy_policy_page_banner', label: 'Privacy Policy page banner', size: '1200x400' },
  { value: 'terms_and_conditions_page_banner', label: 'Terms and Conditions page banner', size: '1200x400' },
  { value: 'get_involved_page_banner', label: 'Get Involved page banner', size: '1200x400' },
  { value: 'activities_page_banner', label: 'Activities page banner', size: '1200x400' },
  { value: 'todays_news_page_banner', label: 'Todays News page banner', size: '1200x400' },
  { value: 'blogs_page_banner', label: 'Blogs page banner', size: '1200x400' }
];

function labelWithSize(label, size) {
  return size ? `${label} - ${size}` : label;
}

export const adPositions = staticAdPositions.map((position) => ({
  ...position,
  label: labelWithSize(position.label, position.size)
}));

function titleCase(value) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function categoryAdPositions(category, type) {
  if (!category?.slug) return [];
  const categoryName = category.name || category.nameBn || titleCase(category.slug);
  const labelPrefix = `${type === 'blog' ? 'Blog' : 'News'} category: ${categoryName}`;
  const keyPrefix = `${type === 'blog' ? 'blog' : 'news'}_category_${category.slug}`;
  const inlineSize = type === 'blog' ? '728x90' : '400x360';

  return [
    { value: `${keyPrefix}_banner`, label: labelWithSize(`${labelPrefix} banner`, '1200x400'), size: '1200x400' },
    { value: `${keyPrefix}_inline`, label: labelWithSize(`${labelPrefix} inline`, inlineSize), size: inlineSize },
    { value: `${keyPrefix}_detail_top`, label: labelWithSize(`${labelPrefix} detail top banner`, '1200x400'), size: '1200x400' },
    { value: `${keyPrefix}_detail_bottom`, label: labelWithSize(`${labelPrefix} detail bottom`, '728x90'), size: '728x90' },
    { value: `${keyPrefix}_detail_sidebar`, label: labelWithSize(`${labelPrefix} detail sidebar`, '300x250'), size: '300x250' }
  ];
}

export function adPositionSize(value) {
  const staticPosition = staticAdPositions.find((item) => item.value === value);
  if (staticPosition?.size) return staticPosition.size;

  const categoryMatch = value.match(/^(news|blog)_category_(.+)_(banner|inline|detail_top|detail_bottom|detail_sidebar)$/);
  if (categoryMatch) {
    const [, type, , area] = categoryMatch;
    if (area === 'banner' || area === 'detail_top') return '1200x400';
    if (area === 'detail_bottom') return '728x90';
    if (area === 'detail_sidebar') return '300x250';
    return type === 'blog' ? '728x90' : '400x360';
  }

  return '728x90';
}

export function adPositionLabel(value) {
  const categoryMatch = value.match(/^(news|blog)_category_(.+)_(banner|inline|detail_top|detail_bottom|detail_sidebar)$/);
  if (categoryMatch) {
    const [, type, slug, area] = categoryMatch;
    return labelWithSize(
      `${type === 'blog' ? 'Blog' : 'News'} category: ${titleCase(slug)} ${area.replace('_', ' ')}`,
      adPositionSize(value)
    );
  }

  return adPositions.find((item) => item.value === value)?.label || labelWithSize(titleCase(value), adPositionSize(value));
}
