// on all pages but home/signup?
import auth from "../utils/auth";
import React from "react";
import { Link } from "react-router-dom";
import "./styles/header.css";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    auth.logout();
  };

  // !! fix doshit script cuz employers look at it
  return (
    <div className="header">
      <div>
        <button onClick={logout} className="logoutButton">
          <Link to="/">Logout</Link>
        </button>
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
