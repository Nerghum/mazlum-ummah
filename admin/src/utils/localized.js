export function localizedValue(value, lang = 'en') {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.en || value.bn || '';
}

export function emptyLocalized() {
  return { en: '', bn: '' };
}
