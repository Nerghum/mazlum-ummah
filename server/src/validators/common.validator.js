import { z } from 'zod';

export const idParam = z.object({ params: z.object({ id: z.string().min(12) }) });

export const listQuery = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
    search: z.string().optional()
  }).passthrough()
});
