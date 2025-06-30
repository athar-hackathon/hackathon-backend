import { Plan } from "@/src/domain/entities/Plan";
import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { ICategoryRepository } from "@/src/domain/repositories/ICategoryRepository";

export const getPlansByCategoryName = (planRepo: IPlanRepository, categoryRepo: ICategoryRepository) => async (categoryName: string): Promise<{ success: boolean; plans?: Plan[]; error?: string }> => {
  try {
    // First check if the category exists
    const category = await categoryRepo.findByName(categoryName);
    if (!category) {
      return { 
        success: false, 
        error: `Category '${categoryName}' not found` 
      };
    }

    // If category exists, get plans
    const plans = await planRepo.findByCategoryName(categoryName);
    return { success: true, plans };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to get plans by category name: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}; 