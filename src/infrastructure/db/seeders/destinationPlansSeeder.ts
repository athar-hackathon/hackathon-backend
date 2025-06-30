import { db } from "../sequelize";

export const seedDestinationPlans = async (): Promise<number> => {
  try {
    console.log('🌍 Seeding destination_plans...');

    // Get existing destinations and plans
    const destinations = await db.destination.findAll();
    const plans = await db.plan.findAll();

    if (destinations.length === 0) {
      console.log('⚠️  No destinations found. Please run destinations seeder first.');
      return 0;
    }

    if (plans.length === 0) {
      console.log('⚠️  No plans found. Please run plans seeder first.');
      return 0;
    }

    // Create destination-plan associations
    const destinationPlans = [];

    // Associate each plan with 1-3 destinations
    for (const plan of plans) {
      const numDestinations = Math.floor(Math.random() * 3) + 1; // 1-3 destinations per plan
      const selectedDestinations = destinations
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, numDestinations);

      for (const destination of selectedDestinations) {
        destinationPlans.push({
          destination_id: destination.id,
          plan_id: plan.id
        });
      }
    }

    // Insert destination-plan associations
    const created = await db.destination_plan.bulkCreate(destinationPlans, {
      ignoreDuplicates: true
    });

    console.log(`✅ Successfully seeded ${created.length} destination-plan associations`);
    return created.length;
  } catch (error) {
    console.error('❌ Error seeding destination_plans:', error);
    throw error;
  }
}; 