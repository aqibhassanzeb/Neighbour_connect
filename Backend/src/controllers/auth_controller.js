import { Tracker, User } from "../models/user.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../middleware/email_send.js";
import { calculateDistance, convertRangeToMeters } from "../utils/index.js";
import { Activity } from "../models/activity.js";
import { Forum } from "../models/forum.js";
import { Report } from "../models/report.js";
import { lostandFound } from "../models/lost_found.js";
import { Notification } from "../models/notification.js";
import { Sell } from "../models/sell.js";
import { Skill } from "../models/skill.js";
import { Watch } from "../models/watch.js";
import { Message } from "../models/message.js";
import { getDistance } from "geolib";

export const userSignup = async (req, res) => {
  const { status, email, password, name } = req.body;
  let image = req.file?.filename;
  if (!status || !email || !password || !name) {
    return res.status(400).json({ error: "please fill all fields " });
  }
  try {
    let saveUser = await User.findOne({ email });
    if (saveUser) {
      return res.status(400).json({ error: "email already registered" });
    }
    function generateActivationCode() {
      const min = 1000;
      const max = 9999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const activationCode = generateActivationCode();
    await sendMail(
      email,
      "Account Verification Code ",
      `<h2>Code :</h2>
        ${activationCode} `
    );
    let hashedpassword = await bycrypt.hash(password, 12);
    const user = new User({
      ...req.body,
      password: hashedpassword,
      image,
      verification_code: activationCode,
    });
    let userData = await user.save();
    const token = jwt.sign({ _id: userData._id }, process.env.JWT_SECRET);
    userData.password = undefined;
    userData.code = undefined;
    res
      .status(200)
      .json({ message: "Verify Your Account", token, user: userData });
  } catch (error) {
    return res.status(400).json({ error: "something went wrong!" });
  }
};

export const userEmailUpdate = async (req, res) => {
  const { new_email, _id } = req.body;
  if (!_id) {
    return res.status(400).json({ error: "user id is required" });
  }
  if (!new_email) {
    return res.status(400).json({ error: "please fill the email" });
  }
  try {
    let userCheck = await User.find({ email: new_email });
    if (userCheck.length > 0) {
      return res.status(400).json({ error: "Email already exist" });
    }
    function generateActivationCode() {
      const min = 1000;
      const max = 9999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const activationCode = generateActivationCode();
    await sendMail(
      new_email,
      "Email Verification Code ",
      `<h2>Code :</h2>
    ${activationCode} `
    );
    await User.findByIdAndUpdate(_id, {
      verification_code: activationCode,
      temp_email: new_email,
    });
    res.status(200).json({ message: "please veirfy your email" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const userVerify = async (req, res) => {
  const { verification_code, _id, emailChange } = req.body;
  if (!_id) {
    return res.status(400).json({ error: "user id is required" });
  }
  if (!verification_code) {
    return res.status(400).json({ error: "please fill the code" });
  }
  try {
    let userCheck = await User.findById(_id);
    if (userCheck.verification_code !== verification_code) {
      return res.status(400).json({ error: "please enter valid code" });
    }
    if (emailChange) {
      await User.findByIdAndUpdate(_id, {
        verification_code: null,
        temp_email: undefined,
        email: userCheck.temp_email,
      });
    } else {
      await User.findByIdAndUpdate(_id, {
        verification_code: null,
        email_verified: true,
      });
    }
    res.status(200).json({ message: "verified email successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const userLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "please add email or password" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(400).json({ error: "invalid email or password " });
      }
      bycrypt.compare(password, savedUser.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_SECRET
          );
          savedUser.password = undefined;
          res.json({ message: "Successfull Login", token, user: savedUser });
        } else {
          return res.status(400).json({ error: "invalid email or password" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const userUpdate = async (req, res) => {
  const { _id } = req.params;
  const { password } = req.body;
  let passwordUpdate = false;
  let newPassword;
  if (password) {
    passwordUpdate = true;
    newPassword = await bycrypt.hash(password, 12);
  }
  try {
    const updateData = passwordUpdate
      ? { ...req.body, password: newPassword }
      : req.body;
    const response = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    res.status(200).json({ message: "updated successfully", user: response });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const userPassUpdate = async (req, res) => {
  const { currPassword, newPassword, _id } = req.body;
  if (!currPassword || !newPassword || !_id) {
    return res.status(400).json({ error: "please fill all fields" });
  }
  try {
    let userData = await User.findById({ _id });

    if (!userData) {
      return res.status(400).json({ error: "user not found" });
    }
    const isPasswordMatch = await bycrypt.compare(
      currPassword,
      userData.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "current password not match" });
    }
    let hashedpassword = await bycrypt.hash(newPassword, 12);
    const updateData = { password: hashedpassword };
    await User.findByIdAndUpdate(_id, updateData);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const userGet = async (req, res) => {
  let filter = { status: "user" };
  if (req.query._id) {
    filter._id = req.query._id.split(",");
  }
  try {
    let result = await User.find(filter).select("-password");
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ message: "something went wrong!" });
  }
};

export const userGetbyId = async (req, res) => {
  let filter = { isActive: true };
  if (req.query._id) {
    filter._id = req.query._id.split(",");
  }
  try {
    let result = await User.findById(filter).select("-password");
    res.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "something went wrong!" });
  }
};

//   forgot password

export const forgotPass = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "please enter email" });
  }
  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ error: "email not found" });
    }

    function generateActivationCode() {
      const min = 1000;
      const max = 9999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const activationCode = generateActivationCode();
    await sendMail(
      email,
      "Forgot password",
      `<h2>Code :</h2>
        ${activationCode} `
    );
    let _id = userData._id;
    await User.findByIdAndUpdate(_id, { resetCode: activationCode });
    userData.password = undefined;
    res
      .status(200)
      .json({ message: "code send to your email", user: userData });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

// verify forgot code

export const verifyForgotcode = async (req, res) => {
  const { resetCode, _id } = req.body;
  if (!_id) {
    return res.status(400).json({ error: "user id is required" });
  }
  if (!resetCode) {
    return res.status(400).json({ error: "please fill the code" });
  }
  try {
    let userCheck = await User.findById(_id);
    if (userCheck.resetCode !== resetCode) {
      return res.status(400).json({ error: "please enter valid code" });
    }
    await User.findByIdAndUpdate(_id, { resetCode: null });
    userCheck.password = undefined;
    res
      .status(200)
      .json({ message: "Please enter your new password", user: userCheck });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const getRequests = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "requests.sender",
      select: "name image",
      model: User,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true, data: user.requests });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching user's friend requests" });
  }
};

// Send a Connection Request
export const sendRequest = async (req, res) => {
  try {
    const sender = await User.findById(req.params.id);
    const receiver = await User.findById(req.body.receiver_id);
    if (!sender || !receiver) {
      return res.status(404).json({ error: "User not found" });
    }

    receiver.requests.push({ sender: sender._id, status: "pending" });
    await receiver.save();

    res.json({ message: "Friend request sent" });
  } catch (err) {
    res.status(500).json({ error: "Error sending friend request" });
  }
};

// Accept a connection request
export const acceptRequest = async (req, res) => {
  try {
    const receiver = await User.findById(req.params.id);
    if (!receiver) {
      return res.status(404).json({ error: "User not found" });
    }

    const requestIndex = receiver.requests.findIndex(
      (request) =>
        request.sender.toString() === req.body.sender_id &&
        request.status === "pending"
    );

    if (requestIndex === -1) {
      return res.status(404).json({ error: "Friend request not found" });
    }

    receiver.requests[requestIndex].status = "accepted";
    receiver.connections.push(req.body.sender_id);
    const update_receiver = await receiver.save();

    await User.findByIdAndUpdate(req.body.sender_id, {
      $push: { connections: receiver._id },
    });
    res.json({ message: "Friend request accepted", user: update_receiver });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error accepting friend request" });
  }
};

// Reject a connection request
export const RejectRequest = async (req, res) => {
  try {
    const receiver = await User.findById(req.params.id);

    if (!receiver) {
      return res.status(404).json({ error: "User not found" });
    }

    const requestIndex = receiver.requests.findIndex(
      (request) =>
        request.sender.toString() === req.body.sender_id &&
        request.status === "pending"
    );

    if (requestIndex === -1) {
      return res.status(404).json({ error: "Friend request not found" });
    }

    receiver.requests[requestIndex].status = "rejected";
    await receiver.save();

    res.json({ message: "Friend request rejected" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error rejecting friend request" });
  }
};

// Disconnect a user
export const Disconnect = async (req, res) => {
  const { connection_id } = req.body;
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const connectionIndex = user.connections.findIndex(
      (connection) => connection.toString() === connection_id
    );

    if (connectionIndex === -1) {
      return res.status(404).json({ error: "Connection not found" });
    }

    user.connections.splice(connectionIndex, 1);
    const updateuser = await user.save();

    const connection_user = await User.findById(connection_id);

    if (!connection_user) {
      return res.status(404).json({ error: "Connection not found" });
    }

    const connection2Index = connection_user.connections.findIndex(
      (connection) => connection.toString() === req.params.id
    );

    if (connection2Index === -1) {
      return res.status(404).json({ error: "Connection not found" });
    }

    connection_user.connections.splice(connection2Index, 1);
    await connection_user.save();

    res.json({ message: "User Disconnected", user: updateuser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error Disconnecting user" });
  }
};

// Get user's friends
export const getConnections = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "connections",
      select: "name image",
      model: User,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, data: user.connections });
  } catch (err) {
    res.status(500).json({ error: "Error fetching user's friends" });
  }
};

// Neighbour May Know
export const getMayKnow = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addressRange = parseInt(user.address_range) * 1000;

    const potentialConnections = await User.find({
      _id: {
        $ne: userId,
        $nin: user.connections,
      },
      isActive: true,
      "address.latitude": { $exists: true },
      "address.longitude": { $exists: true },
    });

    const usersWithinRange = potentialConnections.filter((pUser) => {
      const distance = getDistance(
        {
          latitude: parseFloat(user.address.latitude),
          longitude: parseFloat(user.address.longitude),
        },
        {
          latitude: parseFloat(pUser.address.latitude),
          longitude: parseFloat(pUser.address.longitude),
        }
      );
      const pUserRange = convertRangeToMeters(pUser.address_range);
      return distance <= addressRange && distance <= pUserRange;
    });

    res.json(usersWithinRange);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Delete Account
export const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await Activity.deleteMany({ posted_by: id });
    await Forum.deleteMany({ posted_by: id });
    await lostandFound.deleteMany({ posted_by: id });
    await Notification.deleteMany({ userid: id });
    await Report.deleteMany({ report_by: id });
    await Sell.deleteMany({ posted_by: id });
    await Skill.deleteMany({ posted_by: id });
    await Watch.deleteMany({ posted_by: id });
    await User.findByIdAndDelete(id);
    await Message.deleteMany({
      $or: [{ senderId: id }, { recepientId: id }],
    });
    res.json({ message: "Accsount and associated data deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error Deleting User" });
  }
};

export const getUserStatistics = async (req, res) => {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

    const userRegistrations = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const response = monthNames.map((name, index) => {
      const count =
        userRegistrations.find((data) => data._id === index + 1)?.count || 0;
      return {
        name,
        Accounts: count,
      };
    });

    res.json(response);
  } catch (error) {
    res.status(400).json({ message: "something went wrong!" });
  }
};

export const handleTrack = async (req, res) => {
  const { id } = req.body;
  const track = new Tracker({
    user: id,
    login_time: new Date(),
  });

  try {
    await track.save();
    res.status(201).json({ message: "Login tracked successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while tracking login" });
  }
};

export const RecentLogins = async (req, res) => {
  try {
    const latestLogins = await Tracker.find()
      .populate("user", "name image")
      .sort({ login_time: "desc" })
      .limit(10);

    res.json(latestLogins);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching latest logins" });
  }
};
