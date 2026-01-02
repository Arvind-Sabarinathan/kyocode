import { chatClient } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = chatClient.createToken(req.user.clerkID);

    return res.status(200).json({
      token,
      userID: req.user.clerkID,
      username: req.user.name,
      userImage: req.user.profileImage,
    });
  } catch (error) {
    console.log("Error in getStreamToken", error);
    return res.status(500).json({ error: error.message });
  }
};
