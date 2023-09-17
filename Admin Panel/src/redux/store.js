import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './reducers/auth';
import { api } from './api';

export const store = configureStore({
  reducer: {
    authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});
setupListeners(store.dispatch);
