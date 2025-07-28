export const selectAuthUser = (state)=>state.auth.user;
export const selectIsAuthenticated = (state)=>Boolean(state.auth.user);
export const selectAuthLoading = (state)=>state.auth.loading;
export const selectAuthError = (state)=>state.auth.error;
export const selectAllUsers = (state)=>state.auth.users;