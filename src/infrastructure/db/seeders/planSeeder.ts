import { db } from '../sequelize';

export const seedPlans = async (associations: any[], categories: any[], destinations: any[]) => {
  const plans = [
    {
      name: 'Beach Cleanup Initiative',
      description: 'Join us for a day of beach cleanup to protect marine life and keep our coasts beautiful.',
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-03-15'),
      volunteerNumber: 20,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[2]?.id, // Marseille Beach
      category_id: categories[0]?.id, // Environment
      associationId: associations[0]?.id // Green Earth Initiative
    },
    {
      name: 'Youth Mentoring Program',
      description: 'Mentor young students in academic subjects and life skills development.',
      startDate: new Date('2024-03-20'),
      endDate: new Date('2024-06-20'),
      volunteerNumber: 15,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[1]?.id, // Lyon Youth Center
      category_id: categories[1]?.id, // Education
      associationId: associations[1]?.id // Youth Education Foundation
    },
    {
      name: 'Health Awareness Campaign',
      description: 'Help spread awareness about preventive healthcare in local communities.',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-04-30'),
      volunteerNumber: 25,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[7]?.id, // Dijon Health Clinic
      category_id: categories[2]?.id, // Health
      associationId: associations[2]?.id // Community Health Alliance
    },
    {
      name: 'Animal Shelter Support',
      description: 'Help care for rescued animals and assist with daily shelter operations.',
      startDate: new Date('2024-03-25'),
      endDate: new Date('2024-12-25'),
      volunteerNumber: 10,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[5]?.id, // Bordeaux Animal Shelter
      category_id: categories[4]?.id, // Animal Welfare
      associationId: associations[3]?.id // Animal Rescue Network
    },
    {
      name: 'Community Garden Maintenance',
      description: 'Help maintain our community garden and teach sustainable gardening practices.',
      startDate: new Date('2024-04-10'),
      endDate: new Date('2024-10-10'),
      volunteerNumber: 12,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[6]?.id, // Lille Community Garden
      category_id: categories[0]?.id, // Environment
      associationId: associations[0]?.id // Green Earth Initiative
    },
    {
      name: 'Elderly Companionship Program',
      description: 'Provide companionship and support to elderly residents in our care facility.',
      startDate: new Date('2024-03-30'),
      endDate: new Date('2024-12-30'),
      volunteerNumber: 8,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[4]?.id, // Nice Elderly Care
      category_id: categories[8]?.id, // Elderly Care
      associationId: associations[6]?.id // Elderly Care Foundation
    },
    {
      name: 'Digital Literacy Workshop',
      description: 'Teach basic computer skills and digital literacy to community members.',
      startDate: new Date('2024-04-15'),
      endDate: new Date('2024-05-15'),
      volunteerNumber: 18,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[9]?.id, // Nantes Technology Hub
      category_id: categories[6]?.id, // Technology
      associationId: associations[5]?.id // Tech for Good
    },
    {
      name: 'Nature Conservation Project',
      description: 'Participate in wildlife monitoring and habitat restoration activities.',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-08-01'),
      volunteerNumber: 15,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[8]?.id, // Annecy Nature Reserve
      category_id: categories[0]?.id, // Environment
      associationId: associations[0]?.id // Green Earth Initiative
    },
    {
      name: 'Sports for Disabled Youth',
      description: 'Help organize and support sports activities for disabled youth.',
      startDate: new Date('2024-04-20'),
      endDate: new Date('2024-07-20'),
      volunteerNumber: 20,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[0]?.id, // Paris Community Center
      category_id: categories[7]?.id, // Youth Development
      associationId: associations[9]?.id // Sports for All
    },
    {
      name: 'Emergency Response Training',
      description: 'Learn and help teach emergency response skills for disaster preparedness.',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-30'),
      volunteerNumber: 30,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[3]?.id, // Toulouse University
      category_id: categories[9]?.id, // Disaster Relief
      associationId: associations[7]?.id // Disaster Relief Team
    }
  ];

  const createdPlans = [];
  for (const planData of plans) {
    const plan = await db.plan.create(planData);
    createdPlans.push(plan.get());
  }

  return createdPlans;
}; 