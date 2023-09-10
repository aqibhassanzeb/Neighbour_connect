import { Report } from "../models/report.js";

export const addReport = async (req, res) => {
  const { _id } = req.user;
  try {
    const reported = await Report.create({ report_by: _id, ...req.body });
    if (reported) {
      res.status(201).json({ message: "reported successfully" });
    }
  } catch (error) {
    res.status(422).json({ error: "something went wrong!" });
  }
};
