import { createFees } from "@/src/application/use-cases/CreateFees";
import { createPlan } from "@/src/application/use-cases/CreatePlan";
import { PlanRepository } from "@/src/infrastructure/repositories/PlanRepository";
import { Request, Response } from "express";

function isErrorResult(result: any): result is { error: string } {
  return result && typeof result === "object" && "error" in result;
}

export const create = async (req: Request, res: Response): Promise<void> => {
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
    );

    if(plan && fees){
        createFees(fees, plan.id);
    }
    res
      .status(201)
      .json({ plan, message: "Login Successful" });
  } catch {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }
};
