import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lost: false,
  suspicious: false,
  sell: false,
  forum: false,
  queryParams: "",
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    toggleLost: (state) => {
      state.lost = !state.lost;
      state.queryParams = buildQueryParams(state);
    },
    toggleSuspicious: (state) => {
      state.suspicious = !state.suspicious;
      state.queryParams = buildQueryParams(state);
    },
    toggleSell: (state) => {
      state.sell = !state.sell;
      state.queryParams = buildQueryParams(state);
    },
    toggleForum: (state) => {
      state.forum = !state.forum;
      state.queryParams = buildQueryParams(state);
    },
    setSettings: (state, action) => {
      const { settings } = action.payload;
      const keyValuePairs = settings.split("&");
      const separatedValues = {};
      keyValuePairs.forEach((keyValuePair) => {
        const [key, value] = keyValuePair.split("=");
        separatedValues[key] = value === "true";
      });
      state.forum = separatedValues.forum ? true : false;
      state.suspicious = separatedValues.suspicious ? true : false;
      state.sell = separatedValues.sell ? true : false;
      state.lost = separatedValues.lost ? true : false;
      state.queryParams = settings;
    },
  },
});

function buildQueryParams(state) {
  const params = [];
  if (state.lost) params.push("lost=true");
  if (state.suspicious) params.push("suspicious=true");
  if (state.sell) params.push("sell=true");
  if (state.forum) params.push("forum=true");

  return params.join("&");
}

export const {
  toggleLost,
  toggleSuspicious,
  toggleSell,
  toggleForum,
  setSettings,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
