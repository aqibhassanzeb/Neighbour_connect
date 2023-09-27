import mongoose from "mongoose";

const UserReportSchema = new mongoose.Schema(
  {
    reported_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    reports: [
      { email: String, reason: String, date: String, optional_note: String },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserReport = mongoose.model("user_report", UserReportSchema);
