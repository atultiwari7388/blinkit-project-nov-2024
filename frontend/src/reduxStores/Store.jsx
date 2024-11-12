import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userDetailsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
