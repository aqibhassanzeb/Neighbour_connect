import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    report_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    post_id: String,
    module: String,
    report_type: String,
    optional_note: String,
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model("report", reportSchema);
