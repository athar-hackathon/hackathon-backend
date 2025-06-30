import { db } from '../sequelize';

export const seedFees = async (plans: any[]) => {
  const fees = [
    {
      name: 'Registration Fee',
      fees: '0',
      plan_id: plans[0]?.id // Beach Cleanup Initiative
    },
    {
      name: 'Materials Fee',
      fees: '15',
      plan_id: plans[1]?.id // Youth Mentoring Program
    },
    {
      name: 'Health Kit Fee',
      fees: '25',
      plan_id: plans[2]?.id // Health Awareness Campaign
    },
    {
      name: 'Animal Care Supplies',
      fees: '10',
      plan_id: plans[3]?.id // Animal Shelter Support
    },
    {
      name: 'Garden Tools Fee',
      fees: '20',
      plan_id: plans[4]?.id // Community Garden Maintenance
    },
    {
      name: 'Background Check Fee',
      fees: '30',
      plan_id: plans[5]?.id // Elderly Companionship Program
    },
    {
      name: 'Computer Lab Fee',
      fees: '40',
      plan_id: plans[6]?.id // Digital Literacy Workshop
    },
    {
      name: 'Conservation Equipment',
      fees: '35',
      plan_id: plans[7]?.id // Nature Conservation Project
    },
    {
      name: 'Sports Equipment',
      fees: '50',
      plan_id: plans[8]?.id // Sports for Disabled Youth
    },
    {
      name: 'Emergency Training Kit',
      fees: '45',
      plan_id: plans[9]?.id // Emergency Response Training
    }
  ];

  const createdFees = [];
  for (const feeData of fees) {
    const fee = await db.fees.create(feeData);
    createdFees.push(fee.get());
  }

  return createdFees;
}; 