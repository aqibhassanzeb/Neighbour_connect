import { Activity } from "../models/activity.js";
import { lostandFound } from "../models/lost_found.js";
import { Forum } from "../models/forum.js";
import { Sell } from "../models/sell.js";
import { Watch } from "../models/watch.js";
import { getDistance } from "geolib";
import {
  checkIfUserInConnections,
  convertRangeToMeters,
} from "../utils/index.js";
import { User } from "../models/user.js";

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
  const { address, address_range, _id } = req.user;
  const { latitude: req_latitude, longitude: req_longitude } = address;
  const ADDRESS_RANGE = parseInt(address_range) * 1000;

  try {
    const query = req.query.query;

    const userResults = await User.find({
      name: { $regex: query, $options: "i" },
      _id: { $ne: _id },
      isActive: true,
    }).select("-password");

    userResults.forEach((user) => {
      const distance = getDistance(
        {
          latitude: parseFloat(address.latitude),
          longitude: parseFloat(address.longitude),
        },
        {
          latitude: parseFloat(user.address.latitude),
          longitude: parseFloat(user.address.longitude),
        }
      );
      const pUserRange = convertRangeToMeters(user.address_range);
      const inRadius = distance <= ADDRESS_RANGE && distance <= pUserRange;
      if (!inRadius) {
        const index = userResults.indexOf(user);
        if (index !== -1) {
          userResults.splice(index, 1);
        }
      } else {
        user.result_from = "user";
      }
    });

    const forumResults = await Forum.find({
      topic: { $regex: query, $options: "i" },
    })
      .populate(
        "posted_by",
        "name email image connections requests address address_range"
      )
      .populate({
        path: "replies.reply_by",
        select: "image name",
      })
      .lean();

    forumResults.forEach((post) => {
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
      const PostedUserRange = convertRangeToMeters(
        post.posted_by.address_range
      );
      const inRadius = distance <= ADDRESS_RANGE && distance <= PostedUserRange;
      if (inRadius) {
        post.result_from = "neighbour forum";
      }
    });

    const lostFoundResults = await lostandFound
      .find({
        title: { $regex: query, $options: "i" },
      })
      .populate("posted_by", "-password")
      .populate("category")
      .lean();

    lostFoundResults.forEach((post) => {
      const { visibility } = post;
      if (visibility.trim() === "neighborhood") {
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
        const PostedUserRange = convertRangeToMeters(
          post.posted_by.address_range
        );
        const inRadius =
          distance <= ADDRESS_RANGE && distance <= PostedUserRange;
        if (!inRadius) {
          const index = lostFoundResults.indexOf(post);
          if (index !== -1) {
            lostFoundResults.splice(index, 1);
          }
        } else {
          post.date = JSON.parse(post.date);
          post.result_from = "lost & found";
        }
      } else if (visibility.trim() === "connection") {
        const connected = checkIfUserInConnections(
          _id,
          post.posted_by.connections
        );
        if (connected) {
          post.date = JSON.parse(post.date);
          post.result_from = "sell zone";
        } else {
          const index = lostFoundResults.indexOf(post);
          if (index !== -1) {
            lostFoundResults.splice(index, 1);
          }
        }
      }
    });

    const sellResults = await Sell.find({
      title: { $regex: query, $options: "i" },
      is_active: true,
    })
      .populate("category")
      .populate(
        "posted_by",
        "name email image connections address address_range"
      )
      .lean();

    sellResults.forEach((post) => {
      const { selected_visibility } = post;
      if (selected_visibility.trim() === "Neighborhood") {
        const distance = getDistance(
          {
            latitude: parseFloat(req_latitude),
            longitude: parseFloat(req_longitude),
          },
          {
            latitude: parseFloat(post.posted_by.address.latitude),
            longitude: parseFloat(post.posted_by.address.longitude),
          }
        );
        const PostedUserRange = convertRangeToMeters(
          post.posted_by.address_range
        );
        const inRadius =
          distance <= ADDRESS_RANGE && distance <= PostedUserRange;
        if (!inRadius) {
          const index = sellResults.indexOf(post);
          if (index !== -1) {
            sellResults.splice(index, 1);
          }
        } else {
          post.result_from = "sell zone";
        }
      } else if (selected_visibility.trim() === "Connection") {
        const connected = checkIfUserInConnections(
          _id,
          post.posted_by.connections
        );
        if (connected) {
          post.result_from = "sell zone";
        } else {
          const index = sellResults.indexOf(post);
          if (index !== -1) {
            sellResults.splice(index, 1);
          }
        }
      }
    });

    const watchResults = await Watch.find({
      title: { $regex: query, $options: "i" },
      is_active: true,
    })
      .populate(
        "posted_by",
        "name email image helpful_count address connections requests address_range"
      )
      .populate("category")
      .lean();

    watchResults.forEach((post) => {
      const { selected_visibility } = post;
      if (selected_visibility.trim() === "Neighborhood") {
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
        const PostedUserRange = convertRangeToMeters(
          post.posted_by.address_range
        );
        const inRadius =
          distance <= ADDRESS_RANGE && distance <= PostedUserRange;
        if (!inRadius) {
          const index = watchResults.indexOf(post);
          if (index !== -1) {
            watchResults.splice(index, 1);
          }
        } else {
          post.result_from = "neighbour watch";
        }
      } else if (selected_visibility.trim() === "Connection") {
        const connected = checkIfUserInConnections(
          _id,
          post.posted_by.connections
        );
        if (connected) {
          post.result_from = "neighbour watch";
        } else {
          const index = watchResults.indexOf(post);
          if (index !== -1) {
            watchResults.splice(index, 1);
          }
        }
      }
    });

    res.json([
      ...sellResults,
      ...forumResults,
      ...watchResults,
      ...lostFoundResults,
      ...userResults,
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
