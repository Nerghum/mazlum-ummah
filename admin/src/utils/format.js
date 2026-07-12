export function formatDate(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export function classNames(...items) {
  return items.filter(Boolean).join(' ');
}
