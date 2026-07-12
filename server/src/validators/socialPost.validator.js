import { z } from 'zod';

const objectId = z.string().min(12).optional().nullable();

export const socialPostSchema = z.object({
  body: z.object({
    postType: z.enum(['image', 'video']).default('image'),
    authorName: z.string().trim().optional(),
    authorAvatar: objectId,
    content: z.string().trim().min(1, 'Content is required'),
    hashtags: z.array(z.string()).optional(),
    images: z.array(z.string().min(12)).optional(),
    videoUrl: z.string().url().optional().or(z.literal('')),
    videoThumbnail: objectId,
    publishDate: z.string().datetime().optional().or(z.literal('')),
    status: z.enum(['Draft', 'Pending', 'Published', 'Archived']).optional(),
    isPinned: z.boolean().optional(),
    sortOrder: z.number().optional()
  })
});

export const bulkSocialPostSchema = z.object({
  body: z.object({
    ids: z.array(z.string().min(12)).min(1),
    action: z.enum(['delete', 'publish', 'archive'])
  })
});
