// on all pages but home/signup?

import React from "react";
import { Link } from "react-router-dom";
import "./styles/header.css";

const Header = () => {
  return (
    <div className="header">
      <div>
        <Link to="/">
          <button className="logoutButton">Logout</button>
        </Link>
      </div>
      <div className="searchDiv">
        <button className="searchButton" type="button">
          Search
        </button>
        <input
          className="findFriends"
          type="text"
          placeholder="Find Friends!"
        />
        {/* link to results page */}
      </div>
    </div>
  );
};

export default Header;