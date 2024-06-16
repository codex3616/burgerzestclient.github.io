import { createReducer } from "@reduxjs/toolkit";

export const orderListReducer = createReducer(
  {
    orders: [],
  },
  {
    getMyOrderRequest: (state) => {
      state.loading = true;
    },
    getMyOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    getMyOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getMyOrderDetailsRequest: (state) => {
      state.loading = true;
    },
    getMyOrderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    getMyOrderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    //for clear messages

    clearMessage: (state) => {
      state.message = null;
    },
  }
);
