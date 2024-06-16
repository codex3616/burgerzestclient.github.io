import React, { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../redux/actions/order";
import toast from "react-hot-toast";

const MyOrder = () => {
  // const array = [1, 2, 3, 4];

  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orders);
  // console.log("order = ", orders);
  // console.log("length = ", orders.length);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    dispatch(getMyOrders());
  }, [dispatch, error]);
  return (
    <>
      <section className="tableClass">
        {loading === false ? (
          <main>
            <h4>All Orders</h4>
            <table>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Status</th>
                  <th>Item Qty</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders &&
                  orders.map((i) => (
                    <tr key={i._id}>
                      <td>{i._id}</td>
                      <td>{i.orderStatus}</td>
                      <td>
                        {i.orderItems.cheeseBurger.quantity +
                          i.orderItems.vegCheeseBurger.quantity +
                          i.orderItems.burgerWithFries.quantity}
                      </td>
                      <td>₹ {i.totalAmount}</td>
                      <td>{i.paymentMethod}</td>
                      <td>
                        <Link to={`/order/${i._id}`}>
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </main>
        ) : (
          <Loader />
        )}
      </section>
    </>
  );
};

export default MyOrder;
