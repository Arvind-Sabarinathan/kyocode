import { config } from "dotenv";

config({
  path: `.env`,
  quiet: true,
});

export const {
  PORT,
  NODE_ENV,
  DB_URL,
  CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY,
  INNGEST_EVENT_KEY,
  INNGEST_SIGNING_KEY,
  STREAM_API_KEY,
  STREAM_API_SECRET,
  CLIENT_URL,
} = process.env;
