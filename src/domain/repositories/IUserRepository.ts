import { User } from "../entities/User";

export interface IUserRepository {
  createUser(user: Omit<User, "id">): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
