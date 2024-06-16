import React from "react";
import { Link } from "react-router-dom";
import { RiFindReplaceLine } from "react-icons/ri";
import me from "../../assets/me33.webp";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <section className="about">
        <main>
          <motion.h1
            initial={{ y: "-100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
          >
            About Us
          </motion.h1>
          <article>
            <h4>Burger Zest</h4>
            <p>
              Indulge in our flavorful masterpieces and experience burger
              perfection like never before!
            </p>
            <p>
              Explore the various type of food and burgers. Click below to see
              the menu...
            </p>
            <Link to="/">
              <RiFindReplaceLine />
            </Link>
          </article>

          <div>
            <h2>Founder</h2>
            <article>
              <div>
                <img src={me} alt="Founder..." />
                <h2>Akash Singh</h2>
              </div>
              <p>
                Welcome to a burger Zest! founded by a Akash Singh with a vision
                for mouthwatering creations
              </p>
            </article>
          </div>
        </main>
      </section>
    </>
  );
};

export default About;
