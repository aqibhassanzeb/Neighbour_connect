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
    location: {
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
      name: {
        type: String,
      },
    },
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
  },
  { timestamps: true }
);

export const lostandFound = mongoose.model("lost_found", lostFound);
