import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import notificationReducer from "./notificationSlice";
import treeReducer from "./treeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationReducer,
    trees: treeReducer,
  },
});
