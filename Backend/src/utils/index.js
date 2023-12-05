export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const replacements = {
  lost: "lost & found",
  sell: "neighbor trade",
  suspicious: "suspicious activity",
  forum: "neighbor forum",
};

export function checkIfUserInConnections(userId, postUserConnections = []) {
  for (const connection of postUserConnections) {
    if (connection.toString() === userId.toString()) {
      return true;
    }
  }
  return false;
}

export function convertRangeToMeters(range) {
  const rangeInKilometers = parseInt(range);
  const rangeInMeters = rangeInKilometers * 1000;
  return rangeInMeters;
}
