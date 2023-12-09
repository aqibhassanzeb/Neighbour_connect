import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeUser: null,
  token: null,
  location: {},
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    logout: (state) => {
      state.activeUser = null;
      state.token = null;
    },
  },
});

export const { setActiveUser, logout, setToken, setLocation } =
  authReducer.actions;

export default authReducer.reducer;
