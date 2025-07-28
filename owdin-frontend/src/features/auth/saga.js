import { takeEvery, put, call } from "redux-saga/effects";
import {
  signupStart,
  loginStart,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  userApiFailure,
  fetchAllUsersSuccess,
  fetchAllUsersRequest,
} from ".";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createUser, getAllUsers } from "../../app/api";
import { auth } from "../../../firebase-config";
import { EMAIL_AUTH, GOOGLE_AUTH } from "./constants";

function* handleLogin(action) {
  try {
    const providerType = action.payload.providerType;
    if (providerType === GOOGLE_AUTH) {
      // LOGIN WITH GOOGLE
      const provider = new GoogleAuthProvider();
      const userCredential = yield call(signInWithPopup, auth, provider);
      // CREATING USER IN FIRESTORE IN CASE IT'S NOT THERE
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
      yield put(loginSuccess(user));
      yield call(createUser, {
        userId: userCredential.user.uid,
        name: userCredential.user.email,
        email: userCredential.user.email,
      });
      return userCredential;
    } else if (providerType === EMAIL_AUTH) {
      // LOGIN WITH EMAIL PASSWORD
      const { email, password } = action.payload.credentials;
      yield call(signInWithEmailAndPassword, auth, email, password);
    }
  } catch (err) {
    console.error("Signin Failed:", err);
    yield put(userApiFailure(err.error));
  }
}

function* handleSignup(action) {
  try {
    const providerType = action.payload.providerType;
    if (providerType === EMAIL_AUTH) {
      const { name, email, password } = action.payload.credentials;
      // CREATING USER IN FIREBASE AUTH
      yield call(createUserWithEmailAndPassword, auth, email, password);
      // LOGGING IN THE USER
      const userCredential = yield call(
        signInWithEmailAndPassword,
        auth,
        email,
        password
      );
      // CREATING USER IN FIRESTORE
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
      yield put(loginSuccess(user));
      yield call(createUser, {
        userId: userCredential.user.uid,
        name,
        email: userCredential.user.email,
      });
      return userCredential;
    }
  } catch (err) {
    console.error("Signup Failed:", err);
    yield put(userApiFailure(err.error));
  }
}

export function* handleFetchAllUsers(action) {
  try {
    // API CALL TO FETCH ALL USERS
    const res = yield call(getAllUsers);
    const users = res.data;
    // SAVING ALL USERS TO REDUX
    yield put(fetchAllUsersSuccess(users));
  } catch (err) {
    console.error("Fetching users failed:", err);
    yield put(userApiFailure(err.error));
  }
}

function* handleLogout(action) {
  try {
    // LOGGING OUT THE USER
    yield call(signOut, auth);
    yield put(logoutSuccess());
  } catch (err) {
    console.error("Logging out failed:", err);
    yield put(userApiFailure(err.error));
  }
}

export function* userSaga() {
  yield takeEvery(signupStart.type, handleSignup);
  yield takeEvery(loginStart.type, handleLogin);
  yield takeEvery(fetchAllUsersRequest.type, handleFetchAllUsers);
  yield takeEvery(logoutRequest.type, handleLogout);
}
