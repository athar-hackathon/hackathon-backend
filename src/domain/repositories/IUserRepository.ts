import { User } from "../entities/User";

export interface IUserRepository {
  createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
