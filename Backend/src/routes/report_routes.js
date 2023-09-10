import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import { addReport } from "../controllers/report_conroller.js";

// Neighbour Forum
routes.post("/report", protect, addReport);

export default routes;
