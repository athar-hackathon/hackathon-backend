import { IUserPlanRepository } from "@/src/domain/repositories/IUserPlanRepository";
import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { EmailService } from "@/src/infrastructure/services/EmailService";
import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";

export const rejectApplication = (
  userPlanRepo: IUserPlanRepository,
  planRepo: IPlanRepository,
  userRepo: IUserRepository,
  associationRepo: IAssociationRepository
) => async (applicationId: string, associationOwnerId: string, reason?: string): Promise<{ success: boolean; application?: any; error?: string }> => {
  try {
    const application = await userPlanRepo.getApplicationById(applicationId);
    if (!application) {
      return { success: false, error: "Application not found" };
    }

    const user = await userRepo.findById(associationOwnerId);
    if (!user || user.role !== 'associationOwner') {
      return { success: false, error: "Unauthorized: Only association owners can reject applications" };
    }

    // Get the association owned by this user
    const userAssociations = await associationRepo.findByOwnerId(associationOwnerId);
    if (userAssociations.length === 0) {
      return { success: false, error: "User does not own any association" };
    }

    const userAssociationId = userAssociations[0].id;

    const plan = await planRepo.findById(application.planId);
    if (!plan || String(plan.associationId) !== String(userAssociationId)) {
      return { success: false, error: "Unauthorized: You can only reject applications for your own plans" };
    }

    if (application.status !== 'pending') {
      return { success: false, error: "Application has already been processed" };
    }

    const updatedApplication = await userPlanRepo.updateApplicationStatus(applicationId, 'rejected');
    if (!updatedApplication) {
      return { success: false, error: "Failed to update application status" };
    }

    const appWithUser = application as any;
    if (!appWithUser.user) {
      return { success: false, error: "User not loaded with application" };
    }

    const emailService = new EmailService();
    await emailService.sendApplicationRejectedEmail(
      appWithUser.user.email,
      appWithUser.user.name,
      plan.name,
      reason
    );

    return { success: true, application: updatedApplication };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to reject application: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}; 