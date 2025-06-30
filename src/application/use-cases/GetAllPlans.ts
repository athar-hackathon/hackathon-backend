import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { Plan } from "@/src/domain/entities/Plan";

export const getAllPlans = (repo: IPlanRepository) => async (): Promise<Plan[]> => {
  try {
    return await repo.findAll();
  } catch (error) {
    throw new Error(`Failed to get all plans: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}; 