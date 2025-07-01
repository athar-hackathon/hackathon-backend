import { IUserPlanRepository } from "@/src/domain/repositories/IUserPlanRepository";
import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { EmailService } from "@/src/infrastructure/services/EmailService";
import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";

export const acceptApplication = (
  userPlanRepo: IUserPlanRepository,
  planRepo: IPlanRepository,
  userRepo: IUserRepository,
  associationRepo: IAssociationRepository
) => async (applicationId: string, associationOwnerId: string): Promise<{ success: boolean; application?: any; error?: string }> => {
  try {
    // Get the application
    const application = await userPlanRepo.getApplicationById(applicationId);
    if (!application) {
      return { success: false, error: "Application not found" };
    }

    // Check if the user is an association owner
    const user = await userRepo.findById(associationOwnerId);
    if (!user || user.role !== 'associationOwner') {
      return { success: false, error: "Unauthorized: Only association owners can accept applications" };
    }

    // Get the association owned by this user
    const userAssociations = await associationRepo.findByOwnerId(associationOwnerId);
    if (userAssociations.length === 0) {
      return { success: false, error: "User does not own any association" };
    }

    const userAssociationId = userAssociations[0].id;

    // Check if the plan belongs to this association owner
    const plan = await planRepo.findById(application.planId);
    if (!plan || String(plan.associationId) !== String(userAssociationId)) {
      return { success: false, error: "Unauthorized: You can only accept applications for your own plans" };
    }

    // Check if application is still pending
    if (application.status !== 'pending') {
      return { success: false, error: "Application has already been processed" };
    }

    // Update application status
    const updatedApplication = await userPlanRepo.updateApplicationStatus(applicationId, 'accepted');
    if (!updatedApplication) {
      return { success: false, error: "Failed to update application status" };
    }

    // Safely access user property
    const appWithUser = application as any;
    if (!appWithUser.user) {
      return { success: false, error: "User not loaded with application" };
    }

    // Send acceptance email
    const emailService = new EmailService();
    await emailService.sendApplicationAcceptedEmail(
      appWithUser.user.email,
      appWithUser.user.name,
      plan.name
    );

    return { success: true, application: updatedApplication };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to accept application: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}; 