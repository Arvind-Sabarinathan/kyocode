import { Inngest } from "inngest";
import User from "../models/user.model.js";
import { upsertStreamUser, deleteStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "kyocode" });

const syncUserCreated = inngest.createFunction(
  { id: "sync-user-created" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    await step.run("create-user-in-db", async () => {
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
    });

    await step.run("upsert-user-in-stream", async () => {
      await upsertStreamUser({
        id: id,
        name: [first_name, last_name].filter(Boolean).join(" ").trim(),
        image: image_url,
      });
    });
  }
);

const syncUserDeleted = inngest.createFunction(
  { id: "sync-user-deleted" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    const { id } = event.data;

    await step.run("delete-user-from-db", async () => {
      await User.deleteOne({ clerkID: id });
    });

    await step.run("delete-user-from-stream", async () => {
      await deleteStreamUser(id);
    });
  }
);

export const functions = [syncUserCreated, syncUserDeleted];
