// ########## this is CONTACT Component page #####################

import React, { useState } from "react";

import { motion } from "framer-motion";
import burger from "../../assets/burger2.png";
import toast from "react-hot-toast";

const Contact = () => {
  const [nameFeild, setNameFeild] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    toast.success("Response Submitted");
    setNameFeild("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <section className="contact">
        <motion.form
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={submitHandler}
        >
          <h2>Contact Us</h2>
          <input
            type="text"
            placeholder="Name"
            required
            value={nameFeild}
            name="nameFeild"
            onChange={(e) => setNameFeild(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            cols="30"
            rows="10"
            placeholder="Message"
            required
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">Send</button>
        </motion.form>
        <motion.div
          className="formBorder"
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            initial={{ y: "-100vh", x: "50%", opacity: 0 }}
            animate={{ x: "50%", y: "-50%", opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <img src={burger} alt="burger..." />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Contact;
