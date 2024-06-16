import React from "react";
import { IoFastFoodOutline } from "react-icons/io5";
// import { motion } from "framer-motion";

const Loader = () => {
  //   const options = {

  //   };
  return (
    <>
      <section className="loader">
        <IoFastFoodOutline />
        <div>
          {/*loader using css*/}
          <p className="blink-1">Loading...</p>

          {/* loader using framer-motion */}
          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Loading...
          </motion.p> */}
        </div>
      </section>
    </>
  );
};

export default Loader;
