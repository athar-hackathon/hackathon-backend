import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";
import { Association } from "@/src/domain/entities/Association";

export const getAssociationById = (repo: IAssociationRepository) => async (id: string): Promise<Association | null> => {
  return repo.findById(id);
}; 