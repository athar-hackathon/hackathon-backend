import { IReviewRepository } from "@/src/domain/repositories/IReviewRepository";
import { Review } from "@/src/domain/entities/Review";
import { db } from "../db/sequelize";
import { Model } from "sequelize";

type ReviewCreationInput = Omit<Review, "id" | "createdAt" | "updatedAt">;

export const ReviewRepository: IReviewRepository = {
  async create(data: ReviewCreationInput): Promise<Review> {
    const review = await db.review.create(data);
    return review.get() as Review;
  },

  async findById(id: string): Promise<Review | null> {
    const review = await db.review.findByPk(id, {
      include: [{
        model: db.user,
        as: 'volunteer',
        attributes: ['id', 'name', 'email', 'profilePicture']
      }, {
        model: db.association,
        as: 'association',
        attributes: ['id', 'name']
      }]
    });
    return review ? (review.get() as Review) : null;
  },

  async findByAssociationId(associationId: string): Promise<Review[]> {
    const reviews = await db.review.findAll({
      where: { associationId },
      include: [{
        model: db.user,
        as: 'volunteer',
        attributes: ['id', 'name', 'email', 'profilePicture']
      }],
      order: [['createdAt', 'DESC']]
    });
    return reviews.map((review: Model) => review.get() as Review);
  },

  async findByVolunteerId(volunteerId: string): Promise<Review[]> {
    const reviews = await db.review.findAll({
      where: { volunteerId },
      include: [{
        model: db.association,
        as: 'association',
        attributes: ['id', 'name']
      }],
      order: [['createdAt', 'DESC']]
    });
    return reviews.map((review: Model) => review.get() as Review);
  },

  async findByVolunteerAndAssociation(volunteerId: string, associationId: string): Promise<Review | null> {
    const review = await db.review.findOne({
      where: { volunteerId, associationId },
      include: [{
        model: db.user,
        as: 'volunteer',
        attributes: ['id', 'name', 'email', 'profilePicture']
      }, {
        model: db.association,
        as: 'association',
        attributes: ['id', 'name']
      }]
    });
    return review ? (review.get() as Review) : null;
  },

  async update(id: string, reviewData: Partial<Review>): Promise<Review | null> {
    const review = await db.review.findByPk(id);
    if (!review) return null;
    
    await review.update(reviewData);
    return review.get() as Review;
  },

  async delete(id: string): Promise<boolean> {
    try {
      const deletedCount = await db.review.destroy({
        where: { id }
      });
      return deletedCount > 0;
    } catch (error) {
      console.error('Error deleting review:', error);
      return false;
    }
  },

  async getAverageRating(associationId: string): Promise<number> {
    const result = await db.review.findOne({
      where: { associationId },
      attributes: [[db.Sequelize.fn('AVG', db.Sequelize.col('rating')), 'averageRating']],
      raw: true
    });
    
    return result ? parseFloat(result.averageRating as string) || 0 : 0;
  },

  async getReviewCount(associationId: string): Promise<number> {
    const count = await db.review.count({
      where: { associationId }
    });
    return count;
  }
}; 