import axios from "./axios";

// APIs related to Users
export const createUser = (user) => axios.post("users/createUser", user);
export const getUserById = () => axios.get("users/getUserById");
export const getAllUsers = () => axios.get("users/getAllUsers");

// APIs related to Expense
export const getExpense = () => axios.get("expense/getExpense");
export const createExpense = (expense) => axios.post("expense/createExpense", expense);
