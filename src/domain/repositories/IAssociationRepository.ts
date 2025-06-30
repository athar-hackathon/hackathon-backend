import { Association } from "@/src/domain/entities/Association";

export interface IAssociationRepository {
  create(data: Omit<Association, "id">): Promise<Association>;
} 