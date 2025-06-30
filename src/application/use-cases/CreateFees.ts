import { Fees } from "@/src/domain/entities/Fees";
import { IFeesRepository } from "@/src/domain/repositories/IFeesRepository";
export const createFees = (repo: IFeesRepository, plan_id: number) => async (fees: Omit<Fees, "id" | "createdAt" | "updatedAt" | "plan_id">[], plan_id: number) => {
  return repo.createFees(fees, plan_id);
};
