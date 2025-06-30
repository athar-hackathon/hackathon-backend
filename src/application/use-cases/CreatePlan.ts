import { Fees } from "@/src/domain/entities/Fees";
import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import bcrypt from "bcrypt";
export const createPlan =
  (repo: IPlanRepository) =>
  async (
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    volunteerNumber: number,
    isPaid: boolean,
    totalFees:string,
    destinationId: number,
    category_id: string,
  ) => {
      return repo.createPlan({
        name,
        description,
        startDate,
        endDate,
        volunteerNumber,
        appliedVolunteerNumber: 0,
        isActive: true,
        isPaid,
        totalFees,
        destinationId,
        category_id,
      });
    
  };
