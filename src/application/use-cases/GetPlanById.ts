import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { Plan } from "@/src/domain/entities/Plan";

export const getPlanById = (repo: IPlanRepository) => async (id: string): Promise<Plan | null> => {
  try {
    return await repo.findById(id);
  } catch (error) {
    throw new Error(`Failed to get plan by id: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}; 