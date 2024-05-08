import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config()

export default async function connectToMongoDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL ?? "");
    console.log("Connect to MongoDB Database!");
  } catch (e) {
    console.log("Error connecting to MongoDB: ", e);
  }
}