import { Forum } from "../models/forum.js";
import { Activity } from "../models/activity.js";

export const addForum = async (req, res) => {
  try {
    const post = new Forum({
      ...req.body,
    });

    const posted = await post.save();
    if (posted) {
      await Activity.create({
        posted_by: posted.posted_by,
        description: "neighbor forum",
        post_id: posted._id,
        title: posted.topic,
      });
      return res
        .status(200)
        .json({ message: "Posted Successfully", data: posted });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error uploading post.");
  }
};

export const updateForum = async (req, res) => {
  const { _id } = req.params;

  try {
    await Forum.findByIdAndUpdate({ _id }, req.body);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const deleteForum = async (req, res) => {
  const { _id } = req.params;
  console.log(_id);

  try {
    await Forum.findByIdAndDelete({ _id });
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const getForumsByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const posts = await Forum.find({ posted_by: user_id })
      .sort({ createdAt: -1 })
      .populate("posted_by", "name image");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts by user" });
  }
};

export const getAllForums = async (req, res) => {
  try {
    const items = await Forum.find()
      .sort({ createdAt: -1 })
      .populate("posted_by", "name image")
      .populate({
        path: "replies.reply_by",
        select: "image name",
      });
    res.json(items);
  } catch (error) {
    console.log("Error fetching posts", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

export const addReply = async (req, res) => {
  try {
    const { forumId } = req.params;
    const { reply_by, text } = req.body;
    const forum = await Forum.findById(forumId);
    if (!forum) {
      return res.status(404).json({ error: "Forum not found" });
    }
    forum.replies.push({ reply_by, text });
    await forum.save();
    res.status(201).json({ message: "Reply added successfully", forum });
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { forumId, replyId } = req.params;
    const forum = await Forum.findById(forumId);
    const replyIndex = forum.replies.findIndex(
      (reply) => reply._id.toString() === replyId
    );

    if (replyIndex === -1) {
      return res.status(404).json({ error: "Reply not found" });
    }
    forum.replies.splice(replyIndex, 1);
    await forum.save();
    res.status(200).json({ message: "Reply removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
