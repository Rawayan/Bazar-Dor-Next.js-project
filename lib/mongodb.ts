import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "bazar_dor";

if (!uri) {
  throw new Error(
    "Missing MONGODB_URI. Add it to .env.local (see .env.example)."
  );
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

function getMongoClient(): MongoClient {
  if (globalThis._mongoClient) {
    return globalThis._mongoClient;
  }

  const client = new MongoClient(uri as string);
  globalThis._mongoClient = client;
  return client;
}

export const mongoClient = getMongoClient();

export function getDb(): Db {
  return mongoClient.db(dbName);
}
