import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";
import { Association } from "@/src/domain/entities/Association";

export const getAssociationByOwnerId = (repo: IAssociationRepository) => async (ownerId: string): Promise<Association | null> => {
  return repo.findByOwnerId(ownerId);
}; 