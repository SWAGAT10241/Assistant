import mongoose from "mongoose";
import env from "./env.js";

const connectDb = async () => {
  try {
    if (!env.MONGODB_URL) {
      console.warn("⚠️ Warning: MONGODB_URL environment variable is not defined");
      return;
    }

    const conn = await mongoose.connect(env.MONGODB_URL);
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Don't crash immediately in dev, but log error
    if (env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

export default connectDb;