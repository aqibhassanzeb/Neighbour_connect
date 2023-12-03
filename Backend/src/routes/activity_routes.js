import express from "express";
const routes = express.Router();
import {
  searchAll,
  userActivites,
} from "../controllers/activites_controller.js";
import { protect } from "../middleware/user_middleware.js";

// Neighbour Forum
routes.get("/user_activities/:id", userActivites);

// Search APi
routes.get("/search", protect, searchAll);

export default routes;
