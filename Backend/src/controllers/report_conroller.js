import { Report } from "../models/report.js";
import { UserReport } from "../models/user_report.js";

// export const addReport = async (req, res) => {
//   const { _id } = req.user;
//   try {
//     const reported = await Report.create({ reported_by: _id, ...req.body });
//     if (reported) {
//       res.status(201).json({ message: "reported successfully" });
//     }
//   } catch (error) {
//     res.status(422).json({ error: "something went wrong!" });
//   }
// };

export const addReport = async (req, res) => {
  const { email } = req.user;
  const { reported_post, post_type, report_type, optional_note } = req.body;
  try {
    let reported = await Report.findOne({ reported_post });

    if (!reported) {
      reported = new Report({
        reported_post,
        post_type,
        reports: [],
      });
    }

    const existing_report_index = reported.reports.findIndex((report) => {
      return report.email === email && report.reason === report_type;
    });
    if (existing_report_index === -1) {
      reported.reports.push({
        email,
        reason: report_type,
        date: new Date(),
        optional_note,
      });
      await reported.save();
      return res.status(200).json({ message: "post reported successfully" });
    } else {
      return res.status(422).json({ error: "post already reported" });
    }
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "something went wrong!" });
  }
};

export const addUserReport = async (req, res) => {
  const { email } = req.user;
  const { reported_user, report_type, optional_note } = req.body;
  try {
    let reported = await UserReport.findOne({ reported_user });

    if (!reported) {
      reported = new UserReport({
        reported_user,
        reports: [],
      });
    }

    const existing_report_index = reported.reports.findIndex((report) => {
      return report.email === email && report.reason === report_type;
    });
    if (existing_report_index === -1) {
      reported.reports.push({
        email,
        reason: report_type,
        date: new Date(),
        optional_note,
      });
      await reported.save();
      return res.status(200).json({ message: "user reported successfully" });
    } else {
      return res.status(422).json({ error: "user already reported" });
    }
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "something went wrong!" });
  }
};

export const getUserReports = async (req, res) => {
  try {
    let reported = await UserReport.find()
      .populate("reported_user", "name email")
      .sort({ updatedAt: -1 });
    if (reported) {
      return res.status(200).json(reported);
    }
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "something went wrong!" });
  }
};

export const getPostReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reported_post")
      .populate({ path: "reported_post", populate: { path: "posted_by" } })
      .sort({ updatedAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
