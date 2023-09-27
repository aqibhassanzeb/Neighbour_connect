import { Watch } from "../models/watch.js";
import { v2 as cloudinary } from "cloudinary";
import { calculateDistance, isObjectEmpty } from "../utils/index.js";
import { Activity } from "../models/activity.js";

export const addWatch = async (req, res) => {
  const location = JSON.parse(req.body?.location);
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  try {
    const uploaded_media = [];

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              reject(error);
            } else {
              uploaded_media.push(result);
              resolve();
            }
          }
        );

        uploadStream.end(file.buffer);
      });
    });

    await Promise.all(uploadPromises);
    const media = uploaded_media.map((item) => {
      return {
        media_type: item.resource_type,
        source: item.secure_url,
      };
    });

    const post = new Watch({
      ...req.body,
      location,
      media,
    });

    const posted = await post.save();
    if (posted) {
      await Activity.create({
        posted_by: posted.posted_by,
        description: "suspicious activity",
        post_id: posted._id,
        title: posted.title,
        visibility: posted.selected_visibility,
        image: media[0].source,
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

export const updateWatch = async (req, res) => {
  const { _id } = req.params;
  try {
    await Watch.findByIdAndUpdate({ _id }, req.body);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const updateMedia = async (req, res) => {
  const { _id } = req.params;
  const { oldMedia } = req.body;
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  try {
    let parsed_media = [];
    let parse_single = {};
    if (Array.isArray(oldMedia)) {
      parsed_media = oldMedia.map((media) => JSON.parse(media));
    } else if (typeof oldMedia === "object") {
      parse_single = JSON.parse(oldMedia);
    }

    const uploaded_media = [...parsed_media];

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              reject(error);
            } else {
              uploaded_media.push(result);
              resolve();
            }
          }
        );

        uploadStream.end(file.buffer);
      });
    });

    await Promise.all(uploadPromises);
    const media = uploaded_media.map((item) => {
      return {
        media_type: item.resource_type,
        source: item.secure_url,
      };
    });

    if (!isObjectEmpty(parse_single)) {
      media.push(parse_single);
    }

    const response = await Watch.findByIdAndUpdate(
      _id,
      { $set: { media } },
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

export const deleteWatch = async (req, res) => {
  const { _id } = req.params;

  try {
    await Watch.findByIdAndDelete({ _id });
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const getWatchByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const posts = await Watch.find({ posted_by: user_id })
      .sort({ createdAt: -1 })
      .populate("posted_by", "name image helpful_count")
      .populate("category");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts by user" });
  }
};

export const getAllWatch = async (req, res) => {
  let { address_range, address } = req.user;
  let { latitude, longitude } = address;

  try {
    const posts = await Watch.find({ is_active: true })
      .sort({ createdAt: -1 })
      .populate("posted_by", "name email image helpful_count address")
      .populate("category");

    const filtered_array = posts.filter((item) => {
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

export const increaseHelpful = async (req, res) => {
  const { _id } = req.params;
  const user_id = req.user._id;
  try {
    const post = await Watch.findById(_id);
    if (!post) {
      return res.status(404).json({ eroor: "The user who post not found" });
    }
    post.helpful_by.push(user_id);
    post.helpful_count += 1;

    await post.save();

    return res.status(200).json({ message: "Helpful success" });
  } catch (error) {
    console.error("Error helpful post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const decreaseHelpful = async (req, res) => {
  const { _id } = req.params;
  const user_id = req.user._id;

  try {
    const post = await Watch.findById(_id);
    if (!post) {
      return res.status(404).json({ eroor: "Posting user not found" });
    }
    const index = post.helpful_by.indexOf(user_id);
    if (index !== -1) {
      post.helpful_by.splice(index, 1);
    }
    post.helpful_count -= 1;

    await post.save();

    return res.status(200).json({ message: "Unhelpful successful" });
  } catch (error) {
    console.error("Error unhelpful post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
