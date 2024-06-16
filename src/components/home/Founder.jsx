import React from "react";
import { motion } from "framer-motion";
import me from "../../assets/me33.webp";

const Founder = () => {
  const options = {
    initial: { x: "-100", opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
  };

  return (
    <>
      <section className="founder">
        <motion.div {...options}>
          <img src={me} alt="founder..." width={200} height={200} />
          <motion.h3 {...options} transition={{ delay: 0.2 }}>
            Akash Singh
          </motion.h3>
          <motion.p {...options} transition={{ delay: 0.4 }}>
            Welcome to a burger Zest! founded by a Akash Singh with a vision for
            mouthwatering creations. Indulge in our flavorful masterpieces and
            experience burger perfection like never before!
          </motion.p>
        </motion.div>
      </section>
    </>
  );
};

export default Founder;
