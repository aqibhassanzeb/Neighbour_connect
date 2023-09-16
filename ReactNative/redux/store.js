import { configureStore } from "@reduxjs/toolkit";
import loanandfoundSlice from "./loanandfoundSlice";
import globalSlice from "./globalSlice";
import notificationsReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    loanandfound: loanandfoundSlice,
    global: globalSlice,
    notifications: notificationsReducer,
  },
});
