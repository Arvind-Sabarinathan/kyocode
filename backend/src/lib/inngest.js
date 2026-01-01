import { Inngest } from "inngest";
import User from "../models/user.model.js";
import { upsertStreamUser, deleteStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "kyocode" });

const syncUserCreated = inngest.createFunction(
  { id: "sync-user-created" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    try {
      await User.findOneAndUpdate(
        { clerkID: id },
        {
          clerkID: id,
          name: [first_name, last_name].filter(Boolean).join(" ").trim(),
          email: email_addresses[0].email_address,
          profileImage: image_url,
        },
        { upsert: true, new: true }
      );

      await upsertStreamUser({
        id: id,
        name: [first_name, last_name].filter(Boolean).join(" ").trim(),
        image: image_url,
      });
    } catch (error) {
      console.error("Failed to sync created user:", id, error);
      throw error;
    }
  }
);

const syncUserDeleted = inngest.createFunction(
  { id: "sync-user-deleted" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    try {
      await User.deleteOne({ clerkID: id });

      await deleteStreamUser(id);
    } catch (error) {
      console.error("Failed to sync deleted user:", id, error);
      throw error;
    }
  }
);

export const functions = [syncUserCreated, syncUserDeleted];
