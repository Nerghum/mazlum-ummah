import { z } from 'zod';

export const categorySchema = z.object({
  body: z.object({
    type: z.enum(['news', 'blog']).optional(),
    name: z.string().min(2),
    nameBn: z.string().optional(),
    parent: z.string().optional().nullable(),
    description: z.string().optional(),
    image: z.string().optional(),
    bannerImage: z.string().optional(),
    icon: z.string().optional(),
    sortOrder: z.number().optional(),
    isActive: z.boolean().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoKeywords: z.array(z.string()).optional(),
    pageSettings: z.object({ layout: z.string().optional(), showOnMenu: z.boolean().optional() }).optional(),
    pageTitle: z.string().optional(),
    pageTitleBn: z.string().optional(),
    pageSubtitle: z.string().optional(),
    pageSubtitleBn: z.string().optional()
  })
});

export const countrySchema = z.object({
  body: z.object({
    name: z.string().min(2),
    code: z.string().min(2).max(3),
    flag: z.string().optional(),
    isActive: z.boolean().optional(),
    sortOrder: z.number().optional()
  })
});
