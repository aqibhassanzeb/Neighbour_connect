import { Activity } from "../models/activity.js";
import { lostandFound } from "../models/lost_found.js";
import { Forum } from "../models/forum.js";
import { Sell } from "../models/sell.js";
import { Watch } from "../models/watch.js";
import { getDistance } from "geolib";
import { checkIfUserInConnections } from "../utils/index.js";

export const userActivites = async (req, res) => {
  const { id } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const activites = await Activity.find({
      posted_by: id,
      createdAt: { $gte: today, $lt: new Date() },
    })
      .populate({
        path: "post_id",
        populate: {
          path: "posted_by",
          select:
            "name email image requests connections endorse_count endorsed_by",
        },
      })
      .sort({ createdAt: -1 });
    if (activites) {
      res.status(200).json(activites);
    }
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "something went wrong!" });
  }
};

export const searchAll = async (req, res) => {
  const { address, address_range } = req.user;
  const { latitude: req_latitude, longitude: req_longitude } = address;
  const ADDRESS_RANGE = parseInt(address_range) * 1000;

  try {
    const query = req.query.query;

    // const forumResults = await Forum.find({
    //   topic: { $regex: query, $options: "i" },
    // })
    //   .populate("posted_by", "name image address")
    //   .populate({
    //     path: "replies.reply_by",
    //     select: "image name",
    //   })
    //   .lean();

    // forumResults.forEach((result) => {
    //   result.result_from = "neighbour forum";
    // });

    // const lostFoundResults = await lostandFound
    //   .find({
    //     title: { $regex: query, $options: "i" },
    //   })
    //   .lean();
    // lostFoundResults.forEach((result) => {
    //   result.result_from = "lost & found";
    // });

    // const sellResults = await Sell.find({
    //   title: { $regex: query, $options: "i" },
    //   is_active: true,
    // })
    //   .populate("category")
    //   .populate("posted_by", "name address image connections")
    //   .lean();
    // sellResults.forEach((result) => {
    //   result.result_from = "sell zone";
    // });

    const watchResults = await Watch.find({
      title: { $regex: query, $options: "i" },
      is_active: true,
    })
      .populate("posted_by", "name image helpful_count address connections")
      .populate("category")
      .lean();

    watchResults.forEach((post) => {
      const { selected_visibility, location } = post;

      if (selected_visibility.trim() === "Neighborhood") {
        const { latitude, longitude } = location;
        const range = getDistance(
          req_latitude,
          req_longitude,
          latitude,
          longitude
        );
        if (range <= ADDRESS_RANGE) {
          post.result_from = "neighbour watch";
        } else {
          const index = watchResults.indexOf(post);
          if (index !== -1) {
            watchResults.splice(index, 1);
          }
        }
      } else if (selected_visibility.trim() === "Connections") {
        console.log(post.posted_by);
        const connected = checkIfUserInConnections(
          req.user._id,
          post.posted_by.connections
        );

        if (!connected) {
          const index = watchResults.indexOf(post);
          if (index !== -1) {
            watchResults.splice(index, 1);
          }
        } else {
          post.result_from = "neighbour watch";
        }
      }
    });

    res.json(watchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
