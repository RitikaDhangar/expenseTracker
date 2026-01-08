import { createSlice } from "@reduxjs/toolkit";
const ExpenseSlice = createSlice({
    name: 'expenseInfo',
    initialState: {
        EditExpenseObj: {}
    },
    reducers: {
        STORE_EXPENSE_OBJ: (state, action) => {
            state.EditExpenseObj=action.payload
        }
    }
});
export const { STORE_EXPENSE_OBJ } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;