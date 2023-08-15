import { configureStore } from "@reduxjs/toolkit";
import loanandfoundSlice from "./loanandfoundSlice";
import globalSlice from "./globalSlice";

export const store = configureStore({
  reducer: {
    loanandfound: loanandfoundSlice,
    global: globalSlice,
  },
});
