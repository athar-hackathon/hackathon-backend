import { IReviewRepository } from "../../domain/repositories/IReviewRepository";

export class DeleteReview {
  constructor(private reviewRepository: IReviewRepository) {}

  async execute(
    reviewId: string,
    volunteerId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get the existing review
      const existingReview = await this.reviewRepository.findById(reviewId);
      if (!existingReview) {
        return { success: false, error: "Review not found" };
      }

      // Check if the volunteer owns this review
      if (existingReview.volunteerId !== volunteerId) {
        return { success: false, error: "You can only delete your own reviews" };
      }

      // Delete the review
      const deleted = await this.reviewRepository.delete(reviewId);
      if (!deleted) {
        return { success: false, error: "Failed to delete review" };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: `Failed to delete review: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }
} 