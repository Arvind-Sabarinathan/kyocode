import mongoose from "mongoose";
import { DB_URL } from "./env.js";

export const connectDB = async () => {
  if (!DB_URL) {
    throw new Error("DB_URL environment variable is not defined");
  }
  const conn = await mongoose.connect(DB_URL);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
