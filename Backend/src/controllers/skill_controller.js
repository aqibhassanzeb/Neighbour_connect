import { Skill } from "../models/skill.js";
import { User } from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";
import { calculateDistance, isObjectEmpty } from "../utils/index.js";
import { Activity } from "../models/activity.js";

export const addSkill = async (req, res) => {
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

    const post = new Skill({
      ...req.body,
      location,
      images,
    });

    const posted = await post.save();
    if (posted) {
      await Activity.create({
        posted_by: posted.posted_by,
        description: "skill sharing",
        post_id: posted._id,
        title: "",
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

export const updateSkill = async (req, res) => {
  const { _id } = req.params;

  try {
    await Skill.findByIdAndUpdate({ _id }, req.body);
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

    const response = await Skill.findByIdAndUpdate(
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

export const deleteSkill = async (req, res) => {
  const { _id } = req.params;

  try {
    await Skill.findByIdAndDelete({ _id });
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const getSkillsByCat = async (req, res) => {
  let { address_range, address } = req.user;
  let { latitude, longitude } = address;
  const { _id } = req.params;

  try {
    const posts = await Skill.find({ category: _id })
      .populate("category")
      .populate("posted_by", "name image address endorse_count endorsed_by");
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
    console.log(error);
    res.status(500).json({ error: "Error fetching posts by category" });
  }
};

export const getSkillsByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const posts = await Skill.find({ posted_by: user_id })
      .populate("posted_by", "name image endorse_count endorsed_by")
      .populate("category");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts by user" });
  }
};

export const increaseEndorse = async (req, res) => {
  const { _id } = req.params;
  const user_id = req.user._id;
  try {
    const endorsed_user = await User.findById(_id);
    if (!endorsed_user) {
      return res.status(404).json({ eroor: "Endorsing user not found" });
    }
    endorsed_user.endorsed_by.push(user_id);
    endorsed_user.endorse_count += 1;

    await endorsed_user.save();

    return res.status(200).json({ message: "Endorsement successful" });
  } catch (error) {
    console.error("Error endorsing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const UnEndorse = async (req, res) => {
  const { _id } = req.params;
  const user_id = req.user._id;

  try {
    const endorsed_user = await User.findById(_id);
    if (!endorsed_user) {
      return res.status(404).json({ eroor: "Endorsing user not found" });
    }
    const index = endorsed_user.endorsed_by.indexOf(user_id);
    if (index !== -1) {
      endorsed_user.endorsed_by.splice(index, 1);
    }
    endorsed_user.endorse_count -= 1;

    await endorsed_user.save();

    return res.status(200).json({ message: "UnEndorsement successful" });
  } catch (error) {
    console.error("Error endorsing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
