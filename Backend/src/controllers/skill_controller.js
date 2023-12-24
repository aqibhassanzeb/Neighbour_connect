import { Skill } from "../models/skill.js";
import { User } from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";
import {
  calculateDistance,
  checkIfUserInConnections,
  convertRangeToMeters,
  isObjectEmpty,
} from "../utils/index.js";
import { Activity } from "../models/activity.js";
import { getDistance } from "geolib";

export const addSkill = async (req, res) => {
  const already = await Skill.findOne({
    posted_by: req.body.posted_by,
    category: req.body.category,
  });
  if (already) {
    return res.status(400).send("Skill Already Posted");
  }
  const days = JSON.parse(req.body.days);
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
      days,
      images,
    });

    const posted = await post.save();
    if (posted) {
      await Activity.create({
        posted_by: posted.posted_by,
        description: "skill sharing",
        post_id: posted._id,
        title: "",
        visibility: posted.selected_visibility,
        image: images[0],
        post_type: "skill",
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
  let { address_range, address, _id } = req.user;
  const addressRange = parseInt(address_range) * 1000;
  const catId = req.params.catId;
  try {
    const posts = await Skill.find({ category: catId })
      .sort({ createdAt: -1 })
      .populate("category")
      .populate(
        "posted_by",
        "name email image connections address address_range endorse_count endorsed_by"
      );

    const postsWithinRange = posts.filter((post) => {
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

        return distance <= addressRange;
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
    res.status(500).json({ error: "Error fetching posts by category" });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const posts = await Skill.find({ is_active: true })
      .populate("posted_by", "name email image endorse_count endorsed_by")
      .populate("category");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching skills " });
  }
};

export const getAllDeletedSkills = async (req, res) => {
  try {
    const posts = await Skill.find({ is_active: false })
      .populate("posted_by", "name email image endorse_count endorsed_by")
      .populate("category");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching skills " });
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
