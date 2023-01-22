// on all pages but home/signup?
import auth from "../utils/auth";
import React from "react";
import { Link } from "react-router-dom";
import "./styles/header.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    auth.logout();
  };

  return (
    <div className="header" id="top">
      <div>
        <button onClick={logout} className="logoutButton">
          <Link to="/">Logout</Link>
        </button>
      </div>
      <div id="searchF" className="searchDiv">
        <button className="searchButton" type="button">
          Search
        </button>
        <input
          className="findFriends"
          type="text"
          placeholder="Find Friends!"
        />
        <ReactTooltip
          className="tooltip"
          classNameArrow="arrow"
          anchorId="searchF"
          place="bottom"
          content="Coming Soon!"
        />
        {/* link to results page */}
      </div>
    </div>
  );
};

export default Header;
