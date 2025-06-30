import { Plan } from "../entities/Plan";

export interface IPlanRepository {
  createPlan(user: Omit<Plan, "id" | "createdAt" | "updatedAt">): Promise<Plan>;
  // findByEmail(email: string): Promise<User | null>;
}
