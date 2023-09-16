import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as socketIo } from "socket.io";

dotenv.config();
import "./config.js";
import Auth from "./routes/auth_routes.js";
import lostandFound from "./routes/lostfound_routes.js";
import Skill from "./routes/skill_routes.js";
import Watch from "./routes/watch_routes.js";
import Sell from "./routes/sell_routes.js";
import MessageRoutes from "./routes/message_routes.js";
import Forum from "./routes/forum_routes.js";
import Activity from "./routes/activity_routes.js";
import Report from "./routes/report_routes.js";
import Notification from "./routes/notification_routes.js";
import { Message } from "./models/message.js";

const app = express();

const server = http.createServer(app);
const io = new socketIo(server);

//middelwares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
    defaultErrorHandler: false,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.static("public"));

//All APi's Endponits
app.use(
  "/api/v1",
  Auth,
  lostandFound,
  Skill,
  Watch,
  Sell,
  MessageRoutes,
  Forum,
  Activity,
  Report,
  Notification
);

app.use("*", (req, res) => {
  return res.status(404).json({
    message: "Backend is runing..",
  });
});

//REAL TIME CHAT
io.on("connection", (socket) => {
  console.log("User connected to socket:", socket.id);

  socket.on("join", (roomId) => {
    socket.join(roomId);
  });

  socket.on("message", async (roomId, message) => {
    try {
      const newMessage = new Message({
        senderId: message.senderId,
        recepientId: message.recepientId,
        messageType: message.messageType,
        message: message.messageText,
        timestamp: new Date(),
        imageUrl: message.messageType === "image" ? message.imageUrl : null,
      });
      await newMessage.save();
      io.to(roomId).emit("message", newMessage);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

//Port
const port = process.env.PORT || 3333;
const nodeServer = server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
