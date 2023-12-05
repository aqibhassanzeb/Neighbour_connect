import { lostandFound } from "../models/lost_found.js";
import { Activity } from "../models/activity.js";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { getDistance } from "geolib";
import {
  checkIfUserInConnections,
  convertRangeToMeters,
} from "../utils/index.js";

export const lostandfound_Create = async (req, res) => {
  const location = JSON.parse(req.body.location);
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return res.status(422).json({ error: "please fill the field " });
  }
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  try {
    const uploadedImages = [];

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              reject(error);
            } else {
              uploadedImages.push(result);
              resolve();
            }
          }
        );

        uploadStream.end(file.buffer);
      });
    });

    await Promise.all(uploadPromises);
    const images = uploadedImages.map((item) => item.secure_url);
    const lostfound = new lostandFound({
      ...req.body,
      posted_by: req.user?._id,
      location,
      gallary_images: images,
    });
    let item = await lostfound.save();
    if (item) {
      await Activity.create({
        posted_by: item.posted_by,
        description: "lost & found",
        post_id: item._id,
        title: item.title,
        visibility: item.visibility,
        image: images[0],
        post_type: "lost_found",
      });
      res.status(200).json({ message: "uploaded successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: "something went wrong!" });
  }
};
export const updateImages = async (req, res) => {
  const { _id } = req.params;
  const { oldImages } = req.body;
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  try {
    let parsed_images = [];
    if (Array.isArray(oldImages)) {
      parsed_images = oldImages.map((media) => JSON.parse(media));
    }

    const uploadedImages = [...parsed_images];

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              reject(error);
            } else {
              uploadedImages.push(result);
              resolve();
            }
          }
        );

        uploadStream.end(file.buffer);
      });
    });

    await Promise.all(uploadPromises);
    const updated_images = uploadedImages.map((item) => item.secure_url);

    if (typeof oldImages === "string") {
      const parseImage = JSON.parse(oldImages);
      updated_images.push(parseImage);
    }

    const response = await lostandFound.findByIdAndUpdate(
      _id,
      { $set: { gallary_images: updated_images } },
      { new: true }
    );
    if (response) {
      return res.status(200).json({ message: "updated successfully" });
    }
  } catch (error) {
    console.error("Error updating :", error);
    return res.status(500).send("Error uploading images.");
  }
};

export const lostandfound_Update = async (req, res) => {
  const { _id } = req.params;

  try {
    await lostandFound.findByIdAndUpdate({ _id }, req.body);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};
export const lostandfound_Get = async (req, res) => {
  let filter = { is_active: true };
  if (req.query._id) {
    filter._id = req.query._id.split(",");
  }
  if (req.query.type) {
    filter.type = req.query.type.split(",");
  }
  if (req.query.category) {
    filter.category = req.query.category;
  }
  if (req.query.title) {
    filter.title = req.query.title;
  }
  if (req.query.posted_by) {
    filter.posted_by = req.query.posted_by;
  }
  try {
    const result = await lostandFound
      .find(filter)
      .populate("posted_by", "-password")
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: result, count: result.length });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};
export const lostandfound_Deleted_Get = async (req, res) => {
  let filter = { is_active: false };
  if (req.query._id) {
    filter._id = req.query._id.split(",");
  }
  if (req.query.type) {
    filter.type = req.query.type.split(",");
  }
  if (req.query.category) {
    filter.category = req.query.category;
  }
  if (req.query.title) {
    filter.title = req.query.title;
  }
  if (req.query.posted_by) {
    filter.posted_by = req.query.posted_by;
  }
  try {
    const result = await lostandFound
      .find(filter)
      .populate("posted_by", "-password")
      .populate("category");

    res.status(200).json({ data: result, count: result.length });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const lostandfoundLoc_Get = async (req, res) => {
  let filter = { is_active: true, type: req.query.type };
  if (req.query.category !== "undefined") {
    filter.category = req.query.category;
  }
  try {
    let { address_range, address, _id } = req.user;
    const addressRange = parseInt(address_range) * 1000;
    const result = await lostandFound
      .find(filter)
      .populate("posted_by", "-password")
      .populate("category")
      .sort({ createdAt: -1 });

    const postsWithinRange = result.filter((post) => {
      const { visibility } = post;
      if (visibility.trim() === "neighborhood") {
        const distance = getDistance(
          {
            latitude: parseFloat(address.latitude),
            longitude: parseFloat(address.longitude),
          },
          {
            latitude: parseFloat(post.posted_by.address.latitude),
            longitude: parseFloat(post.posted_by.address.longitude),
          }
        );
        const PostedUserRange = convertRangeToMeters(
          post.posted_by.address_range
        );
        return distance <= addressRange && distance <= PostedUserRange;
      } else if (visibility.trim() === "connection") {
        const connected = checkIfUserInConnections(
          _id,
          post.posted_by.connections
        );
        return connected ? true : false;
      }
    });

    res
      .status(200)
      .json({ data: postsWithinRange, count: postsWithinRange.length });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const lostandfound_Delete = async (req, res) => {
  const { _id } = req.params;

  try {
    await lostandFound.findByIdAndDelete({ _id });
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

function calculateDistanceInKm(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;
  return distance;
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}
