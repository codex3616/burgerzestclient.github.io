import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {
    // initial state
  },
  {
    //for load user not for login..
    loadUserRequest: (state) => {
      state.loading = true;
    },

    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    //for logout

    logoutRequest: (state) => {
      state.loading = true;
    },

    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.message = action.payload;
      state.user = null;
    },

    logoutFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },

    //for clear errors

    clearError: (state) => {
      state.error = null;
    },
    //for clear messages

    clearMessage: (state) => {
      state.message = null;
    },
  }
);
