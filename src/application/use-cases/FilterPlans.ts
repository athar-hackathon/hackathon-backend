import { Plan } from "../../domain/entities/Plan";
import { IPlanRepository, FilterOptions } from "../../domain/repositories/IPlanRepository";

export class FilterPlans {
  constructor(private planRepository: IPlanRepository) {}

  async execute(filters: FilterOptions): Promise<Plan[]> {
    try {
      const plans = await this.planRepository.findByFilters(filters);
      return plans;
    } catch (error) {
      throw new Error(`Failed to filter plans: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 