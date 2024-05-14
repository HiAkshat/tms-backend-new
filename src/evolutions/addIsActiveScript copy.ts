import dotenv from "dotenv"
import { MongoClient } from 'mongodb';

dotenv.config()

// Connection URI
const uri = process.env.MONGO_URL ?? "";
// Database Name
const dbName = 'test';

// New value for isActive field
const newIsActiveValue = true;

// Create a new MongoClient
const client = new MongoClient(uri);

async function main() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database
    const db = client.db(dbName);

    // Update all documents in the collection
    const result = await db.collection('organisationusers').updateMany({}, { $rename: { "isActive": "is_active" } });

    console.log(`${result.modifiedCount} documents updated`);
  } catch (error: any) {
    console.log(error.message)
  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
