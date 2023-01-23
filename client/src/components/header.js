// on all pages but home/signup?
import auth from "../utils/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/header.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { QUERY_SINGLE_USER_NAME } from "../utils/queries";
import { useQuery } from "@apollo/client";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    auth.logout();
  };

  //ON FORM SUBMIT WE NEED TO QUERY FOR THAT USER!!!!
  //check the form
  //set form state
  //on form submit query
  //QUERY THAT USER
  //pass the value of the form as the username query
  //REDIRECT TO THAT URL PF PAGE
  //pass navigate with a template string as pfp

  return (
    <div className="header" id="top">
      <div>
        <button onClick={logout} className="logoutButton">
          <Link to="/">Logout</Link>
        </button>
      </div>
      <div id="searchF" className="searchDiv">
        <form onSubmit={""}>
          <button className="searchButton" type="button">
            Search
          </button>
          <input
            className="findFriends"
            type="text"
            placeholder="Find Friends!"
            name="search"
            onChange={""}
            value={""}
          />
          <ReactTooltip
            className="tooltip"
            classNameArrow="arrow"
            anchorId="searchF"
            place="bottom"
            content="Coming Soon!"
          />
        </form>
        {/* link to results page */}
      </div>
    </div>
  );
};

export default Header;
