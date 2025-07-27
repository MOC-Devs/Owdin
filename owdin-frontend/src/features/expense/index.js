import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  users: {},
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
    fetchExpensesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // ADD expense
    createExpenseRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    createExpenseSuccess(state, action) {
      state.loading = false;
    },
    createExpenseFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // GET ALL USERS TO SHOW IN EXPENSE LIST
    fetchAllUsersRequest(state,action){
        state.loading = true;
        state.error = null;
    },
    fetchAllUsersSuccess(state, action) {
      state.users = action.payload;
      state.loading = false;
    },
    fetchAllUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchExpensesRequest,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  createExpenseRequest,
  createExpenseSuccess,
  createExpenseFailure,
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchAllUsersFailure
} = expenseSlice.actions;

export default expenseSlice.reducer;
