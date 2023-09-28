import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["admin", "user"],
    },
    email: {
      type: String,
      required: true,
    },
    requests: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["pending", "accepted", "rejected"] },
      },
    ],
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    password: {
      type: String,
      required: true,
    },
    address: {
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
    },
    address_range: {
      type: String,
    },
    roport_status: {
      type: String,
    },
    endorse_count: {
      type: Number,
      default: 0,
    },
    endorsed_by: {
      type: [],
    },
    verification_code: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dbdxsvxda/image/upload/v1691754909/niegbour_proj/w6jwmnvwmvgj76z11dmj.png",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    detail: {
      type: String,
    },

    temp_email: {
      tyep: String,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    resetCode: String,
    expireToken: Date,
  },
  { timestamps: true }
);
export const User = mongoose.model("user", UserSchema);

const trackerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  login_time: Date,
});

export const Tracker = mongoose.model("login-tracker", trackerSchema);
