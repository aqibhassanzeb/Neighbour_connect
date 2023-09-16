import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    deleted_notifications: [],
    settings: {
      type: String,
      default: "lost=true&suspicious=true&sell=true&forum=true",
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model("notification", notificationSchema);
