
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import Database from "better-sqlite3";
import path from "node:path";
import clientPromise from "@/lib/mongodb";

async function resolveDatabase() {
  // Prefer MongoDB Atlas when reachable (preserves existing behaviour).
  if (clientPromise) {
    try {
      const client = await Promise.race([
        clientPromise,
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("MongoDB timeout")), 6000)
        ),
      ]);
      // Verify the connection is actually usable before handing it to auth.
      await client.db(process.env.MONGODB_DB_NAME || "bazar_dor").command({ ping: 1 });
      const db = client.db(process.env.MONGODB_DB_NAME || "bazar_dor");
      console.log("[auth] using MongoDB adapter");
      return mongodbAdapter(db, { client });
    } catch (error) {
      console.warn(
        "[auth] MongoDB unreachable, falling back to local SQLite:",
        error instanceof Error ? error.message : error
      );
    }
  } else {
    console.warn("[auth] MONGODB_URI not set, using local SQLite");
  }

  // Offline-safe fallback so email signup/signin always works in dev.
  // File name matches .gitignore (better-auth.sqlite).
  const sqlitePath =
    process.env.BETTER_AUTH_SQLITE_PATH ||
    path.join(process.cwd(), "better-auth.sqlite");
  const sqlite = new Database(sqlitePath);
  sqlite.pragma("journal_mode = WAL");
  console.log(`[auth] using SQLite adapter (${sqlitePath})`);
  return sqlite;
}

const database = await resolveDatabase();

export const auth = betterAuth({
  database: database as never,

  baseURL:
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000",

  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
});
