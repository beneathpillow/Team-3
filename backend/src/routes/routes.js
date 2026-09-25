// The top-level router, which contains all routes for the backend.

import express from "express";

const router = express.Router();

// Requests to paths starting with /api are handled by the router in api/api.js
import apiRoutes from "./api/api.js";
router.use("/api", apiRoutes);

export default router;
