import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  addDeleteNotifications,
  getSettings,
  updateSettings,
  userNotifications,
} from "../controllers/notification_controller.js";

// User Notification
routes.get("/user_notifications", protect, userNotifications);
routes.get("/notification_settings", protect, getSettings);
routes.put("/update_settings", protect, updateSettings);
routes.post("/deleted_notifications", protect, addDeleteNotifications);
// routes.get("/search", searchAll);

export default routes;
