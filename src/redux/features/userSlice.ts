import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  onlineUsers: null,
};

const userSclie = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSclie.actions;
export default userSclie.reducer;
