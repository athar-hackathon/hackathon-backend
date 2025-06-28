import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { User } from "@/src/domain/entities/User";
import { db } from "../db/sequelize";

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
};
