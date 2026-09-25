// Connects to the MongoDB database, using Mongoose.

import mongoose from "mongoose";

/**
 * Connects to MongoDB, using the connection string in the MONGODB_URI environment variable
 * (set in backend/.env).
 *
 * Once connected, any Mongoose models (e.g. in the data/models folder) can be used to read from and
 * write to the database.
 *
 * Throws an error if MONGODB_URI isn't set, or if the connection fails.
 */
export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to backend/.env");
  }

  // Give up after 5 seconds if MongoDB can't be reached (the default is 30 seconds)
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

  // Log the database name and host, but not the full connection string, which may contain a password
  const { name, host, port } = mongoose.connection;
  console.log(`Connected to MongoDB database "${name}" at ${host}:${port}`);
}
