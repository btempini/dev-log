import React from "react";
import "./styles/footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer2">
      <Link to="/feed">
        <button className="devLogf">
          <span>{"<"}</span>dev.log<span>{">"}</span>
        </button>
      </Link>
    </footer>
  );
}

export default Footer;