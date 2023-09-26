import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  addReport,
  addUserReport,
  getPostReports,
  getUserReports,
} from "../controllers/report_conroller.js";

// Neighbour Forum
routes.post("/report", protect, addReport);
routes.get("/reports", getPostReports);
routes.post("/user_report", protect, addUserReport);
routes.get("/user_reports", getUserReports);

export default routes;
