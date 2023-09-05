import { Activity } from "../models/activity.js";

export const userActivites = async (req, res) => {
  const { id } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const activites = await Activity.find({
      posted_by: id,
      createdAt: { $gte: today, $lt: new Date() },
    });
    if (activites) {
      res.status(200).json(activites);
    }
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "something went wrong!" });
  }
};
