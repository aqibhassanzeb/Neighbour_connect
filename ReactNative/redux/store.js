import { configureStore } from "@reduxjs/toolkit";
import loanandfoundSlice from "./loanandfoundSlice";
import globalSlice from "./globalSlice";
import notificationsReducer from "./notificationSlice";
import { api } from "./services";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const store = configureStore({
//   reducer: {
// loanandfound: loanandfoundSlice,
// global: globalSlice,
// notifications: notificationsReducer,
// [api.reducerPath]: api.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       immutableCheck: false,
//       serializableCheck: false,
//     }).concat(api.middleware),
// });
//

import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./authSlice";
// import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  // if you do not want to persist this part of the state
  whitelist: ["authReducer", "loanandfound"],
  // blacklist: [api.reducerPath, globalReducer],
};
const reducer = combineReducers({
  authReducer,
  loanandfound: loanandfoundSlice,
  global: globalSlice,
  notifications: notificationsReducer,
  [api.reducerPath]: api.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  // reducer: {
  //   authReducer,
  //   globalReducer,
  //   [api.reducerPath]: api.reducer,
  // },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }).concat(api.middleware),
});
setupListeners(store.dispatch);
