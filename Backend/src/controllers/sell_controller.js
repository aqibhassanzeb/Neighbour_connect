import { Sell } from "../models/sell.js";
import { v2 as cloudinary } from "cloudinary";
import {
  calculateDistance,
  checkIfUserInConnections,
  convertRangeToMeters,
} from "../utils/index.js";
import { Activity } from "../models/activity.js";
import { getDistance } from "geolib";

export const addSell = async (req, res) => {
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
      images,
    });

    const posted = await post.save();
    if (posted) {
      await Activity.create({
        posted_by: posted.posted_by,
        description: "neighbor trade",
        post_id: posted._id,
        title: posted.title,
        visibility: posted.selected_visibility,
        image: images[0],
        post_type: "sell",
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
  const addressRange = parseInt(address_range) * 1000;

  try {
    const items = await Sell.find({ category: _id })
      .populate("category")
      .populate("posted_by", "name address address_range image");

    const postsWithinRange = items.filter((post) => {
      const { selected_visibility } = post;
      if (post.posted_by._id.toString() === _id.toString()) {
        return true;
      } else if (selected_visibility.trim() === "Neighborhood") {
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
      } else if (selected_visibility.trim() === "Connection") {
        const connected = checkIfUserInConnections(
          _id,
          post.posted_by.connections
        );
        return connected ? true : false;
      }
    });

    res.json(postsWithinRange);
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

export const markAvailable = async (req, res) => {
  const { _id } = req.params;
  try {
    const available = await Sell.findByIdAndUpdate(
      _id,
      { is_sold: false },
      { new: true }
    );
    if (available) {
      return res.status(200).json(available);
    }
  } catch (error) {
    console.error("Error Solding:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllItems = async (req, res) => {
  let { address_range, address, _id } = req.user;

  const addressRange = parseInt(address_range) * 1000;

  try {
    const items = await Sell.find({ is_active: true })
      .sort({ createdAt: -1 })
      .populate(
        "posted_by",
        "name email image connections address address_range"
      )
      .populate("category");

    const postsWithinRange = items.filter((post) => {
      const { selected_visibility } = post;
      if (post.posted_by._id.toString() === _id.toString()) {
        return true;
      } else if (selected_visibility.trim() === "Neighborhood") {
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
      } else if (selected_visibility.trim() === "Connection") {
        const connected = checkIfUserInConnections(
          _id,
          post.posted_by.connections
        );
        return connected ? true : false;
      }
    });

    res.json(postsWithinRange);
  } catch (error) {
    console.log("Error fetching posts", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

export const getAllItemsAdmin = async (req, res) => {
  try {
    const items = await Sell.find({ is_active: true })
      .sort({ createdAt: -1 })
      .populate("posted_by", "name email address image")
      .populate("category");

    res.json(items);
  } catch (error) {
    console.log("Error fetching posts", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};
export const getAllItemsDeleted = async (req, res) => {
  try {
    const items = await Sell.find({ is_active: false })
      .sort({ createdAt: -1 })
      .populate("posted_by", "name email address image")
      .populate("category");

    res.json(items);
  } catch (error) {
    console.log("Error fetching posts", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};
