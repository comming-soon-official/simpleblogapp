import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { postSlice } from "./postSlice";

const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export default store;
