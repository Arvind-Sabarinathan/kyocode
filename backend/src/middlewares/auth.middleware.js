import { requireAuth } from "@clerk/express";
import User from "../models/user.model.js";

export const authorizeUser = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkID = req.auth.userId;

      if (!clerkID) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await User.findOne({ clerkID });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;

      next();
    } catch (error) {
      console.log("Error in authorizeUser middleware", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
