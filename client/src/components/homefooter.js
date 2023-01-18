import React from "react";
import "./styles/homefooter.css";
import Github from "../assets/Github.png";

function HomeFooter() {
  return (
    <footer className="footer">
      <img className="Github" src={Github} alt="Github icon" />
    </footer>
  );
}

export default HomeFooter;