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
  { value: 'gallery_page_banner', label: 'Gallery page banner', size: '1200x400' }
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
    { value: `${keyPrefix}_banner`, label: labelWithSize(`${labelPrefix} banner`, '728x90'), size: '728x90' },
    { value: `${keyPrefix}_inline`, label: labelWithSize(`${labelPrefix} inline`, inlineSize), size: inlineSize }
  ];
}

export function adPositionSize(value) {
  const staticPosition = staticAdPositions.find((item) => item.value === value);
  if (staticPosition?.size) return staticPosition.size;

  const categoryMatch = value.match(/^(news|blog)_category_(.+)_(banner|inline)$/);
  if (categoryMatch) {
    const [, type, , area] = categoryMatch;
    if (area === 'banner') return '728x90';
    return type === 'blog' ? '728x90' : '400x360';
  }

  return '728x90';
}

export function adPositionLabel(value) {
  const categoryMatch = value.match(/^(news|blog)_category_(.+)_(banner|inline)$/);
  if (categoryMatch) {
    const [, type, slug, area] = categoryMatch;
    return labelWithSize(
      `${type === 'blog' ? 'Blog' : 'News'} category: ${titleCase(slug)} ${area}`,
      adPositionSize(value)
    );
  }

  return adPositions.find((item) => item.value === value)?.label || labelWithSize(titleCase(value), adPositionSize(value));
}
