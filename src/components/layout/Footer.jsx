import React from "react";
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <footer>
        <div>
          <h2>Burger Zest</h2>
          <p>We are trying to gave you the best test possible.</p>
          <p>We give attention to genuine feedback.</p>
          <strong>All Rights Reserved @burgerzest</strong>
        </div>
        <aside>
          <h4>Follow Us</h4>
          <a href="https://www.linkedin.com/in/akash-singh-0a2bb424a/">
            <AiFillLinkedin />
          </a>
          <a href="https://instagram.com/aakash_rajput_9999?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr">
            <AiFillInstagram />
          </a>
          <a href="https://github.com/codex3616">
            <AiFillGithub />
          </a>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
