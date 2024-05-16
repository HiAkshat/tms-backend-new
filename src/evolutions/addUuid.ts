import dotenv from "dotenv"
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

dotenv.config()

// Connection URI
const uri = process.env.MONGO_URL ?? "";
// Database Name
const dbName = 'test';

// Create a new MongoClient
const client = new MongoClient(uri);

async function main() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database
    const db = client.db(dbName);

    // Get all documents in the collection
    const documents = await db.collection('organisations').find({}).toArray();

    // Update each document with a new unique ID
    for (const doc of documents) {
      // Generate a new unique ID
      const newUniqueId = uuidv4();

      // Update the document with the new unique ID
      await db.collection('organisations').updateOne({ _id: doc._id }, { $set: { unique_id: newUniqueId } });
    }

    console.log(`${documents.length} documents updated with new unique IDs`);
  } catch (error: any) {
    console.log(error.message)
  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
