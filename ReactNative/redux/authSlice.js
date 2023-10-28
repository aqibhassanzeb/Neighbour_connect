import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeUser: null,
  token: null,
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
    logout: (state) => {
      state.activeUser = null;
      state.token = null;
    },
  },
});

export const { setActiveUser, logout, setToken } = authReducer.actions;

export default authReducer.reducer;
