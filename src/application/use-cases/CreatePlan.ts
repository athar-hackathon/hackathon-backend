import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
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
    associationId: string
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
        associationId
      });

  };
