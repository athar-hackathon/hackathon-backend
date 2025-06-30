import { z } from "zod";

// Schema for creating a review
export const createReviewSchema = z.object({
    rating: z.number().min(1.0).max(5.0),
    comment: z.string().min(1).max(1000)
});

// Schema for updating a review
export const updateReviewSchema = z.object({
    rating: z.number().min(1.0).max(5.0).optional(),
    comment: z.string().min(1).max(1000).optional()
});



// Type exports
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;

