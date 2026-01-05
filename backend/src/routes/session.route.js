import express from "express";
import { authorizeUser } from "../middlewares/auth.middleware.js";
import {
  createSession,
  getAllActiveSessions,
  getAllCompletedSessions,
  getSessionById,
  joinSession,
  endSession,
} from "../controllers/session.controller.js";

const sessionRouter = express.Router();

sessionRouter.post("/", authorizeUser, createSession);

sessionRouter.get("/active", authorizeUser, getAllActiveSessions);

sessionRouter.get("/completed", authorizeUser, getAllCompletedSessions);

sessionRouter.get("/:id", authorizeUser, getSessionById);

sessionRouter.post("/:id/join", authorizeUser, joinSession);

sessionRouter.post("/:id/end", authorizeUser, endSession);

export default sessionRouter;
