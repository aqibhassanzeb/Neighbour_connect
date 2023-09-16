import { Activity } from "../models/activity.js";
import { lostandFound } from "../models/lost_found.js";
import { Forum } from "../models/forum.js";
import { Sell } from "../models/sell.js";
import { Watch } from "../models/watch.js";

export const userActivites = async (req, res) => {
  const { id } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const activites = await Activity.find({
      posted_by: id,
      createdAt: { $gte: today, $lt: new Date() },
    }).sort({ createdAt: -1 });
    if (activites) {
      res.status(200).json(activites);
    }
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "something went wrong!" });
  }
};

export const searchAll = async (req, res) => {
  try {
    const query = req.query.query;

    const forumResults = await Forum.find({
      topic: { $regex: query, $options: "i" },
    })
      .populate("posted_by", "name image")
      .populate({
        path: "replies.reply_by",
        select: "image name",
      })
      .lean();
    forumResults.forEach((result) => {
      result.result_from = "neighbour forum";
    });

    const lostFoundResults = await lostandFound
      .find({
        title: { $regex: query, $options: "i" },
        // is_active: true,
      })
      .lean();
    lostFoundResults.forEach((result) => {
      result.result_from = "lost & found";
    });

    const sellResults = await Sell.find({
      title: { $regex: query, $options: "i" },
      is_active: true,
    })
      .populate("category")
      .populate("posted_by", "name address image")
      .lean();
    sellResults.forEach((result) => {
      result.result_from = "sell zone";
    });

    const watchResults = await Watch.find({
      title: { $regex: query, $options: "i" },
      is_active: true,
    })
      .populate("posted_by", "name image helpful_count address")
      .populate("category")
      .lean();
    watchResults.forEach((result) => {
      result.result_from = "neighbour watch";
    });

    const results = [
      ...forumResults,
      ...lostFoundResults,
      ...sellResults,
      ...watchResults,
    ];

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
