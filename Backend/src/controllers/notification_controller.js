import { Activity } from "../models/activity.js";
import { Notification } from "../models/notification.js";
import { calculateDistance, replacements } from "../utils/index.js";

export const userNotifications = async (req, res) => {
  const query = req.query;
  const allow_settings = Object.keys(query)
    .filter((key) => query[key] === "true" && replacements[key])
    .map((key) => replacements[key] || key);

  let { address_range, address, _id } = req.user;
  let { latitude, longitude } = address;

  try {
    const notifications = await Activity.find({
      description: { $in: allow_settings },
    }).populate("posted_by", "address");

    let deleted_notifications = [];
    const get_deleted = await Notification.findOne({ user_id: _id });
    if (get_deleted) {
      deleted_notifications = get_deleted.deleted_notifications;
    }

    const filtered_array = notifications.filter((item) => {
      if (deleted_notifications.includes(item._id.toString())) {
        return false; // Exclude this notification
      }
      if (
        item.visibility === "Connections" &&
        req.user.connections.includes(item.posted_by._id)
      ) {
        return true;
      }
      const docLatitude = parseFloat(item.posted_by.address.latitude);
      const docLongitude = parseFloat(item.posted_by.address.longitude);
      const distanceInKm = calculateDistance(
        latitude,
        longitude,
        docLatitude,
        docLongitude
      );
      return distanceInKm <= parseFloat(address_range);
    });

    res.status(200).json(filtered_array);
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: "something went wrong!" });
  }
};

export const addDeleteNotifications = async (req, res) => {
  const { _id } = req.user;
  const { notification_id } = req.body;

  try {
    let notifications = await Notification.findOne({ user_id: _id });

    if (!notifications) {
      notifications = new Notification({
        user_id: _id,
        deleted_notifications: [],
      });
    }
    notifications.deleted_notifications.push(notification_id);
    await notifications.save();
    return res.status(200).json({ message: "Notifications deleted" });
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: "something went wrong!" });
  }
};

export const updateSettings = async (req, res) => {
  const { _id } = req.user;
  const { settings } = req.body;

  try {
    let notification = await Notification.findOne({ user_id: _id });
    if (!notification) {
      notification = new Notification({ user_id: _id, settings });
    } else {
      notification.settings = settings;
    }
    await notification.save();
    return res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.error("Error updating settings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSettings = async (req, res) => {
  const { _id } = req.user;
  try {
    const notification = await Notification.findOne(
      { user_id: _id },
      "settings"
    );

    if (!notification) {
      return res.json("lost=true&suspicious=true");
    }

    return res.status(200).json(notification.settings);
  } catch (error) {
    console.error("Error retrieving settings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
