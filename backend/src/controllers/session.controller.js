import Session from "../models/session.model.js";
import { streamClient, chatClient } from "../lib/stream.js";
import crypto from "crypto";

export const createSession = async (req, res) => {
  try {
    // ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // extract input and user identifiers
    const { problem, difficulty } = req.body;
    const userID = req.user._id;
    const clerkID = req.user.clerkID;

    // validate required fields
    if (!problem || !difficulty) {
      return res.status(400).json({ message: "Missing problem or difficulty" });
    }

    // generate a unique call identifier
    const callID = `session_${crypto.randomUUID()}`;

    // create session record in database
    const session = await Session.create({
      problem,
      difficulty,
      host: userID,
      callID,
    });

    // create or fetch stream video call
    await streamClient.video.call("default", callID).getOrCreate({
      data: {
        created_by_id: clerkID,
        custom: {
          problem,
          difficulty,
          session_id: session._id.toString(),
        },
      },
    });

    // create stream chat channel for the session
    const channel = chatClient.channel("messaging", callID, {
      name: `${callID} Session`,
      created_by_id: clerkID,
      members: [{ id: clerkID }],
    });

    await channel.create();

    // return newly created session
    return res.status(201).json({ session });
  } catch (error) {
    console.error("Failed to create session", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllActiveSessions = async (_, res) => {
  try {
    // fetch latest active sessions
    const sessions = await Session.find({ status: "active" })
      .populate("host", "clerkID name email profileImage")
      .sort({ createdAt: -1 })
      .limit(20);

    // return active sessions
    return res.status(200).json({ sessions });
  } catch (error) {
    console.error("Failed to get active sessions", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllCompletedSessions = async (req, res) => {
  try {
    // ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // extract current user id
    const userID = req.user._id;

    // fetch completed sessions involving the user
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userID }, { participant: userID }],
    })
      .populate("host", "clerkID name email profileImage")
      .populate("participant", "clerkID name email profileImage")
      .sort({ createdAt: -1 })
      .limit(20);

    // return completed sessions
    return res.status(200).json({ sessions });
  } catch (error) {
    console.error("Failed to get completed sessions", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSessionById = async (req, res) => {
  try {
    // extract session id from params
    const { id } = req.params;

    // fetch session with populated users
    const session = await Session.findById(id)
      .populate("host", "clerkID name email profileImage")
      .populate("participant", "clerkID name email profileImage");

    // handle missing session
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // return session details
    return res.status(200).json({ session });
  } catch (error) {
    console.error("Failed to get session by id", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const joinSession = async (req, res) => {
  try {
    // ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // extract identifiers
    const { id } = req.params;
    const userID = req.user._id;
    const clerkID = req.user.clerkID;

    // fetch session to validate state and host
    const existingSession = await Session.findById(id).populate("host", "_id");

    if (!existingSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    // ensure session is active
    if (existingSession.status !== "active") {
      return res.status(400).json({ message: "Session is not active" });
    }

    // prevent host from joining as participant
    if (existingSession.host._id.toString() === userID.toString()) {
      return res
        .status(400)
        .json({ message: "Host cannot join as participant" });
    }

    // atomically assign participant if available
    const session = await Session.findOneAndUpdate(
      { _id: id, participant: null, status: "active" },
      { participant: userID },
      { new: true }
    )
      .populate("host", "clerkID name email profileImage")
      .populate("participant", "clerkID name email profileImage");

    // handle race condition where session was already joined
    if (!session) {
      return res.status(409).json({ message: "Session already joined" });
    }

    // add participant to stream chat channel
    const channel = chatClient.channel("messaging", session.callID);
    await channel.addMembers([clerkID]);

    // return updated session
    return res.status(200).json({ session });
  } catch (error) {
    console.error("Failed to join session", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const endSession = async (req, res) => {
  try {
    // ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // extract identifiers
    const { id } = req.params;
    const userID = req.user._id;

    // fetch session by id
    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // ensure only host can end the session
    if (session.host.toString() !== userID.toString()) {
      return res.status(403).json({ message: "Only host can end the session" });
    }

    // prevent duplicate completion
    if (session.status === "completed") {
      return res.status(400).json({ message: "Session already completed" });
    }

    // mark session as completed in database
    session.status = "completed";
    await session.save();

    // clean up stream resources without blocking response
    try {
      const call = streamClient.video.call("default", session.callID);
      await call.delete({ hard: true });

      const channel = chatClient.channel("messaging", session.callID);
      await channel.delete();
    } catch (streamError) {
      console.error("Stream cleanup failed", streamError);
    }

    // return completed session
    return res.status(200).json({ session });
  } catch (error) {
    console.error("Failed to end session", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
