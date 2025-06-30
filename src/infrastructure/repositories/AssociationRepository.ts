import { Association } from "@/src/domain/entities/Association";
import { db } from "../db/sequelize";
import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";

export const AssociationRepository: IAssociationRepository = {
  async create(data) {
    const association = await db.association.create(data);
    return association.get() as Association;
  },
  async findById(id) {
    const association = await db.association.findByPk(id);
    return association ? (association.get() as Association) : null;
  },
  async findAll() {
    const associations = await db.association.findAll();
    return associations.map((a: any) => a.get() as Association);
  },
  async findByOwnerId(ownerId) {
    const association = await db.association.findOne({ where: { owner_id: ownerId } });
    return association ? (association.get() as Association) : null;
  },
}; 