import { Sell } from "../models/sell.js";
import { v2 as cloudinary } from "cloudinary";
import { calculateDistance } from "../utils/index.js";
import { Activity } from "../models/activity.js";

export const addSell = async (req, res) => {
  const location = JSON.parse(req.body.location);
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

    const post = new Sell({
      ...req.body,
      location,
      images,
    });

    const posted = await post.save();
    if (posted) {
      await Activity.create({
        posted_by: posted.posted_by,
        description: "neighbor trade",
        post_id: posted._id,
        title: posted.title,
      });
      return res
        .status(200)
        .json({ message: "Posted Successfully", data: posted });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error uploading post.");
  }
};

export const updateSell = async (req, res) => {
  const { _id } = req.params;

  try {
    await Sell.findByIdAndUpdate({ _id }, req.body);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const updateImages = async (req, res) => {
  const { _id } = req.params;
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
    const updated_images = uploadedImages.map((item) => item.secure_url);

    const response = await Sell.findByIdAndUpdate(
      _id,
      { $set: { images: updated_images } },
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

export const deleteSell = async (req, res) => {
  const { _id } = req.params;
  console.log(_id);

  try {
    await Sell.findByIdAndDelete({ _id });
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const getSellsByCat = async (req, res) => {
  const { _id } = req.params;
  let { address_range, address } = req.user;
  let { latitude, longitude } = address;

  try {
    const items = await Sell.find({ category: _id })
      .populate("category")
      .populate("posted_by", "name address image");
    const filtered_array = items.filter((item) => {
      if (
        item.selected_visibility === "Connections" &&
        req.user.connections.includes(item.posted_by._id)
      ) {
        return true;
      }
      const docLatitude = parseFloat(item.posted_by.address.latitude);
      const docLongitude = parseFloat(item.posted_by.address.longitude);
      const distanceInKm = calculateDistance(
        latitude,
        longitude,
        docLatitude,
        docLongitude
      );
      return distanceInKm <= parseFloat(address_range);
    });
    res.json(filtered_array);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching items by category" });
  }
};

export const getSellsByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const posts = await Sell.find({ posted_by: user_id })
      .sort({ createdAt: -1 })
      .populate("posted_by", "name image endorse_count endorsed_by")
      .populate("category");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts by user" });
  }
};

export const markSolded = async (req, res) => {
  const { _id } = req.params;
  try {
    const solded = await Sell.findByIdAndUpdate(
      _id,
      { is_sold: true },
      { new: true }
    );
    if (solded) {
      return res.status(200).json(solded);
    }
  } catch (error) {
    console.error("Error Solding:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllItems = async (req, res) => {
  let { address_range, address } = req.user;
  let { latitude, longitude } = address;

  try {
    const items = await Sell.find()
      .sort({ createdAt: -1 })
      .populate("posted_by", "name address image")
      .populate("category");

    const filtered_array = items.filter((item) => {
      if (
        item.selected_visibility === "Connections" &&
        req.user.connections.includes(item.posted_by._id)
      ) {
        return true;
      }
      const docLatitude = parseFloat(item.posted_by.address.latitude);
      const docLongitude = parseFloat(item.posted_by.address.longitude);
      const distanceInKm = calculateDistance(
        latitude,
        longitude,
        docLatitude,
        docLongitude
      );
      return distanceInKm <= parseFloat(address_range);
    });

    res.json(filtered_array);
  } catch (error) {
    console.log("Error fetching posts", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};
