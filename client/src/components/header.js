// on all pages but home/signup?
import auth from "../utils/auth";
import React from "react";
import { Link } from "react-router-dom";
import "./styles/header.css";

const Header = () => {
  const logout = (Event) => {
    Event.preventDefault();
    auth.logout();
  };
  return (
    <div className="header">
      <div>
        <Link to="/">
          <button onClick={logout} className="logoutButton">
            Logout
          </button>
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
