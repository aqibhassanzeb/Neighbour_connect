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
