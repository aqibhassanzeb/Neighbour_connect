import mongoose from "mongoose";
const skillSchema = new mongoose.Schema(
  {
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "skill-category",
      required: true,
    },
    location: String,
    skill_level: {
      type: String,
    },
    description: {
      type: String,
    },
    images: {
      type: [],
    },
    days: {
      type: [],
    },
    price: {
      type: String,
    },
    price_unit: {
      type: String,
    },
    selected_visibility: {
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
export const Skill = mongoose.model("skill", skillSchema);
