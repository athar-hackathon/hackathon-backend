import { z } from 'zod';

// Common schemas for reuse
export const uuidSchema = z.string().uuid();
export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(6);
export const nameSchema = z.string().min(1).max(100);

// Pagination schema
export const paginationSchema = z.object({
  page: z.string().optional().transform((val) => val ? Number(val) : 1),
  limit: z.string().optional().transform((val) => val ? Number(val) : 10),
});

// ID parameter schema for a route with /:id
export const idParamSchema = z.object({
    id: uuidSchema,
});

// User ID parameter schema for a route with /:userId
export const userIdParamSchema = z.object({
  params: z.object({
    userId: uuidSchema,
  }),
});

// Search schema
export const searchSchema = z.object({
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Date range schema
export const dateRangeSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.startDate) <= new Date(data.endDate);
    }
    return true;
  },
  {
    message: "endDate must be after startDate",
    path: ["endDate"],
  }
);

export const rejectAssociationSchema = z.object({
  params: z.object({
    userId: uuidSchema,
  }),
  body: z.object({
    reason: z.string().optional(),
  }),
});

export const deletePlanSchema = z.object({
    reason: z.string().optional()
}); 