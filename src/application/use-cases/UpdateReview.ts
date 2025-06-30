import { Review } from "../../domain/entities/Review";
import { IReviewRepository } from "../../domain/repositories/IReviewRepository";

export class UpdateReview {
  constructor(private reviewRepository: IReviewRepository) {}

  async execute(
    reviewId: string,
    volunteerId: string,
    rating?: number,
    comment?: string
  ): Promise<{ success: boolean; review?: Review; error?: string }> {
    try {
      // Get the existing review
      const existingReview = await this.reviewRepository.findById(reviewId);
      if (!existingReview) {
        return { success: false, error: "Review not found" };
      }

      // Check if the volunteer owns this review
      if (existingReview.volunteerId !== volunteerId) {
        return { success: false, error: "You can only update your own reviews" };
      }

      // Validate rating if provided
      if (rating !== undefined) {
        if (rating < 1.0 || rating > 5.0) {
          return { success: false, error: "Rating must be between 1.0 and 5.0" };
        }
      }

      // Validate comment if provided
      if (comment !== undefined) {
        if (!comment || comment.trim().length === 0) {
          return { success: false, error: "Comment is required" };
        }

        if (comment.length > 1000) {
          return { success: false, error: "Comment must be less than 1000 characters" };
        }
      }

      // Prepare update data
      const updateData: Partial<Review> = {};
      if (rating !== undefined) updateData.rating = rating;
      if (comment !== undefined) updateData.comment = comment.trim();

      // Update the review
      const updatedReview = await this.reviewRepository.update(reviewId, updateData);
      if (!updatedReview) {
        return { success: false, error: "Failed to update review" };
      }

      return { success: true, review: updatedReview };
    } catch (error) {
      return { 
        success: false, 
        error: `Failed to update review: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }
} 