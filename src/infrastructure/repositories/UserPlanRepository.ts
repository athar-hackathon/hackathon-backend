import { IUserPlanRepository } from "@/src/domain/repositories/IUserPlanRepository";
import { UserPlan } from "@/src/domain/entities/UserPlan";
import { db } from "../db/sequelize";
import { Model } from "sequelize";

export const UserPlanRepository: IUserPlanRepository = {
  async applyToPlan(userId: string, planId: string): Promise<UserPlan> {
    const userPlan = await db.user_plan.create({
      userId,
      planId,
      status: 'pending',
      appliedAt: new Date()
    });
    return userPlan.get() as UserPlan;
  },

  async getPendingApplications(planId: string): Promise<UserPlan[]> {
    const applications = await db.user_plan.findAll({
      where: {
        planId,
        status: 'pending'
      },
      include: [{
        model: db.user,
        as: 'user',
        attributes: ['id', 'name', 'email', 'profilePicture']
      }],
      order: [['appliedAt', 'ASC']]
    });
    return applications.map((app: Model) => app.get() as UserPlan);
  },

  async getApplicationById(id: string): Promise<UserPlan | null> {
    const application = await db.user_plan.findByPk(id, {
      include: [{
        model: db.user,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }, {
        model: db.plan,
        as: 'plan',
        attributes: ['id', 'name', 'description']
      }]
    });
    return application ? (application.get() as UserPlan) : null;
  },

  async updateApplicationStatus(id: string, status: 'accepted' | 'rejected'): Promise<UserPlan | null> {
    const application = await db.user_plan.findByPk(id);
    if (!application) return null;

    await application.update({ status });
    return application.get() as UserPlan;
  },

  async getUserApplications(userId: string): Promise<UserPlan[]> {
    const applications = await db.user_plan.findAll({
      where: { userId },
      include: [{
        model: db.plan,
        as: 'plan',
        attributes: ['id', 'name', 'description', 'startDate', 'endDate']
      }],
      order: [['appliedAt', 'DESC']]
    });
    return applications.map((app: Model) => app.get() as UserPlan);
  },

  async checkIfUserApplied(userId: string, planId: string): Promise<UserPlan | null> {
    const application = await db.user_plan.findOne({
      where: { userId, planId }
    });
    return application ? (application.get() as UserPlan) : null;
  },
  findByAssociationId: function (associationId: string): unknown {
    throw new Error("Function not implemented.");
  }
}; 