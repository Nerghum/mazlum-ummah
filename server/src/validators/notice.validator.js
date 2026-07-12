import { z } from 'zod';

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

export const noticeSchema = z.object({
  body: z.object({
    title: localizedText,
    summary: optionalLocalizedText,
    content: localizedText,
    status: z.enum(['Draft', 'Published', 'Archived']).optional(),
    publishDate: z.string().datetime().optional().or(z.literal('')),
    expiresAt: z.string().datetime().optional().or(z.literal('')),
    isPinned: z.boolean().optional(),
    priorityOrder: z.number().optional()
  })
});

export const bulkNoticeSchema = z.object({
  body: z.object({
    ids: z.array(z.string().min(12)).min(1),
    action: z.enum(['delete', 'publish', 'archive'])
  })
});
