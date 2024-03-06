import { createSlice } from "@reduxjs/toolkit";
const user: Record<string, any> = {};

const initialState = {
  logOutAction: false,
  user,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutAction: (state) => {
      localStorage.removeItem("token");
      return { ...initialState };
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      location.replace("/");
      return { ...initialState };
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { logOutAction, logOut, updateUser } = userSlice.actions;
export default userSlice;
