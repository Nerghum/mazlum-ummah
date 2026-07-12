import xss from 'xss';

export function sanitizeHtml(value) {
  return typeof value === 'string' ? xss(value) : value;
}
