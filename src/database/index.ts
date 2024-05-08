import mongoose from "mongoose";

export default async function connectToMongoDb() {
  const MongoDB_Connection_String = "mongodb+srv://akshat:net123@tmscluster.ilzrhhb.mongodb.net/?retryWrites=true&w=majority&appName=TmsCluster"

  try {
    await mongoose.connect(MongoDB_Connection_String);
    console.log("Connect to MongoDB Database!");
  } catch (e) {
    console.log("Error connecting to MongoDB: ", e);
  }
}