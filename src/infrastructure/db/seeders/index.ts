import { db } from '../sequelize';
import { syncDatabase } from '../sync';
import { seedUsers } from './userSeeder';
import { seedCategories } from './categorySeeder';
import { seedLocations } from './locationSeeder';
import { seedAssociations } from './associationSeeder';
import { seedDestinations } from './destinationSeeder';
import { seedPlans } from './planSeeder';
import { seedDestinationPlans } from './destinationPlansSeeder';
import { seedFees } from './feesSeeder';
import { seedUserPlans } from './userPlanSeeder';
import { seedReviews } from './reviewSeeder';

export const runSeeders = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Sync database first to ensure tables exist
    await syncDatabase();

    // Seed in order of dependencies
    console.log('📝 Seeding users...');
    const users = await seedUsers();
    
    console.log('📂 Seeding categories...');
    const categories = await seedCategories();
    
    console.log('📍 Seeding locations...');
    const locations = await seedLocations();
    
    console.log('🏢 Seeding associations...');
    const associations = await seedAssociations(users);
    
    console.log('🗺️ Seeding destinations...');
    const destinations = await seedDestinations(locations);
    
    console.log('📋 Seeding plans...');
    const plans = await seedPlans(associations, categories, destinations);
    
    console.log('🌍 Seeding destination plans...');
    const destinationPlans = await seedDestinationPlans();
    
    console.log('💰 Seeding fees...');
    const fees = await seedFees(plans);
    
    console.log('👥 Seeding user plans...');
    const userPlans = await seedUserPlans(users, plans);
    
    console.log('⭐ Seeding reviews...');
    const reviews = await seedReviews(users, associations);

    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Seeded data summary:`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Locations: ${locations.length}`);
    console.log(`   - Associations: ${associations.length}`);
    console.log(`   - Destinations: ${destinations.length}`);
    console.log(`   - Plans: ${plans.length}`);
    console.log(`   - Destination Plans: ${destinationPlans}`);
    console.log(`   - Fees: ${fees.length}`);
    console.log(`   - User Plans: ${userPlans.length}`);
    console.log(`   - Reviews: ${reviews.length}`);

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
};

// Run seeders if this file is executed directly
if (require.main === module) {
  runSeeders()
    .then(() => {
      console.log('🎉 Seeding process completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
} 