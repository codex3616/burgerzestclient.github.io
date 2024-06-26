import axios from "axios";
import { server } from "../store";

export const createOrder =
  (
    // when we call that createorder fun then we provide all these data..
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "createOrderRequest",
      });

      const { data } = await axios.post(
        //post method
        `${server}/createorder`,
        {
          shippingInfo,
          orderItems,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingCharges,
          totalAmount,
        },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "createOrderSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "createOrderFail",
        payload: error.response.data.message,
      });
    }
  };

// ################################################################

export const paymentVerification =
  (
    // when we call that createorder fun then we provide all these data..
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    orderOptions
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "paymentVerificationRequest",
      });

      const { data } = await axios.post(
        //post method
        `${server}/paymentverification`,
        {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          orderOptions,
        },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "paymentVerificationSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "paymentVerificationFail",
        payload: error.response.data.message,
      });
    }
  };

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "getMyOrderRequest" });

    const { data } = await axios.get(`${server}/myorders`, {
      withCredentials: true,
    });

    dispatch({ type: "getMyOrderSuccess", payload: data.orders });
  } catch (error) {
    dispatch({ type: "getMyOrderFail", payload: error.response.data.message });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getMyOrderDetailsRequest" });

    const { data } = await axios.get(`${server}//order/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: "getMyOrderDetailsSuccess", payload: data.order });
  } catch (error) {
    dispatch({
      type: "getMyOrderDetailsFail",
      payload: error.response.data.message,
    });
  }
};
