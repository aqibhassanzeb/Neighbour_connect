import mongoose from "mongoose";

const lostFound = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lostandfoundCateg",
      required: true,
    },
    gallary_images: {
      type: [],
    },
    location: String,
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    visibility: {
      type: String,
    },
    notify: {
      type: Boolean,
      default: false,
    },
    mark_found: {
      type: Boolean,
      default: false,
    },
    mark_found_date: {
      type: String,
    },
    mark_returned: {
      type: Boolean,
      default: false,
    },
    mark_returned_date: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    date: {
      type: String,
    },
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    result_from: {
      type: String,
      default: "lost & found",
    },
  },
  { timestamps: true }
);

export const lostandFound = mongoose.model("lost_found", lostFound);
