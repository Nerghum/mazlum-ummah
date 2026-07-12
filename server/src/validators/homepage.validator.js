import { z } from 'zod';

const sectionTypes = [
  'Hero Slider',
  'Breaking News',
  "Today's News",
  'Manual Cards',
  'News Categories',
  'Blog Categories',
  'Video News',
  'Ad Slot',
  'Featured News',
  'Country-wise News',
  'Most Read',
  'Editor Picks',
  'Trending News'
];

const localizedSchema = z.object({
  en: z.string().optional(),
  bn: z.string().optional()
}).optional();

const requiredLocalizedSchema = z.union([
  z.string().min(2),
  z.object({
    en: z.string().optional(),
    bn: z.string().optional()
  }).refine((value) => (value.en || '').trim() || (value.bn || '').trim(), 'English or Bangla title is required')
]);

export const homepageSectionSchema = z.object({
  body: z.object({
    title: requiredLocalizedSchema,
    key: z.string().min(2),
    type: z.enum(sectionTypes),
    order: z.number().optional(),
    isActive: z.boolean().optional(),
    country: z.string().optional().nullable(),
    news: z.array(z.string()).optional(),
    blogs: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    cards: z.array(z.object({
      title: localizedSchema,
      description: localizedSchema,
      buttonText: localizedSchema,
      imageUrl: z.string().optional(),
      link: z.string().optional(),
      order: z.number().optional()
    })).optional(),
    adPosition: z.string().optional(),
    settings: z.object({
      mode: z.enum(['auto', 'manual']).optional(),
      limit: z.number().optional(),
      layout: z.string().optional(),
      source: z.enum(['news', 'blogs']).optional(),
      crisisNumbers: z.object({
        gaza: z.union([z.string(), localizedSchema]).optional(),
        sudan: z.union([z.string(), localizedSchema]).optional(),
        middleEast: z.union([z.string(), localizedSchema]).optional()
      }).optional()
    }).optional()
  })
});

export const reorderSchema = z.object({
  body: z.object({
    sections: z.array(z.object({ id: z.string().min(12), order: z.number() })).min(1)
  })
});
