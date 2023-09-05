import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    description: String,
    post_id: String,
    title: String,
  },
  {
    timestamps: true,
  }
);

export const Activity = mongoose.model("activity", activitySchema);
