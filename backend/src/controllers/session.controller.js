import Session from "../models/session.model.js";
import { streamClient, chatClient } from "../lib/stream.js";

export const createSession = async (req, res) => {
  try {
    // get problem and difficulty from request body
    const { problem, difficulty } = req.body;
    const userID = req.user._id;
    const clerkID = req.user.clerkID;

    // validate problem and difficulty
    if (!problem || !difficulty) {
      return res.status(400).json({ message: "Missing Problem or Difficulty" });
    }

    // generate a unique call ID for stream video
    const callID = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;

    // create session in database
    const session = await Session.create({
      problem,
      difficulty,
      host: userID,
      callID,
    });

    // create stream video call
    await streamClient.video.call("default", callID).getOrCreate({
      data: {
        created_by_id: clerkID,
        custom: { problem, difficulty, session_id: session._id.toString() },
      },
    });

    // create chat channel
    const channel = chatClient.channel("messaging", callID, {
      name: `${callID} Session`,
      created_by_id: clerkID,
      members: [{ id: clerkID }],
    });

    await channel.create();

    return res.status(201).json({ session });
  } catch (error) {
    console.log("Failed to create session", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllActiveSessions = async (req, res) => {};

export const getAllCompletedSessions = async (req, res) => {};

export const getSessionById = async (req, res) => {};

export const joinSession = async (req, res) => {};

export const endSession = async (req, res) => {};
