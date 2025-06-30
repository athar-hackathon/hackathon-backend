import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { CreateReview } from "../../application/use-cases/CreateReview";
import { GetAssociationReviews } from "../../application/use-cases/GetAssociationReviews";
import { UpdateReview } from "../../application/use-cases/UpdateReview";
import { DeleteReview } from "../../application/use-cases/DeleteReview";
import { ReviewRepository } from "../../infrastructure/repositories/ReviewRepository";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { AssociationRepository } from "../../infrastructure/repositories/AssociationRepository";
import {
  CreateReviewInput,
  UpdateReviewInput,
} from "../validators/reviewSchema";

// Create a review for an association
export const createReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }

    // Debug: Log user information
    console.log('User from token:', req.user);
    console.log('User role:', req.user.role);
    console.log('User role type:', typeof req.user.role);

    // Check if user is a volunteer
    if (req.user.role !== 'volunteer') {
      res.status(403).json({
        success: false,
        message: "Only volunteers can review associations",
        debug: {
          userRole: req.user.role,
          userRoleType: typeof req.user.role,
          expectedRole: 'volunteer'
        }
      });
      return;
    }

    const { rating, comment } = req.body;
    const { associationId } = req.params;

    const createReviewUseCase = new CreateReview(
      ReviewRepository,
      UserRepository,
      AssociationRepository
    );

    const result = await createReviewUseCase.execute(
      req.user.id,
      associationId,
      rating,
      comment
    );

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: result.review,
      message: "Review created successfully"
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};

// Get all reviews for an association
export const getAssociationReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { associationId } = req.params;

    const getAssociationReviewsUseCase = new GetAssociationReviews(
      ReviewRepository,
      AssociationRepository
    );

    const result = await getAssociationReviewsUseCase.execute(associationId);

    if (!result.success) {
      res.status(404).json({
        success: false,
        message: result.error
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        reviews: result.reviews,
        averageRating: result.averageRating,
        reviewCount: result.reviewCount
      },
      message: "Association reviews retrieved successfully"
    });
  } catch (error) {
    console.error("Error getting association reviews:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};

// Get reviews by a specific volunteer
export const getVolunteerReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { volunteerId } = req.params;

    const reviews = await ReviewRepository.findByVolunteerId(volunteerId);

    res.status(200).json({
      success: true,
      data: reviews,
      message: "Volunteer reviews retrieved successfully"
    });
  } catch (error) {
    console.error("Error getting volunteer reviews:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};

// Update a review
export const updateReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }

    // Check if user is a volunteer
    if (req.user.role !== 'volunteer') {
      res.status(403).json({
        success: false,
        message: "Only volunteers can update reviews"
      });
      return;
    }

    const { rating, comment } = req.body;
    const { reviewId } = req.params;

    const updateReviewUseCase = new UpdateReview(ReviewRepository);

    const result = await updateReviewUseCase.execute(
      reviewId,
      req.user.id,
      rating,
      comment
    );

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: result.review,
      message: "Review updated successfully"
    });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};

// Delete a review
export const deleteReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }

    // Check if user is a volunteer
    if (req.user.role !== 'volunteer') {
      res.status(403).json({
        success: false,
        message: "Only volunteers can delete reviews"
      });
      return;
    }

    const { reviewId } = req.params;

    const deleteReviewUseCase = new DeleteReview(ReviewRepository);

    const result = await deleteReviewUseCase.execute(reviewId, req.user.id);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
}; 