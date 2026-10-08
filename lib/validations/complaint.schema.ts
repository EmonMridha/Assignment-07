import { z } from 'zod';

export const complaintSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(120, 'Title must be at most 120 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be at most 1000 characters'),
  outageId: z.string().optional(),
});

export type ComplaintFormValues = z.infer<typeof complaintSchema>;