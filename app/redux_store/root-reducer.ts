import { combineSlices } from "@reduxjs/toolkit";

import { profileReducer } from "./profile/profile-slice";

export const rootReducer = combineSlices({
  profile: profileReducer,
});
