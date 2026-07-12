import slugify from 'slugify';
import { customAlphabet, nanoid } from 'nanoid';

const shortCode = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz');

export function makeSlug(value) {
  const slug = slugify(value || '', { lower: true, strict: true, trim: true });
  return slug || nanoid(8);
}

export function makeShortCode(size = 6) {
  return shortCode(size);
}
