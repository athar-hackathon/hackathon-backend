import { Fees } from "@/src/domain/entities/Fees";
import { db } from "../db/sequelize";
import { IFeesRepository } from "@/src/domain/repositories/IFeesRepository";

export const FeesRepository: IFeesRepository = {
  async createFees(
    data: Omit<Fees, "id" | "createdAt" | "updatedAt" | "plan_id">[],
    plan_id: number
  ): Promise<Fees[]> {
    const fees: Fees[] = [];

    for (const fee of data) {
      const createdFee = await db.plan.create({ data: { ...fee, plan_id } });
      fees.push(createdFee);
    }

    return fees;
  },
};
