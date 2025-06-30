import { Association } from "../entities/Association";

export interface IAssociationRepository {
  create(association: Omit<Association, "id">): Promise<Association>;
  findById(id: string): Promise<Association | null>;
  findAll(): Promise<Association[]>;
  update(id: string, association: Partial<Association>): Promise<Association | null>;
  delete(id: string): Promise<boolean>;
  findByOwnerId(ownerId: string): Promise<Association[]>;
} 