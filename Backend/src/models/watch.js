import mongoose from "mongoose";
const watchSchema = new mongoose.Schema(
  {
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "watch-category",
      required: true,
    },
    location: String,
    description: {
      type: String,
    },
    media: {
      type: [],
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    selected_visibility: {
      type: String,
      required: true,
    },
    helpful_count: {
      type: Number,
      default: 0,
    },
    helpful_by: {
      type: [],
    },
    notify: {
      type: Boolean,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
export const Watch = mongoose.model("neighbour-watch", watchSchema);
