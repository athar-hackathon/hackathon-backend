import { Review } from "../../domain/entities/Review";
import { IReviewRepository } from "../../domain/repositories/IReviewRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IAssociationRepository } from "../../domain/repositories/IAssociationRepository";

export class CreateReview {
  constructor(
    private reviewRepository: IReviewRepository,
    private userRepository: IUserRepository,
    private associationRepository: IAssociationRepository
  ) {}

  async execute(
    volunteerId: string,
    associationId: string,
    rating: number,
    comment: string
  ): Promise<{ success: boolean; review?: Review; error?: string }> {
    try {
      // Validate rating
      if (rating < 1.0 || rating > 5.0) {
        return { success: false, error: "Rating must be between 1.0 and 5.0" };
      }

      // Validate comment
      if (!comment || comment.trim().length === 0) {
        return { success: false, error: "Comment is required" };
      }

      if (comment.length > 1000) {
        return { success: false, error: "Comment must be less than 1000 characters" };
      }

      // Check if volunteer exists and is a volunteer
      const volunteer = await this.userRepository.findById(volunteerId);
      if (!volunteer) {
        return { success: false, error: "Volunteer not found" };
      }

      if (volunteer.role !== 'volunteer') {
        return { success: false, error: "Only volunteers can review associations" };
      }

      // Check if association exists
      const association = await this.associationRepository.findById(associationId);
      if (!association) {
        return { success: false, error: "Association not found" };
      }

      // Check if volunteer has already reviewed this association
      const existingReview = await this.reviewRepository.findByVolunteerAndAssociation(
        volunteerId,
        associationId
      );

      if (existingReview) {
        return { success: false, error: "You have already reviewed this association" };
      }

      // Create the review
      const review = await this.reviewRepository.create({
        volunteerId,
        associationId,
        rating,
        comment: comment.trim()
      });

      return { success: true, review };
    } catch (error) {
      return { 
        success: false, 
        error: `Failed to create review: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }
} 