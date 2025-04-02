import devData from '../data/development-data/index';
import seed from './seed'
import db from '../db';

const runSeed = async(): Promise<void> => {
    try {
        await seed(devData);
        await db.end(); // Close the database connection
        console.log('✅ Database seeding complete');
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
      }
      
};

runSeed();