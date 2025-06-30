import { Association } from "@/src/domain/entities/Association";

export interface IAssociationRepository {
  create(data: Omit<Association, "id">): Promise<Association>;
  findById: (id: string) => Promise<Association | null>;
  findAll: () => Promise<Association[]>;
  findByOwnerId: (ownerId: string) => Promise<Association | null>;
} 