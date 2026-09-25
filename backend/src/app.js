// Load environment variables (e.g. PORT and MONGODB_URI) from the .env file into process.env
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectToDatabase } from "./data/db.js";

// The port the server will listen on (3000, unless a different PORT is given in .env)
const PORT = process.env.PORT ?? 3000;

// Create the Express app
const app = express();

// Log every incoming request to the console, which is useful for debugging
app.use(morgan("combined"));

// Allow the frontend (running on localhost:5173) to send requests to this backend
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
  })
);

// Parse JSON request bodies, so they are available as req.body in our route handlers
app.use(express.json());

// Add all of our routes. These are defined in the routes folder, starting with routes.js
import routes from "./routes/routes.js";
app.use("/", routes);

// Connect to MongoDB before starting the server. If we can't connect, there's no point starting
// the server (our routes won't work without the database), so display an error and stop instead.
try {
  await connectToDatabase();
} catch (err) {
  console.error(`Could not connect to MongoDB: ${err.message}`);
  console.error("Make sure MongoDB is running, and that MONGODB_URI in backend/.env is correct.");
  process.exit(1);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
