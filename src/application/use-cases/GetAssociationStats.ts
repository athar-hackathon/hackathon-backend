import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";
import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { IUserPlanRepository } from "@/src/domain/repositories/IUserPlanRepository";
import { IReviewRepository } from "@/src/domain/repositories/IReviewRepository";
import { Plan } from "@/src/domain/entities/Plan";
import { Review } from "@/src/domain/entities/Review";

export interface AssociationStats {
  totalPlans: number;
  activePlans: number;
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
  totalReviews: number;
  averageRating: number;
  totalVolunteers: number;
  plansThisMonth: number;
  applicationsThisMonth: number;
  topPlans: Array<{
    id: string;
    name: string;
    applications: number;
  }>;
  recentActivity: Array<{
    type: 'plan_created' | 'application_received' | 'review_received';
    description: string;
    date: Date;
  }>;
}

export const GetAssociationStats = (
  associationRepo: IAssociationRepository,
  planRepo: IPlanRepository,
  userPlanRepo: IUserPlanRepository,
  reviewRepo: IReviewRepository
) => async (associationId: string): Promise<AssociationStats> => {
  try {
    // Get all plans for this association
    const plans = await planRepo.findByAssociationId(associationId) as (Plan & { createdAt?: string })[];
    // Get all applications for this association's plans
    const allApplications = await userPlanRepo.findByAssociationId(associationId) as Array<{ status: string; userId: string; planId: string; createdAt?: string }>;
    // Get all reviews for this association
    const reviews = await reviewRepo.findByAssociationId(associationId) as (Review & { createdAt?: string })[];
    // Calculate statistics
    const totalPlans = plans.length;
    const activePlans = plans.filter((plan) => plan.isActive).length;
    const totalApplications = allApplications.length;
    const pendingApplications = allApplications.filter((app) => app.status === 'pending').length;
    const acceptedApplications = allApplications.filter((app) => app.status === 'accepted').length;
    const rejectedApplications = allApplications.filter((app) => app.status === 'rejected').length;
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0) / totalReviews 
      : 0;
    // Get unique volunteers
    const uniqueVolunteers = new Set(allApplications.map((app) => app.userId));
    const totalVolunteers = uniqueVolunteers.size;
    // Get plans created this month
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    const plansThisMonth = plans.filter((plan) => plan.createdAt && new Date(plan.createdAt) >= thisMonth).length;
    const applicationsThisMonth = allApplications.filter((app) => app.createdAt && new Date(app.createdAt) >= thisMonth).length;
    // Get top plans by application count
    const planApplicationCounts = plans.map((plan) => ({
      id: String(plan.id),
      name: plan.name,
      applications: allApplications.filter((app) => String(app.planId) === String(plan.id)).length
    }));
    const topPlans = planApplicationCounts
      .sort((a, b) => b.applications - a.applications)
      .slice(0, 5);
    // Get recent activity (last 10 activities)
    const recentActivity: AssociationStats["recentActivity"] = [];
    // Add recent plan creations
    const recentPlans = plans
      .filter(plan => plan.createdAt)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, 5);
    recentPlans.forEach(plan => {
      recentActivity.push({
        type: 'plan_created',
        description: `New plan created: ${plan.name}`,
        date: new Date(plan.createdAt!)
      });
    });
    // Add recent applications
    const recentApplications = allApplications
      .filter(app => app.createdAt)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, 5);
    recentApplications.forEach(app => {
      const plan = plans.find(p => String(p.id) === String(app.planId));
      recentActivity.push({
        type: 'application_received',
        description: `New application received for: ${plan?.name || 'Unknown Plan'}`,
        date: new Date(app.createdAt!)
      });
    });
    // Add recent reviews
    const recentReviews = reviews
      .filter(review => review.createdAt)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, 5);
    recentReviews.forEach(review => {
      recentActivity.push({
        type: 'review_received',
        description: `New review received: ${review.rating}/5 stars`,
        date: new Date(review.createdAt!)
      });
    });
    // Sort all activities by date and take top 10
    const sortedActivity = recentActivity
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);
    return {
      totalPlans,
      activePlans,
      totalApplications,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
      totalReviews,
      averageRating,
      totalVolunteers,
      plansThisMonth,
      applicationsThisMonth,
      topPlans,
      recentActivity: sortedActivity
    };
  } catch (error) {
    console.error('Error getting association stats:', error);
    throw new Error('Failed to get association statistics');
  }
}; 