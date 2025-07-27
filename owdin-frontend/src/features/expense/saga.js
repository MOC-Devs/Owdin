import { put, call, takeEvery } from "redux-saga/effects";
import {
  createExpenseRequest,
  createExpenseSuccess,
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchExpensesRequest,
  fetchExpensesSuccess,
} from ".";
import { createExpense, getAllUsers, getExpense } from "../../app/api";

export function* handleCreateExpense(action) {
  // API call to create expense in firestore
  yield call(createExpense,action.payload);
  yield put(createExpenseSuccess());
  // Fetch updated expenses
  yield put(fetchExpensesRequest());
}

export function* handleFetchExpenses(action) {
  // API Call to fetch expense from firestore
  const res = yield call(getExpense);
  const expenses = res.data

  // Saving expense object to redux store
  yield put(fetchExpensesSuccess(expenses));
}

export function* handleFetchAllUsers(action) {
  // API Call to fetch all users
  const res = yield call(getAllUsers);
  const users =  res.data

  // Saving all users to users list
  yield put(fetchAllUsersSuccess(users));
}

export function* expenseSaga() {
  yield takeEvery(createExpenseRequest.type, handleCreateExpense);
  yield takeEvery(fetchExpensesRequest.type, handleFetchExpenses);
  yield takeEvery(fetchAllUsersRequest.type, handleFetchAllUsers);
}
