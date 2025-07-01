import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";
import { Association } from "@/src/domain/entities/Association";

export const getAssociationByOwnerId = (repo: IAssociationRepository) => async (ownerId: string): Promise<Association | null> => {
  const associations = await repo.findByOwnerId(ownerId);
  return associations.length > 0 ? associations[0] : null;
}; 