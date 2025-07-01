import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { EmailService } from "@/src/infrastructure/services/EmailService";
import { Plan } from "@/src/domain/entities/Plan";
import { db } from "@/src/infrastructure/db/sequelize";
import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";

export const deletePlan = (planRepo: IPlanRepository, userRepo: IUserRepository, associationRepo: IAssociationRepository) => async (
  planId: string, 
  userId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const plan = await planRepo.findById(planId);
    if (!plan) {
      return { success: false, error: "Plan not found" };
    }

    const user = await userRepo.findById(userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Check if user is admin or the association owner of this plan
    const isAdmin = user.role === 'admin';
    let isAssociationOwner = false;
    
    if (user.role === 'associationOwner') {
      // Get the association owned by this user
      const userAssociations = await associationRepo.findByOwnerId(userId);
      if (userAssociations.length > 0) {
        const userAssociationId = userAssociations[0].id;
        isAssociationOwner = String(plan.associationId) === String(userAssociationId);
      }
    }
    
    if (!isAdmin && !isAssociationOwner) {
      return { success: false, error: "Unauthorized: Admin or association owner access required" };
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

    // Send email notification to the association owner (only if admin is deleting)
    if (isAdmin) {
      const emailService = new EmailService();
      await emailService.sendPlanDeletionEmail(
        associationOwner.email,
        associationOwner.name,
        plan.name,
        user.name,
        reason
      );
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to delete plan: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}; 