import mongoose from "mongoose";
const skillSchema = new mongoose.Schema(
  {
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "skill-category",
      // required: true,
      type: String,
    },
    location: {
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
    },
    skill_level: {
      type: String,
    },
    description: {
      type: String,
    },
    images: {
      type: [],
    },
    time: {
      type: String,
    },
    price_per_hour: {
      type: String,
    },
    selected_day: [
      {
        type: String,
      },
    ],
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
