import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLocation: {},
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateLocation: (state, action) => {
      console.log(action.payload);
      state.selectedLocation = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateLocation } = globalSlice.actions;

export default globalSlice.reducer;
