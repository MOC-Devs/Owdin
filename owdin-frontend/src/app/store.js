import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/index'
import expenseReducer from '../features/expense/index'
import createSagaMiddleware from "redux-saga";
import { expenseSaga } from "../features/expense/saga";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer:{
        auth: authReducer,
        expense: expenseReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(sagaMiddleware)
})

// Run the saga
sagaMiddleware.run(expenseSaga)