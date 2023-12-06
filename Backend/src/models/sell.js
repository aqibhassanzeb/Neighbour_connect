import mongoose from "mongoose";
const sellSchema = new mongoose.Schema(
  {
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sell-category",
      required: true,
    },
    location: String,
    description: {
      type: String,
    },
    images: {
      type: [],
    },
    price: {
      type: String,
    },

    is_sold: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    selected_visibility: {
      type: String,
    },
    result_from: {
      type: String,
      default: "sell zone",
    },
  },
  { timestamps: true }
);
export const Sell = mongoose.model("sell", sellSchema);
