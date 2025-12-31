import { Inngest } from "inngest";
import User from "../models/user.model.js";

export const inngest = new Inngest({ id: "kyocode" });

const syncUserCreated = inngest.createFunction(
  { id: "sync-user-created" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    await User.create({
      clerkID: id,
      name: [first_name, last_name].filter(Boolean).join(" ").trim(),
      email: email_addresses[0].email_address,
      profileImage: image_url,
    });
  }
);

const syncUserDeleted = inngest.createFunction(
  { id: "sync-user-deleted" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await User.deleteOne({ clerkID: id });
  }
);

export const functions = [syncUserCreated, syncUserDeleted];
