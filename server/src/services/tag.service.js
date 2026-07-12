import Tag from '../models/Tag.js';
import { makeSlug } from '../utils/slug.js';

export async function resolveTags(ids = [], names = []) {
  const created = [];
  for (const name of names.filter(Boolean)) {
    const slug = makeSlug(name);
    const tag = await Tag.findOneAndUpdate({ slug }, { $setOnInsert: { name, slug } }, { upsert: true, new: true });
    created.push(tag.id);
  }
  return [...new Set([...ids, ...created].map(String))];
}
