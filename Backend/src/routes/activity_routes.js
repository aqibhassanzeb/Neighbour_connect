import express from "express";
const routes = express.Router();
import { userActivites } from "../controllers/activites_controller.js";

// Neighbour Forum
routes.get("/user_activities/:id", userActivites);

export default routes;
