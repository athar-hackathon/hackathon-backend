import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { UserModel } from "../db/models/UserModel";
import { User } from "@/src/domain/entities/User";

export const UserRepository: IUserRepository = {
  async createUser(data) {
    const user = await UserModel.create(data);
    return user.get() as User;
  },
  async findByEmail(email) {
    const user = await UserModel.findOne({ where: { email } });
    return user ? (user.get() as User) : null;
  },
};
