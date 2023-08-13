export const extractTime = (input) => {
  const date = new Date(input);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
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
