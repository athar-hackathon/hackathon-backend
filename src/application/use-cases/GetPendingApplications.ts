import { IUserPlanRepository } from "@/src/domain/repositories/IUserPlanRepository";
import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { IUserRepository } from "@/src/domain/repositories/IUserRepository";

export const getPendingApplications = (
  userPlanRepo: IUserPlanRepository,
  planRepo: IPlanRepository,
  userRepo: IUserRepository
) => async (planId: string, associationOwnerId: string): Promise<{ success: boolean; applications?: any[]; error?: string }> => {
  try {
    const user = await userRepo.findById(associationOwnerId);
    if (!user || user.role !== 'associationOwner') {
      return { success: false, error: "Unauthorized: Only association owners can view applications" };
    }

    const plan = await planRepo.findById(planId);
    if (!plan) {
      return { success: false, error: "Plan not found" };
    }

    if (plan.associationId !== associationOwnerId) {
      return { success: false, error: "Unauthorized: You can only view applications for your own plans" };
    }

    const applications = await userPlanRepo.getPendingApplications(planId);

    return { success: true, applications };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to get pending applications: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}; 