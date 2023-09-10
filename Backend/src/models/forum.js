import mongoose from "mongoose";

const forumSchema = new mongoose.Schema(
  {
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    topic: {
      type: String,
      index: true,
    },
    description: String,
    is_active: {
      type: Boolean,
      default: true,
    },
    replies: [
      {
        reply_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        text: String,
      },
    ],
  },
  { timestamps: true }
);

export const Forum = mongoose.model("neighbour-forum", forumSchema);
