const defaultTitles = {
  'Hero Slider': { en: 'Hero Slider', bn: 'হিরো স্লাইডার' },
  'Breaking News': { en: 'Breaking News', bn: 'ব্রেকিং নিউজ' },
  "Today's News": { en: "Today's News", bn: 'আজকের সংবাদ' },
  'Manual Cards': { en: 'Humanitarian Crisis', bn: 'মানবিক সংকট' },
  'News Categories': { en: 'News Categories', bn: 'সংবাদ বিভাগ' },
  'Blog Categories': { en: 'Blog Categories', bn: 'ব্লগ বিভাগ' },
  'Video News': { en: 'Videos', bn: 'ভিডিও' },
  'Ad Slot': { en: 'Home Ad Slot', bn: 'হোম বিজ্ঞাপন' },
  'Featured News': { en: 'Featured News', bn: 'ফিচার্ড নিউজ' },
  'Country-wise News': { en: 'Country-wise News', bn: 'দেশভিত্তিক সংবাদ' },
  'Most Read': { en: 'Most Read', bn: 'সর্বাধিক পঠিত' },
  'Editor Picks': { en: 'Editor Picks', bn: 'সম্পাদকের পছন্দ' },
  'Trending News': { en: 'Trending News', bn: 'ট্রেন্ডিং নিউজ' }
};

function hasBangla(value) {
  return /[\u0980-\u09FF]/.test(value || '');
}

export function normalizeHomepageTitle(value, type = '') {
  const fallback = defaultTitles[type] || { en: type || '', bn: '' };
  if (typeof value === 'string') {
    if (hasBangla(value)) return { en: fallback.en || '', bn: value };
    return { en: value || fallback.en || '', bn: value === fallback.en ? fallback.bn : '' };
  }
  const en = value?.en || fallback.en || '';
  const rawBn = value?.bn || '';
  return {
    en,
    bn: rawBn && (!hasBangla(rawBn) && rawBn === en && fallback.bn ? fallback.bn : rawBn) || fallback.bn || ''
  };
}

export function normalizeHomepageSection(section) {
  const item = section?.toObject ? section.toObject() : section;
  return item ? { ...item, title: normalizeHomepageTitle(item.title, item.type) } : item;
}
