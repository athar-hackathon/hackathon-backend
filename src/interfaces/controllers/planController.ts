import { Request, Response } from "express";
import { FilterPlans } from "../../application/use-cases/FilterPlans";
import { getAllPlans } from "../../application/use-cases/GetAllPlans";
import { getPlanById } from "../../application/use-cases/GetPlanById";
import { PlanRepository } from "../../infrastructure/repositories/PlanRepository";
import { FilterOptions } from "../../domain/repositories/IPlanRepository";
import {
  PlanFilterQueryInput,
} from "../validators/planFilterSchema";
import { createFees } from "@/src/application/use-cases/CreateFees";
import { createPlan } from "@/src/application/use-cases/CreatePlan";
import { AuthRequest } from "../middlewares/authMiddleware";
import { getPlansByCategoryName } from "@/src/application/use-cases/GetPlansByCategoryName";
import { CategoryRepository } from "@/src/infrastructure/repositories/CategoryRepository";
import { getBase64Image } from "@/src/infrastructure/services/getBase64Image";
import { updatePlan } from "@/src/application/use-cases/UpdatePlan";
import { deletePlan } from "@/src/application/use-cases/DeletePlan";
import { UserRepository } from "@/src/infrastructure/repositories/UserRepository";
import { AssociationRepository } from "@/src/infrastructure/repositories/AssociationRepository";

function isErrorResult(result: any): result is { error: string } {
  return result && typeof result === "object" && "error" in result;
}

export const create = async (req: AuthRequest, res: Response): Promise<void> => {
  const {
    name,
    description,
    startDate,
    endDate,
    volunteerNumber,
    isPaid,
    totalFees,
    fees,
    destinationId,
    category_id,
  } = req.body;
  
  if (!req.user) {
    res.status(401).json({
      message: "Authentication required"
    });
    return;
  }
  
  const associationId = req.user.id;
  
  try {
    const plan = await createPlan(PlanRepository)(
      name,
      description,
      startDate,
      endDate,
      volunteerNumber,
      isPaid,
      totalFees,
      destinationId,
      category_id,
      associationId
    );
    if (plan && fees) {
      createFees(fees, plan.id);
    }
    res.status(201).json({ data: plan, message: "Plan created successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create plan",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const filterPlans = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // The validation is now handled by middleware, so we can safely cast
    const validatedData = req.query as PlanFilterQueryInput;

    const filters: FilterOptions = {};

    if (validatedData.categoryId) {
      filters.categoryId = validatedData.categoryId;
    }

    if (validatedData.minFees !== undefined) {
      filters.minFees = validatedData.minFees;
    }

    if (validatedData.isActive !== undefined) {
      filters.isActive = validatedData.isActive;
    }

    if (validatedData.isPaid !== undefined) {
      filters.isPaid = validatedData.isPaid;
    }

    // Location search parameters
    if (validatedData.country) {
      filters.country = validatedData.country;
    }

    if (validatedData.state) {
      filters.state = validatedData.state;
    }

    if (validatedData.city) {
      filters.city = validatedData.city;
    }

    if (validatedData.address) {
      filters.address = validatedData.address;
    }

    const filterPlansUseCase = new FilterPlans(PlanRepository);
    const plans = await filterPlansUseCase.execute(filters);

    res.status(200).json({
      success: true,
      data: plans,
      message: "Plans filtered successfully",
    });
  } catch (error) {
    console.error("Error filtering plans:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const getAllPlansController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    let plans: any[] = [];
    
    // Check if user is authenticated
    if (req.user) {
      const user = req.user;
      
      if (user.role === 'admin') {
        // Admin gets all plans
        plans = await getAllPlans(PlanRepository)();
      } else if (user.role === 'associationOwner') {
        // Association owner gets only their plans
        // First get the association owned by this user
        const userAssociations = await AssociationRepository.findByOwnerId(user.id);
        if (userAssociations.length > 0) {
          const associationId = userAssociations[0].id;
          plans = await getAllPlans(PlanRepository)();
          plans = plans.filter((plan: any) => plan.associationId === associationId);
        } else {
          plans = []; // No association found, return empty array
        }
      } else {
        // Volunteers get all plans (public view)
        plans = await getAllPlans(PlanRepository)();
      }
    } else {
      // Unauthenticated users get all plans (public view)
      plans = await getAllPlans(PlanRepository)();
    }
    
    plans.forEach((p: any) => {
      if (p.image_url) {
        p.image_url = getBase64Image(p.image_url);
      }
    });
    
    res.status(200).json({
      success: true,
      data: plans,
      message: "Plans retrieved successfully",
    });
  } catch (error) {
    console.error("Error getting plans:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const getPlanByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const plan = await getPlanById(PlanRepository)(id);

    if (!plan) {
      res.status(404).json({
        success: false,
        message: "Plan not found",
      });
      return;
    }
    if (plan.image_url) {
      plan.image_url = getBase64Image(plan.image_url);
    }
    res.status(200).json({
      success: true,
      data: plan,
      message: "Plan retrieved successfully",
    });
  } catch (error) {
    console.error("Error getting plan by id:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const getPlansByCategoryNameController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryName } = req.params;
    const result = await getPlansByCategoryName(PlanRepository, CategoryRepository)(categoryName);

    if (!result.success) {
      res.status(404).json({
        success: false,
        message: result.error
      });
      return;
    }
    if (result.plans) {
      result.plans.forEach((p: any) => {
        if (p.image_url) {
          p.image_url = getBase64Image(p.image_url);
        }
      });
    }
    res.status(200).json({
      success: true,
      data: result.plans,
      message: `Plans for category '${categoryName}' retrieved successfully`,
    });
  } catch (error) {
    console.error("Error getting plans by category name:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const updatePlanController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: planId } = req.params;
    const updateData = req.body;
    
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }

    const result = await updatePlan(PlanRepository, UserRepository)(
      planId,
      req.user.id,
      updateData
    );

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: result.plan,
      message: "Plan updated successfully"
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};

export const deletePlanController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: planId } = req.params;
    const { reason } = req.body;
    
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }

    // For association owners, we'll use their ID as the "adminId" 
    // but modify the deletePlan use case to allow association owners
    const result = await deletePlan(PlanRepository, UserRepository)(
      planId,
      req.user.id,
      reason
    );

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Plan deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};
