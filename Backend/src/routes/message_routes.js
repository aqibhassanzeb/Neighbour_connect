import express from "express";
const routes = express.Router();
import multer from "multer";
import { protect } from "../middleware/user_middleware.js";
import {
  deleteMessages,
  fetchMessages,
  postMessage,
  userDetails,
} from "../controllers/message_controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

//endpoint to post Messages and store it in the backend
routes.post("/messages", upload.single("imageFile"), postMessage);

///endpoint to get the userDetails to design the chat Room header
routes.get("/user/:userId", userDetails);

//endpoint to fetch the messages between two users in the chatRoom
routes.get("/messages/:senderId/:recepientId", fetchMessages);

//endpoint to delete the messages!
routes.post("/delete_messages", deleteMessages);

export default routes;
