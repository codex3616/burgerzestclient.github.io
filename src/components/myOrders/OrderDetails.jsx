import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../redux/actions/order";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { order, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id]);

  return (
    <>
      <section className="orderDetails">
        {loading === false && order !== undefined ? (
          <main>
            <h1>Order Details</h1>

            <div>
              <h1>Shipping</h1>
              <p>
                <b>Address </b>
                {`${order.shippingInfo.hNo} ${order.shippingInfo.city} ${order.shippingInfo.state} ${order.shippingInfo.pinCode} ${order.shippingInfo.country}`}
              </p>
            </div>

            <div>
              <h1>Contact</h1>
              <p>
                <b>Name </b>
                {order.user.name}
              </p>
              <p>
                <b>Phone </b>
                {order.shippingInfo.phoneNo}
              </p>
            </div>

            <div>
              <h1>Status</h1>
              <p>
                <b>Order Status </b>
                {order.orderStatus}
              </p>
              <p>
                <b>Placed At </b>
                {order.createdAt.split("T")[0]}
              </p>
              <p>
                <b>Delliverd At </b>
                {order.deliveredAt ? order.deliveredAt.split("T")[0] : "NA"}
              </p>
            </div>

            <div>
              <h1>Payment</h1>
              <p>
                <b>Payment Method </b>
                {order.paymentMethod}
              </p>
              <p>
                <b>Payment Reference </b>
                {order.paymentMethod === "Online" ? order.paymentInfo : "NA"}
              </p>
              <p>
                <b>Paid At </b>
                {order.paymentMethod === "Online" ? order.paidAt : "NA"}
              </p>
            </div>

            <div>
              <h1>Amount</h1>
              <p>
                <b>Item's Total Amount </b>₹ {order.itemsPrice}
              </p>
              <p>
                <b>Shipping Charges </b>₹ {order.shippingCharges}
              </p>
              <p>
                <b>Tax </b>₹ {order.taxPrice}
              </p>
              <p>
                <b>Total Amount </b> ₹{order.totalAmount}
              </p>
            </div>

            <article>
              <h1>Ordered Items</h1>

              <div>
                <h4>Cheese Burger</h4>
                <div>
                  <span>{order.orderItems.cheeseBurger.quantity}</span> x{" "}
                  <span>{order.orderItems.cheeseBurger.price}</span>
                </div>
              </div>
              <div>
                <h4>Veg Cheese Burger</h4>
                <div>
                  <span>{order.orderItems.vegCheeseBurger.quantity}</span> x{" "}
                  <span>{order.orderItems.vegCheeseBurger.price}</span>
                </div>
              </div>
              <div>
                <h4>Burger With Fries</h4>
                <div>
                  <span>{order.orderItems.burgerWithFries.quantity}</span> x{" "}
                  <span>{order.orderItems.burgerWithFries.price}</span>
                </div>
              </div>

              <div>
                <h4 style={{ fontWeight: 800 }}>Sub Total</h4>
                <div style={{ fontWeight: 800 }}>₹ {order.itemsPrice}</div>
              </div>
            </article>
          </main>
        ) : (
          <Loader />
        )}
      </section>
    </>
  );
};

export default OrderDetails;
