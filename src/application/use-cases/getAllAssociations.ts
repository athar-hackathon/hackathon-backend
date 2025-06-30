import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";
import { Association } from "@/src/domain/entities/Association";

export const getAllAssociations = (repo: IAssociationRepository) => async (): Promise<Association[]> => {
  return repo.findAll();
}; 