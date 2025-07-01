import { User } from "../entities/User";

export interface IUserRepository {
  findAll: any;
  createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User | null>;
  findByRoleAndActiveStatus(role: string, isActive: boolean): Promise<User[]>;
}
