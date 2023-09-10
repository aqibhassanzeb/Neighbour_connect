import express from "express";
const routes = express.Router();
import {
  searchAll,
  userActivites,
} from "../controllers/activites_controller.js";

// Neighbour Forum
routes.get("/user_activities/:id", userActivites);

// Search APi
routes.get("/search", searchAll);

export default routes;
