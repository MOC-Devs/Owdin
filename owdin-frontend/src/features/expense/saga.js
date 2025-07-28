import { put, call, takeEvery } from "redux-saga/effects";
import {
  createExpenseRequest,
  createExpenseSuccess,
  fetchExpensesRequest,
  fetchExpensesSuccess,
  expenseApiFailure,
} from ".";
import { createExpense, getAllUsers, getExpense } from "../../app/api";

export function* handleCreateExpense(action) {
  try{
    // API call to create expense in firestore
    yield call(createExpense,action.payload);
    yield put(createExpenseSuccess());
    // Fetch updated expenses
    yield put(fetchExpensesRequest());
  }
  catch(err){
    console.error("Create Expense Failed:",err)
    yield(put(expenseApiFailure(err.error)))
  }
}

export function* handleFetchExpenses(action) {
  try{
    // API Call to fetch expense from firestore
    const res = yield call(getExpense);
    const expenses = res.data
  
    // Saving expense object to redux store
    yield put(fetchExpensesSuccess(expenses));
  }catch(err){
    console.error("Handle fetch expense failed:",err)
    yield(put(expenseApiFailure(err.error)))
  }
}

export function* expenseSaga() {
  yield takeEvery(createExpenseRequest.type, handleCreateExpense);
  yield takeEvery(fetchExpensesRequest.type, handleFetchExpenses);
}
