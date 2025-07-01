import { Association } from "@/src/domain/entities/Association";
import { AssociationRepository } from "@/src/infrastructure/repositories/AssociationRepository";

export async function createAssociation(data: Omit<Association, "id">): Promise<Association> {
    console.log(data)
  return AssociationRepository.create(data);
}
