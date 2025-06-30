import { UserPlan } from "../entities/UserPlan";

export interface IUserPlanRepository {
  applyToPlan(userId: string, planId: string): Promise<UserPlan>;
  getPendingApplications(planId: string): Promise<UserPlan[]>;
  getApplicationById(id: string): Promise<UserPlan | null>;
  updateApplicationStatus(id: string, status: 'accepted' | 'rejected'): Promise<UserPlan | null>;
  getUserApplications(userId: string): Promise<UserPlan[]>;
  checkIfUserApplied(userId: string, planId: string): Promise<UserPlan | null>;
} 