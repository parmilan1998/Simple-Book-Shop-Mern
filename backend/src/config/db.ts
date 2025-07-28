import mongoose from "mongoose";
import { config } from "./env";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log(colors.green.bold("✅ MongoDB connected successfully"));
  } catch (err) {
    console.error(colors.red.bold("❌ MongoDB connection failed:"), err);
    process.exit(1);
  }
};

export default connectDB;
