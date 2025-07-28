import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  loading: null,
  error: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    // GET expenses
    fetchExpensesRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchExpensesSuccess(state, action) {
      state.expenses = action.payload;
      state.loading = false;
    },
    // ADD expense
    createExpenseRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    createExpenseSuccess(state, action) {
      state.loading = false;
    },
    expenseApiFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchExpensesRequest,
  fetchExpensesSuccess,
  createExpenseRequest,
  createExpenseSuccess,
  expenseApiFailure
} = expenseSlice.actions;

export default expenseSlice.reducer;
