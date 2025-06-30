import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { EmailService } from "@/src/infrastructure/services/EmailService";
import { User } from "@/src/domain/entities/User";

export const approveAssociation = (repo: IUserRepository) => async (userId: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const user = await repo.findById(userId);
    
    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (user.role !== "associationOwner") {
      return { success: false, error: "User is not an association owner" };
    }

    if (user.isActive) {
      return { success: false, error: "Association is already approved" };
    }

    const updatedUser = await repo.update(userId, {
      isActive: true
    });

    if (!updatedUser) {
      return { success: false, error: "Failed to update user" };
    }

    const emailService = new EmailService();
    await emailService.sendApprovalEmail(user.email, user.name);

    return { success: true, user: updatedUser };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to approve association: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}; 