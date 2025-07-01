import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { Plan } from "@/src/domain/entities/Plan";

export interface UpdatePlanData {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  volunteerNumber?: number;
  isPaid?: boolean;
  totalFees?: number;
  isActive?: boolean;
  image_url?: string;
}

export const updatePlan = (planRepo: IPlanRepository, userRepo: IUserRepository) => async (
  planId: string,
  userId: string,
  updateData: UpdatePlanData
): Promise<{ success: boolean; plan?: Plan; error?: string }> => {
  try {
    const plan = await planRepo.findById(planId);
    if (!plan) {
      return { success: false, error: "Plan not found" };
    }

    const user = await userRepo.findById(userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Check if user is the association owner of this plan
    if (user.role !== 'associationOwner' || plan.associationId !== user.id) {
      return { success: false, error: "Unauthorized: Only the association owner can update this plan" };
    }
    // Convert date strings to Date objects
    const processedUpdateData = {
      ...updateData,
      startDate: updateData.startDate ? new Date(updateData.startDate) : undefined,
      endDate: updateData.endDate ? new Date(updateData.endDate) : undefined
    };
    // Update the plan
    const updatedPlan = await planRepo.update(planId, {
      ...processedUpdateData,
      totalFees: processedUpdateData.totalFees?.toString()
    });
    if (!updatedPlan) {
      return { success: false, error: "Failed to update plan" };
    }

    return { success: true, plan: updatedPlan };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to update plan: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}; 