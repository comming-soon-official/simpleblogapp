import { createSlice } from "@reduxjs/toolkit";

const initialPostsValue = {
  posts: [],
  drafts: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState: initialPostsValue,
  reducers: {
    allPosts: (state, action) => {
      state.posts = action.payload;
    },
    allDrafts: (state, action) => {
      state.drafts = action.payload;
    },
  },
});

export const { allPosts, allDrafts } = postSlice.actions;
