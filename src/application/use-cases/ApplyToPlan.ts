import { IUserPlanRepository } from "@/src/domain/repositories/IUserPlanRepository";
import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { IUserRepository } from "@/src/domain/repositories/IUserRepository";

export const applyToPlan = (
  userPlanRepo: IUserPlanRepository,
  planRepo: IPlanRepository,
  userRepo: IUserRepository
) => async (userId: string, planId: string): Promise<{ success: boolean; application?: any; error?: string }> => {
  try {
    const user = await userRepo.findById(userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (!user.isActive) {
      return { success: false, error: "User account is not active" };
    }

    const plan = await planRepo.findById(planId);
    if (!plan) {
      return { success: false, error: "Plan not found" };
    }

    if (!plan.isActive) {
      return { success: false, error: "Plan is not active" };
    }

    const existingApplication = await userPlanRepo.checkIfUserApplied(userId, planId);
    if (existingApplication) {
      return { success: false, error: "You have already applied to this plan" };
    }

    const application = await userPlanRepo.applyToPlan(userId, planId);

    return { success: true, application };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to apply to plan: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}; 