import { Fees } from "../entities/Fees";

export interface IFeesRepository {
  createFees(fees: Omit<Fees, "id" | "createdAt" | "updatedAt" | "plan_id">[], plan_id: number): Promise<Fees[]>;
  // findByEmail(email: string): Promise<User | null>;
}
