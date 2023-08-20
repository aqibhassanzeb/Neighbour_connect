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
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sell-category",
      required: true,
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
  },
  { timestamps: true }
);
export const Sell = mongoose.model("sell", sellSchema);
