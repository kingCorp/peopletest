import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { DetailsType, ProfileType } from "./types";

const initialState: ProfileType = {
  profile: {
    id: "",
    first_name: "",
    avatar: "",
    email: "",
  },
  users: [],
  mode: "light"
};

export const profileSlice = createSlice({
  initialState,
  name: "profile",
  reducers: {
    setProfileDetails: (state, action: PayloadAction<DetailsType>) => {
      state.profile = action.payload;
    },
    setUsersDetails: (state, action: PayloadAction<DetailsType[]>) => {
      state.users = action.payload;
    },
    setMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfileDetails , setUsersDetails, setMode} = profileSlice.actions;

// reducer
export const profileReducer = profileSlice.reducer;

// selectors
export const getProfileDetails = (state: RootState) => state.profile.profile;
export const getUsersDetails = (state: RootState) => state.profile.users;
export const getMode = (state: RootState) => state.profile.mode;
