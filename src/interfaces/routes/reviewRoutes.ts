import { Router } from "express";
import { validate } from "../middlewares/validate";
import { verifyTokenMiddleware } from "../middlewares/authMiddleware";
import {
  createReview,
  getAssociationReviews,
  getVolunteerReviews,
  updateReview,
  deleteReview
} from "../controllers/reviewController";
import {
  updateReviewSchema,
} from "../validators/reviewSchema";

const router = Router();

// Create a review for an association (requires authentication and volunteer role)
router.post(
  "/associations/:associationId/reviews",
  verifyTokenMiddleware,
  createReview
);

// Get all reviews for an association (public endpoint)
router.get(
  "/associations/:associationId/reviews",
  getAssociationReviews
);

// Get reviews by a specific volunteer (public endpoint)
router.get(
  "/volunteers/:volunteerId/reviews",
  getVolunteerReviews
);

// Update a review (requires authentication and volunteer role)
router.put(
  "/reviews/:reviewId",
  verifyTokenMiddleware,
  validate(updateReviewSchema),
  updateReview
);

// Delete a review (requires authentication and volunteer role)
router.delete(
  "/reviews/:reviewId",
  verifyTokenMiddleware,
  deleteReview
);

export default router; 