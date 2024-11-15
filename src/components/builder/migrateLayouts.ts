// Create a new file called migrateLayouts.ts
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';

const migrateLayouts = async () => {
  try {
    console.log('Starting layouts migration...');
    const layoutsCollection = collection(db, 'layouts');
    const querySnapshot = await getDocs(layoutsCollection);
    
    const migrations = querySnapshot.docs.map(async (docSnapshot) => {
      const layoutRef = doc(db, 'layouts', docSnapshot.id);
      const layoutData = docSnapshot.data();
      
      // Only update if projectId is undefined (not null)
      if (layoutData.projectId === undefined) {
        console.log(`Migrating layout: ${docSnapshot.id}`);
        return updateDoc(layoutRef, {
          projectId: null // Set to null for unassigned layouts
        });
      }
      return Promise.resolve();
    });

    await Promise.all(migrations);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
};

export default migrateLayouts;