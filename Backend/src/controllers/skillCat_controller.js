import { SkillCategory } from "../models/skill_category.js";
import { v2 as cloudinary } from "cloudinary";

export const skillCatCreate = async (req, res) => {
  const { name } = req.body;
  try {
    const already = await SkillCategory.findOne({ name });
    if (already) {
      return res.status(422).json({ message: "already registered" });
    }
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    const image_url = result.secure_url;
    const category = new SkillCategory({ name, image: image_url });
    await category.save();

    res.status(200).json({ message: "created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Faild to create category" });
  }
};
export const skillCatUpdate = async (req, res) => {
  const { _id } = req.params;

  try {
    await SkillCategory.findByIdAndUpdate({ _id }, req.body);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};
export const skillCatGet = async (req, res) => {
  let filter = { is_active: true };
  if (req.query._id) {
    filter = { _id: req.query._id.split(","), is_active: true };
  }
  try {
    const result = await SkillCategory.find(filter);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};
export const skillCatDelete = async (req, res) => {
  const { _id } = req.params;

  try {
    await SkillCategory.findByIdAndDelete({ _id });
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};
