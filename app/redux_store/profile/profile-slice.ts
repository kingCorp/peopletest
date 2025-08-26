import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import {
  ProfileDetailsType,
  ProfileType
} from "./types";

const initialState: ProfileType = {
  profile: {
    _id: "",
    comment_count: 0,
    created_at: "",
    deleted_at: null,
    email: "",
    follower_count: 0,
    following_count: 0,
    is_active: false,
    is_set_for_deletion: false,
    is_suspended: false,
    is_verified: false,
    like_count: 0,
    picture: null,
    post_count: 0,
    roles: [],
    sports: [],
    type: "",
    updated_at: "",
    view_count: 0,
    name: "",
    username: "",
    is_blocked_by_me: false,
    is_followed_by_me: false,
    is_following_me: false,
    is_blocking_me: false,
  },
};

export const profileSlice = createSlice({
  initialState,
  name: "profile",
  reducers: {
    setProfileDetails: (state, action: PayloadAction<ProfileDetailsType>) => {
      state.profile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfileDetails } = profileSlice.actions;

// reducer
export const profileReducer = profileSlice.reducer;

// selectors
export const getProfileDetails = (state: RootState) => state.profile.profile;
