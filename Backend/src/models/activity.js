import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: String,
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "post_type",
      required: true,
    },
    post_type: {
      type: String,
      enum: [
        "lost_found",
        "sell",
        "neighbour-watch",
        "skill",
        "neighbour-forum",
      ],
      required: true,
    },
    description: String,
    visibility: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

export const Activity = mongoose.model("activity", activitySchema);
