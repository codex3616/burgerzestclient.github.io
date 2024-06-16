import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer(
  {
    orders: [],
    users: [],
  },
  {
    //stats
    getDashboardStatsRequest: (state) => {
      state.loading = true;
    },
    getDashboardStatsSuccess: (state, action) => {
      state.loading = false;
      state.usersCount = action.payload.usersCount;
      state.ordersCount = action.payload.ordersCount;
      state.totalIncome = action.payload.totalIncome;
    },
    getDashboardStatsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //users
    getAdminUsersRequest: (state) => {
      state.loading = true;
    },
    getAdminUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAdminUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // orders
    getAdminOrdersRequest: (state) => {
      state.loading = true;
    },
    getAdminOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    getAdminOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // process Order
    processOrderRequest: (state) => {
      state.loading = true;
    },
    processOrderSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    processOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //clear message work done
    clearMessage: (state) => {
      state.message = null;
    },

    //clear error once work done
    clearError: (state) => {
      state.error = null;
    },
  }
);
