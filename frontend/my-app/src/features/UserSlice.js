import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
  name: "UserInfo",
  initialState: {
    userName: "",
    token:''
  },
  reducers: {
    STORE_USER_NAME: (state, action) => {
      state.userName = action.payload;
    },
    STORE_USER_TOKEN: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { STORE_USER_NAME,STORE_USER_TOKEN } = UserSlice.actions;
export default UserSlice.reducer;
