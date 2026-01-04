import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
  name: "UserInfo",
  initialState: {
    userName: "",
  },
  reducers: {
    STORE_USER_NAME: (state, action) => {
      state.userName = action.payload;
    },
  },
});
export const { STORE_USER_NAME } = UserSlice.actions;
export default UserSlice.reducer;
