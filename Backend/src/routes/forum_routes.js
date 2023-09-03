import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  addForum,
  addReply,
  deleteForum,
  deleteReply,
  getAllForums,
  getForumsByUser,
  updateForum,
} from "../controllers/forum_controller.js";

// Neighbour Forum
routes.post("/add_topic", addForum);
routes.put("/update_topic/:_id", updateForum);
routes.delete("/delete_topic/:_id", deleteForum);
routes.get("/topics/:user_id", getForumsByUser);
routes.get("/all_topics", protect, getAllForums);
routes.post("/add-reply/:forumId", addReply);
routes.delete("/delete-reply/:forumId/:replyId", deleteReply);

export default routes;
