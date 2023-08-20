import mongoose from "mongoose";
const sellCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dbdxsvxda/image/upload/v1692023457/niegbour_proj/e5ff2ba2pxohexi7cnsx.png",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
export const SellCategory = mongoose.model("sell-category", sellCategorySchema);
