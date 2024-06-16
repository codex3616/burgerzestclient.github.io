import React, { useEffect, useState } from "react";
import { server } from "../../redux/store.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, paymentVerification } from "../../redux/actions/order";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import Razorpay from "razorpay";

const ConfirmOrder = () => {
  // shippingInfo,
  //   orderItems,
  //   paymentMethod,
  //   itemsPrice,
  //   taxPrice,
  //   shippingCharges,
  //   totalAmount,
  const [paymentMethod, setPaymentMethod] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo, cartItems, subTotal, tax, shippingCharges, total } =
    useSelector((state) => state.cart);

  const { message, error } = useSelector((state) => state.order);

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisableBtn(true);

    if (paymentMethod === "COD") {
      dispatch(
        createOrder(
          shippingInfo,
          cartItems,
          paymentMethod,
          subTotal,
          tax,
          shippingCharges,
          total
        )
      );
      dispatch({ type: "emptyItems" });
      // console.log({
      //   shippingInfo,
      //   cartItems,
      //   paymentMethod,
      //   subTotal,
      //   tax,
      //   shippingCharges,
      //   total,
      // });
    } else {
      const {
        data: { order, orderOptions },
      } = await axios.post(
        //post method
        `${server}/createorderonline`,
        {
          shippingInfo,
          orderItems: cartItems,
          paymentMethod,
          itemsPrice: subTotal,
          taxPrice: tax,
          shippingCharges,
          totalAmount: total,
        },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const options = {
        key: "rzp_test_irhbdKGGv0ceqM", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "BurgerZest",
        description: "Burger App",
        order_id: order.id,
        handler: function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
          dispatch(
            paymentVerification(
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              orderOptions
            )
          );
        },

        theme: {
          color: "#9c003c",
        },
      };
      var razorpay = new window.Razorpay(options);
      razorpay.open();

      dispatch({ type: "emptyItems" });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
      setDisableBtn(false);
    }

    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
      dispatch({
        type: "emptyItems",
      });
      navigate("/paymentsuccess");
    }
  }, [dispatch, error, message, navigate]);
  return (
    <>
      <section className="confirmOrder">
        <main>
          <h1>Confirm Order</h1>
          <form onSubmit={submitHandler}>
            <div>
              <label>Cash On Delivery</label>
              <input
                type="radio"
                name="payment"
                required
                onChange={() => setPaymentMethod("COD")}
              />
            </div>
            <div>
              <label>Online</label>
              <input
                type="radio"
                name="payment"
                onChange={() => setPaymentMethod("Online")}
              />
            </div>
            <button disabled={disableBtn} type="submit">
              Place Order
            </button>
          </form>
        </main>
      </section>
    </>
  );
};

export default ConfirmOrder;
