import { z } from 'zod';

const objectId = z.string().min(12).optional().nullable();

export const advertisementSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    placements: z.array(z.string().trim().min(1)).min(1),
    media: objectId,
    mobileMedia: objectId,
    targetUrl: z.string().url().optional().or(z.literal('')),
    altText: z.string().optional(),
    startsAt: z.string().datetime().optional().or(z.literal('')),
    endsAt: z.string().datetime().optional().or(z.literal('')),
    priorityOrder: z.coerce.number().optional(),
    isActive: z.boolean().optional()
  })
});

export const bulkAdvertisementSchema = z.object({
  body: z.object({
    ids: z.array(z.string().min(12)).min(1),
    action: z.enum(['delete', 'activate', 'deactivate'])
  })
});
