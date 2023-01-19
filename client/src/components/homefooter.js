import React from "react";
import "./styles/homefooter.css";
import Github from "../assets/Github.png";

function HomeFooter() {
  return (
    <footer className="footer">
      <a href="https://github.com/btempini/dev-log">
        <img className="Github" src={Github} alt="Github icon" />
      </a>
    </footer>
  );
}

export default HomeFooter;