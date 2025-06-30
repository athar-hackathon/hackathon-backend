import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";
import { IUserRepository } from "@/src/domain/repositories/IUserRepository";

export const recommendPlans = (planRepo: IPlanRepository, userRepo: IUserRepository) => async (userId: string) => {
  const user = await userRepo.findById(userId);
  if (!user) return [];

  // 1. Plans matching user interests
  let interestPlans: any[] = [];
  if (user.interests && user.interests.length > 0) {
    interestPlans = await planRepo.findByCategories(user.interests);
  }

  // 2. Plans similar to those the user joined
  const joinedPlans = await planRepo.findByUserParticipation(userId);
  const joinedCategories = [...new Set(joinedPlans.map(p => p.category_id))];
  let similarPlans: any[] = [];
  if (joinedCategories.length > 0) {
    similarPlans = await planRepo.findByCategories(joinedCategories);
  }

  // 3. Most popular plans
  const popularPlans = await planRepo.findMostPopular({ limit: 10 });

  // Combine and deduplicate
  const allPlans = [...interestPlans, ...similarPlans, ...popularPlans];
  const uniquePlans = Array.from(new Map(allPlans.map(p => [p.id, p])).values());

  return uniquePlans;
}; 