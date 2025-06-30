import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { User } from "@/src/domain/entities/User";

export const getPendingAssociations = (repo: IUserRepository) => async (): Promise<User[]> => {
  try {
    const pendingAssociations = await repo.findByRoleAndActiveStatus("associationOwner", false);
    return pendingAssociations;
  } catch (error) {
    throw new Error(`Failed to get pending associations: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}; 