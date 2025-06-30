import { Review } from "../../domain/entities/Review";
import { IReviewRepository } from "../../domain/repositories/IReviewRepository";
import { IAssociationRepository } from "../../domain/repositories/IAssociationRepository";

export class GetAssociationReviews {
  constructor(
    private reviewRepository: IReviewRepository,
    private associationRepository: IAssociationRepository
  ) {}

  async execute(associationId: string): Promise<{ 
    success: boolean; 
    reviews?: Review[]; 
    averageRating?: number;
    reviewCount?: number;
    error?: string 
  }> {
    try {
      // Check if association exists
      const association = await this.associationRepository.findById(associationId);
      if (!association) {
        return { success: false, error: "Association not found" };
      }

      // Get reviews
      const reviews = await this.reviewRepository.findByAssociationId(associationId);
      
      // Get average rating
      const averageRating = await this.reviewRepository.getAverageRating(associationId);
      
      // Get review count
      const reviewCount = await this.reviewRepository.getReviewCount(associationId);

      return { 
        success: true, 
        reviews, 
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
        reviewCount 
      };
    } catch (error) {
      return { 
        success: false, 
        error: `Failed to get association reviews: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }
} 