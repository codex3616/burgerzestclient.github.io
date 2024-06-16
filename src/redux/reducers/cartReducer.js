import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : {
        cheeseBurger: {
          quantity: 0,
          price: 200,
        },
        vegCheeseBurger: {
          quantity: 0,
          price: 500,
        },
        burgerWithFries: {
          quantity: 0,
          price: 1800,
        },
      },
  subTotal: localStorage.getItem("cartPrice")
    ? JSON.parse(localStorage.getItem("cartPrice")).subTotal
    : 0,
  tax: localStorage.getItem("cartPrice")
    ? JSON.parse(localStorage.getItem("cartPrice")).tax
    : 0,
  shippingCharges: localStorage.getItem("cartPrice")
    ? JSON.parse(localStorage.getItem("cartPrice")).shippingCharges
    : 0,
  total: localStorage.getItem("cartPrice")
    ? JSON.parse(localStorage.getItem("cartPrice")).total
    : 0,
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};
export const cartReducer = createReducer(initialState, {
  //Increment
  cheeseBurgerIncrement: (state) => {
    state.cartItems.cheeseBurger.quantity += 1;
  },
  vegCheeseBurgerIncrement: (state) => {
    state.cartItems.vegCheeseBurger.quantity += 1;
  },
  burgerWithFriesIncrement: (state) => {
    state.cartItems.burgerWithFries.quantity += 1;
  },

  //Decrement

  cheeseBurgerDecrement: (state) => {
    state.cartItems.cheeseBurger.quantity -= 1;
  },
  vegCheeseBurgerDecrement: (state) => {
    state.cartItems.vegCheeseBurger.quantity -= 1;
  },
  burgerWithFriesDecrement: (state) => {
    state.cartItems.burgerWithFries.quantity -= 1;
  },

  // Calculate price according to quantity...
  calculatePrice: (state) => {
    state.subTotal =
      state.cartItems.cheeseBurger.price *
        state.cartItems.cheeseBurger.quantity +
      state.cartItems.vegCheeseBurger.price *
        state.cartItems.vegCheeseBurger.quantity +
      state.cartItems.burgerWithFries.price *
        state.cartItems.burgerWithFries.quantity;

    state.tax = state.subTotal * 0.18; // i.e 18% tax
    state.shippingCharges = state.subTotal > 1000 ? 0 : 150;
    state.total = state.subTotal + state.tax + state.shippingCharges;
  },

  // once order is placed then all cartitems must be empty..
  emptyItems: (state) => {
    state.cartItems = {
      cheeseBurger: {
        quantity: 0,
        price: 200,
      },
      vegCheeseBurger: {
        quantity: 0,
        price: 500,
      },
      burgerWithFries: {
        quantity: 0,
        price: 1800,
      },
    };
    state.subTotal = 0;
    state.tax = 0;
    state.shippingCharges = 0;
    state.total = 0;
  },

  // ADDING shipping info or SHIPPING ADDRESS
  addShippingInfo: (state, action) => {
    state.shippingInfo = {
      hNo: action.payload.hNo,
      city: action.payload.city,
      country: action.payload.country,
      state: action.payload.state,
      pinCode: action.payload.pinCode,
      phoneNo: action.payload.phoneNo,
    };
  },
});

export const orderReducer = createReducer(
  {},
  {
    // for create order
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // for payment verification
    paymentVerificationRequest: (state) => {
      state.loading = true;
    },
    paymentVerificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    paymentVerificationFail: (state, action) => {
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
