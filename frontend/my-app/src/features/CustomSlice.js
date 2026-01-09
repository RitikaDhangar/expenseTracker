import { createSlice } from "@reduxjs/toolkit";
const CustomSlice = createSlice({
    name: 'CustomInfo',
    initialState: {
        loader:false,
    },
    reducers: {
        SET_GLOBAL_LOADER: (state, action) => {
            state.loader = action.payload;
        }
    }
})
export const { SET_GLOBAL_LOADER } = CustomSlice.actions;
export default CustomSlice.reducer