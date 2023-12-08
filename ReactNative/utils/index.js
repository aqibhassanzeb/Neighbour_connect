import axios from "axios";
import { CLOUD_NAME, UPLOAD_PRESET } from "../config";
import moment from "moment";

export const extractTime = (input) => {
  const date = new Date(input);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

export const extractDate = (inputDate) => {
  const date = new Date(inputDate);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const extractedDate = date.toLocaleString("en-US", options);
  return extractedDate.replace(/,/g, "");
};

export const extractDays = (inputDays) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const processedArray = [];
  let currentRange = [];

  for (const day of inputDays) {
    const dayIndex = daysOfWeek.indexOf(day);

    if (currentRange.length === 0) {
      currentRange.push(day);
    } else if (
      dayIndex ===
      (daysOfWeek.indexOf(currentRange[currentRange.length - 1]) + 1) % 7
    ) {
      currentRange.push(day);
    } else {
      if (currentRange.length >= 3) {
        processedArray.push(
          `${currentRange[0]} to ${currentRange[currentRange.length - 1]}`
        );
      } else {
        processedArray.push(...currentRange);
      }
      currentRange = [day];
    }
  }

  if (currentRange.length >= 3) {
    processedArray.push(
      `${currentRange[0]} to ${currentRange[currentRange.length - 1]}`
    );
  } else {
    processedArray.push(...currentRange);
  }

  return processedArray.join(" ");
};

export const shortText = (text) => {
  const words = text.split(/\s+/);
  if (words.length <= 40) {
    return words.join(" ");
  } else {
    return words.slice(0, 40).join(" ");
  }
};

export const debounce = (func, delay) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(func, delay);
};

export const generateRoomId = (userId1, userId2) => {
  const sortedUserIds = [userId1, userId2].sort();
  const roomId = sortedUserIds.join("_");
  return roomId;
};

export const uploadImageToCloudinary = async (image) => {
  try {
    const formData = new FormData();
    const extension = image.uri.split(".").pop();
    const type = `${image.type}/${extension}`;
    const name = image.uri.split("/").pop();
    formData.append("file", {
      uri: image.uri,
      type,
      name,
    });
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", CLOUD_NAME);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
  } finally {
  }
};

export function letterSpacing(string, count = 1) {
  return string.split("").join("\u200A".repeat(count));
}

export function hasPassed15Minutes(dateTime) {
  const targetDateTime = moment(dateTime);
  const currentDateTime = moment();
  const minutesDifference = currentDateTime.diff(targetDateTime, "minutes");
  return minutesDifference >= 15;
}

export function hasPassed10Days(dateTime) {
  const targetDateTime = moment(dateTime);
  const currentDateTime = moment();
  const daysDifference = currentDateTime.diff(targetDateTime, "days");
  return daysDifference >= 10;
}

export function formatText(text) {
  return text?.replace(/\n/g, " ");
}

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
