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

const faqItemSchema = z.object({
  question: localizedText,
  answer: localizedText,
  order: z.coerce.number().optional(),
  isActive: z.boolean().optional()
});

export const faqTopicSchema = z.object({
  body: z.object({
    title: localizedText,
    description: optionalLocalizedText,
    slug: z.string().trim().optional().or(z.literal('')),
    order: z.coerce.number().optional(),
    isActive: z.boolean().optional(),
    items: z.array(faqItemSchema).optional()
  })
});
