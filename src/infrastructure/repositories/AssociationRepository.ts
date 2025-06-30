import { Association } from "@/src/domain/entities/Association";
import { db } from "../db/sequelize";
import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";

export const AssociationRepository: IAssociationRepository = {
  async create(data) {
    const association = await db.association.create(data);
    return association.get() as Association;
  },
}; 