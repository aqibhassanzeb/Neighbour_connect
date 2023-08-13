import mongoose from "mongoose";
const skillCategorySchema = new mongoose.Schema(
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
export const SkillCategory = mongoose.model(
  "skill-category",
  skillCategorySchema
);
