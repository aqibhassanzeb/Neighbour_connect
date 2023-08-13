import streamifier from "streamifier";
import { Skill } from "../models/skill.js";
import { v2 as cloudinary } from "cloudinary";

export const addSkill = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  try {
    const uploadedImages = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        const buffer = file.buffer;
        streamifier.createReadStream(buffer).pipe(upload_stream);
      });
      uploadedImages.push(result);
    }

    const images = uploadedImages.map((item) => item.secure_url);

    const post = new Skill({
      ...req.body,
      images,
    });

    const posted = await post.save();
    console.log(posted);
    if (posted) {
      return res
        .status(200)
        .json({ message: "Posted Successfully", data: posted });
    }
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    return res.status(500).send("Error uploading images.");
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
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  console.log(req.files);
  try {
    const uploadedImages = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        const buffer = file.buffer;
        streamifier.createReadStream(buffer).pipe(upload_stream);
      });
      uploadedImages.push(result);
    }

    const images = uploadedImages.map((item) => item.secure_url);

    const response = await Skill.findByIdAndUpdate({ _id }, images);
    if (response) {
      return res.status(200).json({ message: "updated successfully" });
    }
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    return res.status(500).send("Error uploading images.");
  }
};

export const deleteSkill = async (req, res) => {
  const { _id } = req.params;
  console.log(_id);

  try {
    await Skill.findByIdAndDelete({ _id });
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const getSkillsByCat = async (req, res) => {
  const { category_name } = req.params;
  const user_id = req.user._id;

  try {
    const posts = await Skill.find({
      category: category_name,
      $or: [
        { posted_by: user_id },
        {
          selected_visibility: "Connection",
          posted_by: { $in: req.user.connections },
        },
      ],
    });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching posts by category" });
  }
};

export const getSkillsByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const posts = await Skill.find({ posted_by: user_id }).populate(
      "posted_by",
      "name"
    );
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts by user" });
  }
};
