import mongoose from "mongoose";
const watchCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
export const WatchCategory = mongoose.model(
  "watch-category",
  watchCategorySchema
);
