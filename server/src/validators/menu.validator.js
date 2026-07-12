import { z } from 'zod';

const localizedText = z.object({
  en: z.string().optional().default(''),
  bn: z.string().optional().default('')
}).refine((value) => value.en.trim().length > 0 || value.bn.trim().length > 0, {
  message: 'English or Bangla value is required'
});

const objectId = z.string().min(12).optional().nullable();

export const menuItemSchema = z.object({
  body: z.object({
    label: localizedText,
    url: z.string().min(1),
    parent: objectId,
    order: z.coerce.number().optional(),
    target: z.enum(['self', 'blank']).optional(),
    isActive: z.boolean().optional()
  })
});

export const reorderMenuSchema = z.object({
  body: z.object({
    items: z.array(z.object({
      id: z.string().min(12),
      parent: objectId,
      order: z.coerce.number()
    })).min(1)
  })
});
