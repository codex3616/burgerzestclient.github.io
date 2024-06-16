import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
// import Contact from "./components/contact/Contact";
import New from "./components/contact/New"; //contact page
import Cart from "./components/cart/Cart.jsx";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import PaymentSuccess from "./components/cart/PaymentSuccess";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import MyOrders from "./components/myOrders/MyOrder";
import OrderDetails from "./components/myOrders/OrderDetails.jsx";
import Dashboard from "./components/admin/Dashboard";
import Orders from "./components/admin/Orders";
import Users from "./components/admin/Users";
import About from "./components/about/About";
import NotFound from "./components/layout/NotFound";

// reduxxx....
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userAction.js";
import toast, { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "protected-route-react";

import "./styles/app.scss";
import "./styles/header.scss";
import "./styles/home.scss";
import "./styles/founder.scss";
import "./styles/menu.scss";
import "./styles/footer.scss";
import "./styles/contact.scss";
import "./styles/cart.scss";
import "./styles/shipping.scss";
import "./styles/confirmOrder.scss";
import "./styles/paymentSuccesss.scss";
import "./styles/login.scss";
import "./styles/profile.scss";
import "./styles/table.scss";
import "./styles/orderDetails.scss";
import "./styles/dashboard.scss";
import "./styles/about.scss";
import "./styles/loader.scss";
import "./styles/notFound.scss";

function App() {
  const dispatch = useDispatch();

  const { error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Logged In");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
    }
  }, [dispatch, error, message]);
  return (
    <>
      <Router>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* // Contact page */}
          <Route path="/contact" element={<New />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />

          {/* single route protection method*/}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me">
                <Login />
              </ProtectedRoute>
            }
          />
          {/* multiple  route protection method*/}

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/me" element={<Profile />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/confirmorder" element={<ConfirmOrder />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>

          {/* protecting admin routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                // user.role === "admin"
                redirectAdmin="/me"
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
}

export default App;
