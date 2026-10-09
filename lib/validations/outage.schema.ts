import { z } from 'zod';

export const outageSchema = z.object({
    type: z.string().min(1, 'Type is required'),
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(120, 'Title must be at most 120 characters'),
    description: z.string().max(1000, 'Too long').optional(),
    cause: z.string().max(500, 'Too long').optional(),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().optional(),
    duration: z.string().optional(),
    priority: z.string().min(1, 'Priority is required'),
    zoneId: z.string().min(1, 'Zone ID is required'),
    assignedToId: z.string().optional(),
});

export type OutageFormValues = z.infer<typeof outageSchema>;