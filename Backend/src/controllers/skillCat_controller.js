import { SkillCategory } from "../models/skill_category.js";

export const skillCatCreate = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(422).json({ error: "please fill the name " });
  }
  SkillCategory.findOne({ name })
    .then((already) => {
      if (already) {
        return res.status(422).json({ message: "already registered" });
      }
      const skillCat = new SkillCategory(req.body);
      skillCat
        .save()
        .then((resp) => {
          res.status(200).json({ message: "register successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
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
