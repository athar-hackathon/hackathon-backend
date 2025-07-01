import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";
import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { ICategoryRepository } from "@/src/domain/repositories/ICategoryRepository";
import { IReviewRepository } from "@/src/domain/repositories/IReviewRepository";
import { User } from "@/src/domain/entities/User";
import { Association } from "@/src/domain/entities/Association";
import { Plan } from "@/src/domain/entities/Plan";
import { Category } from "@/src/domain/entities/Category";
import { Review } from "@/src/domain/entities/Review";

export interface AdminStats {
  totalUsers: number;
  userGrowth: {
    thisMonth: number;
    thisWeek: number;
  };
  userDistribution: {
    volunteers: number;
    associationOwners: number;
  };
  pendingAssociations: number;
  approvedAssociations: number;
  associationApprovalRate: number;
  totalPlans: number;
  activePlans: number;
  plansByCategory: Array<{
    categoryName: string;
    count: number;
  }>;
  topRatedAssociations: Array<{
    id: string;
    name: string;
    averageRating: number;
    totalReviews: number;
    image_url?: string;
  }>;
  bottomRatedAssociations: Array<{
    id: string;
    name: string;
    averageRating: number;
    totalReviews: number;
    image_url?: string;
  }>;
  totalReviews: number;
  averagePlatformRating: number;
}

export const GetAdminStats = (
  userRepo: IUserRepository,
  associationRepo: IAssociationRepository,
  planRepo: IPlanRepository,
  categoryRepo: ICategoryRepository,
  reviewRepo: IReviewRepository
) => async (): Promise<AdminStats> => {
  try {
    const allUsers = await userRepo.findAll() as User[];
    const allAssociations = await associationRepo.findAll() as (Association & { status?: string })[];
    const allPlans = await planRepo.findAll() as (Plan & { isActive?: boolean, category_id?: string | number })[];
    const allCategories = await categoryRepo.findAll() as Category[];
    const allReviews = await reviewRepo.findAll() as (Review & { associationId?: string, rating?: number })[];
    
    const totalUsers = allUsers.length;
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const userGrowth = {
      thisMonth: allUsers.filter((user: User) => user.createdAt && new Date(user.createdAt) >= thisMonth).length,
      thisWeek: allUsers.filter((user: User) => user.createdAt && new Date(user.createdAt) >= thisWeek).length
    };
    
    const userDistribution = {
      volunteers: allUsers.filter((user: User) => user.role === 'volunteer').length,
      associationOwners: allUsers.filter((user: User) => user.role === 'associationOwner').length
    };
    
    const pendingAssociations = allAssociations.filter((assoc) => assoc.status === 'pending').length;
    const approvedAssociations = allAssociations.filter((assoc) => assoc.status === 'approved').length;
    const associationApprovalRate = allAssociations.length > 0 
      ? (approvedAssociations / allAssociations.length) * 100 
      : 0;
    
    const totalPlans = allPlans.length;
    const activePlans = allPlans.filter((plan) => plan.isActive).length;
    
    const plansByCategory = allCategories.map((category: Category) => ({
      categoryName: category.name,
      count: allPlans.filter((plan) => String(plan.category_id) === String(category.id)).length
    })).filter(cat => cat.count > 0);
    
    const totalReviews = allReviews.length;
    const averagePlatformRating = totalReviews > 0 
      ? allReviews.reduce((sum, review) => sum + (review.rating ?? 0), 0) / totalReviews 
      : 0;
    
    const associationRatings = allAssociations.map((association) => {
      const associationReviews = allReviews.filter((review) => String(review.associationId) === String(association.id));
      const averageRating = associationReviews.length > 0 
        ? associationReviews.reduce((sum, review) => sum + (review.rating ?? 0), 0) / associationReviews.length 
        : 0;
      
      return {
        id: String(association.id),
        name: association.name,
        averageRating,
        totalReviews: associationReviews.length,
        image_url: association.image_url
      };
    }).filter(assoc => assoc.totalReviews > 0);
    
    const topRatedAssociations = associationRatings
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);
    
    const bottomRatedAssociations = associationRatings
      .sort((a, b) => a.averageRating - b.averageRating)
      .slice(0, 5);
    
    return {
      totalUsers,
      userGrowth,
      userDistribution,
      pendingAssociations,
      approvedAssociations,
      associationApprovalRate,
      totalPlans,
      activePlans,
      plansByCategory,
      topRatedAssociations,
      bottomRatedAssociations,
      totalReviews,
      averagePlatformRating
    };
    
  } catch (error) {
    console.error('Error getting admin stats:', error);
    throw new Error('Failed to get admin statistics');
  }
}; 