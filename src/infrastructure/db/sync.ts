import { db } from './sequelize';

export const syncDatabase = async () => {
  try {
    console.log('🔄 Syncing database...');
    await db.sequelize.sync({ force: true });
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Error during database synchronization:', error);
    throw error;
  }
};

// Run sync if this file is executed directly
if (require.main === module) {
  syncDatabase()
    .then(() => {
      console.log('🎉 Database sync completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Database sync failed:', error);
      process.exit(1);
    });
} 