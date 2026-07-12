import { z } from 'zod';

const objectId = z.string().min(12).optional().nullable();
const localizedText = z.object({
  en: z.string().optional().default(''),
  bn: z.string().optional().default('')
}).refine((value) => value.en.trim().length > 0 || value.bn.trim().length > 0, {
  message: 'English or Bangla value is required'
});

const optionalLocalizedText = z.object({
  en: z.string().optional().default(''),
  bn: z.string().optional().default('')
}).optional();

export const blogSchema = z.object({
  body: z.object({
    title: localizedText,
    subtitle: optionalLocalizedText,
    shortDescription: optionalLocalizedText,
    content: localizedText,
    thumbnailImage: objectId,
    imageGallery: z.array(z.string()).optional(),
    videoUrl: z.string().url().optional().or(z.literal('')),
    publishDate: z.string().datetime().optional(),
    scheduledPublishDate: z.string().datetime().optional(),
    status: z.enum(['Draft', 'Pending', 'Published', 'Archived']).optional(),
    mainCategory: objectId,
    subCategory: objectId,
    categories: z.array(z.string().min(12)).optional(),
    tags: z.array(z.string()).optional(),
    tagNames: z.array(z.string()).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoKeywords: z.array(z.string()).optional(),
    language: z.enum(['en', 'bn', 'both']).default('both'),
    isFeatured: z.boolean().optional(),
    isPinned: z.boolean().optional(),
    allowComments: z.boolean().optional()
  })
});

export const bulkBlogSchema = z.object({
  body: z.object({
    ids: z.array(z.string().min(12)).min(1),
    action: z.enum(['delete', 'publish', 'category']),
    mainCategory: z.string().min(12).optional(),
    subCategory: z.string().min(12).optional()
  })
});
