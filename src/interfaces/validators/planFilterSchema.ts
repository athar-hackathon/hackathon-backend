import { z } from 'zod';

export const planFilterQuerySchema = z.object({
  categoryId: z.string().uuid().optional(),
  minFees: z.string().optional().transform((val) => val ? Number(val) : undefined),
  isActive: z.boolean().optional(),
  isPaid: z.boolean().optional(),
  // Location search parameters
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),

 });

export const planFilterSchema = z.object({
  categoryId: z.string().uuid().optional(),
  minFees: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
  isPaid: z.boolean().optional(),
  // Location search parameters
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),

});

export type PlanFilterInput = z.infer<typeof planFilterSchema>;
export type PlanFilterQueryInput = z.infer<typeof planFilterQuerySchema>; 