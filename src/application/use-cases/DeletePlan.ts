import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { EmailService } from "@/src/infrastructure/services/EmailService";
import { Plan } from "@/src/domain/entities/Plan";
import { db } from "@/src/infrastructure/db/sequelize";

export const deletePlan = (planRepo: IPlanRepository, userRepo: IUserRepository) => async (
  planId: string, 
  adminId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const plan = await planRepo.findById(planId);
    if (!plan) {
      return { success: false, error: "Plan not found" };
    }

    const admin = await userRepo.findById(adminId);
    if (!admin || admin.role !== 'admin') {
      return { success: false, error: "Unauthorized: Admin access required" };
    }

    if (!plan.associationId) {
      return { success: false, error: "Plan is not associated with any association" };
    }

    const association = await db.association.findByPk(plan.associationId);
    if (!association) {
      return { success: false, error: "Association not found" };
    }

    // Get the association owner (user)
    const associationOwner = await userRepo.findById(association.owner_id);
    if (!associationOwner) {
      return { success: false, error: "Association owner not found" };
    }

    // Delete the plan
    const deleted = await planRepo.delete(planId);
    if (!deleted) {
      return { success: false, error: "Failed to delete plan" };
    }

    // Send email notification to the association owner
    const emailService = new EmailService();
    await emailService.sendPlanDeletionEmail(
      associationOwner.email,
      associationOwner.name,
      plan.name,
      admin.name,
      reason
    );

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to delete plan: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}; 