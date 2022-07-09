import { connectDB } from './connect-db';
import { defaultState } from './defaultState';

async function initializeDB() {
  const db = await connectDB();
  const user = await db.collection('users').findOne({ id: 'U1' });

  if (!user) {
    for (let collectionName in defaultState) {
      const collection = db.collection(collectionName);

      await collection.insertMany(defaultState[collectionName]);
    }
  }
}

initializeDB();
