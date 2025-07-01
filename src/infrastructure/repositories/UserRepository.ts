import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { User } from "@/src/domain/entities/User";
import { db } from "../db/sequelize";
import { Model } from "sequelize";

type UserCreationInput = Omit<User, "id" | "createdAt" | "updatedAt">;

export const UserRepository: IUserRepository = {
  async createUser(data: UserCreationInput) {
    const user = await db.user.create(data);
    return user.get() as User;
  },
  async findByEmail(email) {
    const user = await db.user.findOne({ where: { email } });
    return user ? (user.get() as User) : null;
  },
  async findById(id: string) {
    const user = await db.user.findByPk(id);
    return user ? (user.get() as User) : null;
  },
  async update(id: string, userData: Partial<User>) {
    const user = await db.user.findByPk(id);
    if (!user) return null;

    await user.update(userData);
    return user.get() as User;
  },
  async findByRoleAndActiveStatus(role: string, isActive: boolean) {
    const users = await db.user.findAll({
      where: {
        role,
        isActive
      },
      order: [['createdAt', 'DESC']]
    });
    return users.map((user: Model) => user.get() as User);
  },
  async findAll() {
    const users = await db.user.findAll();
    return users.map((user: Model) => user.get() as User);
  },
  async delete(id: string) {
    const deletedCount = await db.user.destroy({ where: { id } });
    return deletedCount > 0;
  },
};
