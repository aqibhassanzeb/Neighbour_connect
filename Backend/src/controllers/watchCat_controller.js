import { WatchCategory } from "../models/watch_category.js";

export const watchCatCreate = async (req, res) => {
  const { name } = req.body;
  try {
    const already = await WatchCategory.findOne({ name });
    if (already) {
      return res.status(422).json({ message: "already registered" });
    }

    const category = new WatchCategory({ name });
    await category.save();

    res.status(200).json({ message: "created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Faild to create category" });
  }
};

export const watchCatUpdate = async (req, res) => {
  const { _id } = req.params;

  try {
    await WatchCategory.findByIdAndUpdate({ _id }, req.body);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const watchCatGet = async (req, res) => {
  let filter = { is_active: true };
  if (req.query._id) {
    filter = { _id: req.query._id.split(","), is_active: true };
  }
  try {
    const result = await WatchCategory.find(filter);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};
export const watchCatDelete = async (req, res) => {
  const { _id } = req.params;

  try {
    await WatchCategory.findByIdAndDelete({ _id });
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};
