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
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const plans = await getAllPlans(PlanRepository)();

    res.status(200).json({
      success: true,
      data: plans,
      message: "All plans retrieved successfully",
    });
  } catch (error) {
    console.error("Error getting all plans:", error);
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
