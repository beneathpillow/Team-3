// Router for all routes starting with /api.

import express from "express";

const router = express.Router();

// Add child routers here. For example, to handle all requests to paths starting with /api/things
// using a router defined in a new file called api-things.js:
//
// import thingRoutes from "./api-things.js";
// router.use("/things", thingRoutes);

export default router;
