
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> | null {
  if (!uri) {
    return null;
  }
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });
  return client.connect();
}

const clientPromise =
  globalThis.__mongoClientPromise ?? createClientPromise();

if (clientPromise) {
  globalThis.__mongoClientPromise = clientPromise;
  // Prevent unhandled rejection crashing dev server when Atlas is
  // unreachable (IP not whitelisted, cluster paused, offline, ...).
  // Auth layer will fall back to SQLite in that case.
  clientPromise.catch(() => {});
}

export default clientPromise;
