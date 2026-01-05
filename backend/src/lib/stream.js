import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { STREAM_API_KEY, STREAM_API_SECRET } from "./env.js";

if (!STREAM_API_KEY || !STREAM_API_SECRET) {
  throw new Error("Missing Stream API key or secret");
}

export const chatClient = StreamChat.getInstance(
  STREAM_API_KEY,
  STREAM_API_SECRET
);

export const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Stream user upserted successfully: ", userData.id);
  } catch (error) {
    console.error("Error upserting stream user", error);
    throw error;
  }
};

export const deleteStreamUser = async (userID) => {
  try {
    await chatClient.deleteUser(userID);
    console.log("Stream user deleted successfully: ", userID);
  } catch (error) {
    console.error("Error deleting stream user", error);
    throw error;
  }
};
