import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { PORT, NODE_ENV, CLIENT_URL } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));

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
    app.listen(PORT, () => {
      if (NODE_ENV === "development") {
        console.log(`Server running at http://localhost:${PORT}`);
      } else {
        console.log("Server started successfully");
        console.log(`Environment: ${NODE_ENV}`);
        console.log(`Listening on port ${PORT}`);
      }
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
