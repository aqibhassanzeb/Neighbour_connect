import { configureStore } from '@reduxjs/toolkit'
import loanandfoundSlice from './loanandfoundSlice'

export const store = configureStore({
  reducer: {
    loanandfound:loanandfoundSlice
  },
})