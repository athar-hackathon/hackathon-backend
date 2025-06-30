import { db } from '../sequelize';

export const seedUserPlans = async (users: any[], plans: any[]) => {
  // Get volunteers (users with role 'volunteer')
  const volunteers = users.filter(user => user.role === 'volunteer');
  
  const userPlans = [
    {
      userId: volunteers[0]?.id, // Sophie Bernard
      planId: plans[0]?.id, // Beach Cleanup Initiative
      status: 'accepted' as const,
      appliedAt: new Date('2024-03-10')
    },
    {
      userId: volunteers[1]?.id, // Lucas Moreau
      planId: plans[1]?.id, // Youth Mentoring Program
      status: 'pending' as const,
      appliedAt: new Date('2024-03-12')
    },
    {
      userId: volunteers[2]?.id, // Emma Roux
      planId: plans[2]?.id, // Health Awareness Campaign
      status: 'accepted' as const,
      appliedAt: new Date('2024-03-15')
    },
    {
      userId: volunteers[3]?.id, // Thomas Leroy
      planId: plans[3]?.id, // Animal Shelter Support
      status: 'rejected' as const,
      appliedAt: new Date('2024-03-08')
    },
    {
      userId: volunteers[4]?.id, // Camille Petit
      planId: plans[4]?.id, // Community Garden Maintenance
      status: 'accepted' as const,
      appliedAt: new Date('2024-03-14')
    },
    {
      userId: volunteers[0]?.id, // Sophie Bernard
      planId: plans[5]?.id, // Elderly Companionship Program
      status: 'pending' as const,
      appliedAt: new Date('2024-03-16')
    },
    {
      userId: volunteers[1]?.id, // Lucas Moreau
      planId: plans[6]?.id, // Digital Literacy Workshop
      status: 'accepted' as const,
      appliedAt: new Date('2024-03-11')
    },
    {
      userId: volunteers[2]?.id, // Emma Roux
      planId: plans[7]?.id, // Nature Conservation Project
      status: 'pending' as const,
      appliedAt: new Date('2024-03-13')
    },
    {
      userId: volunteers[3]?.id, // Thomas Leroy
      planId: plans[8]?.id, // Sports for Disabled Youth
      status: 'accepted' as const,
      appliedAt: new Date('2024-03-09')
    },
    {
      userId: volunteers[4]?.id, // Camille Petit
      planId: plans[9]?.id, // Emergency Response Training
      status: 'pending' as const,
      appliedAt: new Date('2024-03-17')
    }
  ];

  const createdUserPlans = [];
  for (const userPlanData of userPlans) {
    const userPlan = await db.user_plan.create(userPlanData);
    createdUserPlans.push(userPlan.get());
  }

  return createdUserPlans;
}; 