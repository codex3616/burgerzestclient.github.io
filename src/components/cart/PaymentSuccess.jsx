import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <>
      <section className="paymentSuccess">
        <main>
          <h1>order Confirmed</h1>
          <div>
            <p>Order Placed Successfully, You can check order status below.</p>

            <Link to="/myorders">Check Status</Link>
          </div>
        </main>
      </section>
    </>
  );
};

export default PaymentSuccess;
