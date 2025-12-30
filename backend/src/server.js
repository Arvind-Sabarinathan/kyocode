import express from "express";
import { PORT } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to KyoCode!",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server is running on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
