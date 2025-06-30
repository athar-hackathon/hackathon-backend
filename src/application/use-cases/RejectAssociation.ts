import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { EmailService } from "@/src/infrastructure/services/EmailService";
import { User } from "@/src/domain/entities/User";
export const rejectAssociation = (repo: IUserRepository) => 
  async (userId: string, reason?: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
      const user = await repo.findById(userId);

      if (!user) {
        return { success: false, error: "User not found" };
      }

      if (user.role !== "associationOwner") {
        return { success: false, error: "User is not an association owner" };
      }
      const emailService = new EmailService();
      await emailService.sendRejectionEmail(user.email, user.name, reason);

      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: `Failed to reject association: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  };
