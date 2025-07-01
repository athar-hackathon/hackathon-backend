import { IUserPlanRepository } from "@/src/domain/repositories/IUserPlanRepository";
import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";
import { IUserRepository } from "@/src/domain/repositories/IUserRepository";

export const getPendingApplicationsForAssociation = (
  userPlanRepo: IUserPlanRepository,
  planRepo: IPlanRepository,
  associationRepo: IAssociationRepository,
  userRepo: IUserRepository
) => async (associationOwnerId: string): Promise<{ success: boolean; applications?: any[]; error?: string }> => {
  try {
    // Verify the user is an association owner
    const user = await userRepo.findById(associationOwnerId);
    if (!user || user.role !== 'associationOwner') {
      return { success: false, error: "Unauthorized: Only association owners can view pending applications" };
    }

    // Get the association owned by this user
    const userAssociations = await associationRepo.findByOwnerId(associationOwnerId);
    if (userAssociations.length === 0) {
      return { success: false, error: "User does not own any association" };
    }

    const associationId = userAssociations[0].id;

    // Get all plans for this association
    const allPlans = await planRepo.findByAssociationId(String(associationId));
    
    // Get pending applications for all these plans with plan details
    const pendingApplications = [];
    
    for (const plan of allPlans) {
      const planApplications = await userPlanRepo.getPendingApplications(String(plan.id));
      
      // For each application, get the full details including plan information
      for (const application of planApplications) {
        const fullApplication = await userPlanRepo.getApplicationById(application.id);
        if (fullApplication) {
          pendingApplications.push(fullApplication);
        }
      }
    }

    return { success: true, applications: pendingApplications };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to get pending applications: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}; 