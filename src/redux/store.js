import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/userReducer";
import { cartReducer, orderReducer } from "./reducers/cartReducer";
import { orderListReducer } from "./reducers/orderReducer";
import { adminReducer } from "./reducers/adminReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    orders: orderListReducer,
    admin: adminReducer,
  },
});

export default store;

export const server = "https://burgerzest.onrender.com/api/v1";
