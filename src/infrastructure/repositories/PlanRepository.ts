import { Plan } from "@/src/domain/entities/Plan";
import { db } from "../db/sequelize";
import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";

type PlanCreationInput = Omit<Plan, "id" | "createdAt" | "updatedAt">;

export const PlanRepository: IPlanRepository = {
  async createPlan(data: PlanCreationInput) {
    const plan = await db.plan.create(data);
    return plan.get() as Plan;
  },
  // async findByEmail(email) {
  //   const user = await db.user.findOne({ where: { email } });
  //   return user ? (user.get() as Plan) : null;
  // },
};
