import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};
const initialState = {
  user: getUserFromLocalStorage(),
  users: {},
  loading: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.loading = false;
    },
    // GET ALL USERS TO SHOW IN EXPENSE LIST
    fetchAllUsersRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchAllUsersSuccess(state, action) {
      state.users = action.payload;
      state.loading = false;
    },
    // LOGOUT USER
    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      localStorage.removeItem("user");
      state.user = null;
    },
    // IN CASE OF API FAILURE
    userApiFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signupStart,
  loginStart,
  loginSuccess,
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  logoutRequest,
  logoutSuccess,
  userApiFailure,
} = authSlice.actions;

export default authSlice.reducer;
