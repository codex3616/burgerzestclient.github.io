import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import avtar from "../../assets/avtar.webp";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";
import Loader from "../layout/Loader";

const Profile = () => {
  //integration part...
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  //done

  const options = {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    animate: {
      y: "0",
      opacity: 1,
    },
  };

  useEffect(() => {
    if (user === undefined) {
      dispatch(logoutUser());
      navigate("/");
    }
  }, [dispatch, navigate, user]);
  return (
    <>
      <section className="profile">
        {loading === false ? ( //integration part
          <main>
            <motion.img
              src={user ? user.photo : avtar}
              alt="User"
              {...options}
            />
            <motion.h5 {...options} transition={{ delay: 0.3 }}>
              {user.name}
            </motion.h5>

            {user.role === "admin" && (
              <motion.div
                {...options}
                transition={{ delay: 0.5 }}
                style={{ marginBottom: "0.5rem" }}
              >
                <Link
                  to="/admin/dashboard"
                  style={{
                    borderRadius: 0,
                    backgroundColor: "rgb(40,40,40",
                  }}
                >
                  <MdDashboard />
                  Dashboard
                </Link>
              </motion.div>
            )}
            <motion.div
              initial={{ x: "-100vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              // transition={{ delay: 0.7 }}
            >
              <Link to="/myorders">Orders</Link>
            </motion.div>

            <motion.button
              initial={{ x: "-100vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={logoutHandler}
            >
              Logout
            </motion.button>
          </main>
        ) : (
          <Loader />
        )}
      </section>
    </>
  );
};

export default Profile;
