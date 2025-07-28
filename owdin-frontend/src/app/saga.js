import {all} from "redux-saga/effects"
import { expenseSaga } from "../features/expense/saga"
import { userSaga } from "../features/auth/saga"

export default function* rootSaga(){
    yield all([userSaga(),expenseSaga()])
}