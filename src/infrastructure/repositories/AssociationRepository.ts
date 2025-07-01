import { IAssociationRepository } from "@/src/domain/repositories/IAssociationRepository";
import { Association } from "@/src/domain/entities/Association";
import { db } from "../db/sequelize";
import { Model } from "sequelize";

type AssociationCreationInput = Omit<Association, "id">;

export const AssociationRepository: IAssociationRepository = {
  async create(data: AssociationCreationInput): Promise<Association> {
    console.log(data)
    const association = await db.association.create(data);
    return association.get() as Association;
  },

  async findById(id: string): Promise<Association | null> {
    const association = await db.association.findByPk(id);
    return association ? (association.get() as Association) : null;
  },

  async findAll(): Promise<Association[]> {
    const associations = await db.association.findAll();
    return associations.map((association: Model) => association.get() as Association);
  },

  async update(id: string, associationData: Partial<Association>): Promise<Association | null> {
    const association = await db.association.findByPk(id);
    if (!association) return null;
    
    await association.update(associationData);
    return association.get() as Association;
  },

  async delete(id: string): Promise<boolean> {
    try {
      const deletedCount = await db.association.destroy({
        where: { id }
      });
      return deletedCount > 0;
    } catch (error) {
      console.error('Error deleting association:', error);
      return false;
    }
  },

  async findByOwnerId(ownerId: string): Promise<Association[]> {
    const associations = await db.association.findAll({
      where: { owner_id: ownerId }
    });
    return associations.map((association: Model) => association.get() as Association);
  }
};