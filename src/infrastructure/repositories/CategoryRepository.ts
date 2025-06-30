import { ICategoryRepository } from "@/src/domain/repositories/ICategoryRepository";
import { Category } from "@/src/domain/entities/Category";
import { db } from "../db/sequelize";
import { Model } from "sequelize";

type CategoryCreationInput = Omit<Category, "id">;

export const CategoryRepository: ICategoryRepository = {
  async findAll(): Promise<Category[]> {
    const categories = await db.category.findAll();
    return categories.map((category: Model) => category.get() as Category);
  },

  async findById(id: string): Promise<Category | null> {
    const category = await db.category.findByPk(id);
    return category ? (category.get() as Category) : null;
  },

  async findByName(name: string): Promise<Category | null> {
    const category = await db.category.findOne({ where: { name } });
    return category ? (category.get() as Category) : null;
  },
}; 