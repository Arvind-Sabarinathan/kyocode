import express from "express";
import { getStreamToken } from "../controllers/chat.controller.js";
import { authorizeUser } from "../middlewares/auth.middleware.js";

const chatRouter = express.Router();

chatRouter.get("/token", authorizeUser, getStreamToken);

export default chatRouter;
