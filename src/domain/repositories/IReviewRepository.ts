import { Review } from "../entities/Review";

export interface IReviewRepository {
  create(review: Omit<Review, "id" | "createdAt" | "updatedAt">): Promise<Review>;
  findById(id: string): Promise<Review | null>;
  findByAssociationId(associationId: string): Promise<Review[]>;
  findByVolunteerId(volunteerId: string): Promise<Review[]>;
  findByVolunteerAndAssociation(volunteerId: string, associationId: string): Promise<Review | null>;
  update(id: string, review: Partial<Review>): Promise<Review | null>;
  delete(id: string): Promise<boolean>;
  getAverageRating(associationId: string): Promise<number>;
  getReviewCount(associationId: string): Promise<number>;
} 