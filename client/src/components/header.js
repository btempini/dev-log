// on all pages but home/signup?
import auth from "../utils/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/header.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { QUERY_SINGLE_USER_NAME } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";

const Header = () => {
  const navigate = useNavigate();
  const logout = (event) => {
    event.preventDefault();
    auth.logout();
  };

  const [user, { data, loading }] = useLazyQuery(QUERY_SINGLE_USER_NAME);

  const [formState, setFormState] = useState({
    search: "",
  });

  // console.log(user);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      search: value,
    });
  };

  const searchButton = async () => {
    console.log(formState);
    await user({ variables: { username: formState.search } });
    if (!loading) {
      console.log(data.username._id);
      navigate(`/profile/${data.username._id}`);
    }
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
        <button className="searchButton" type="button" onClick={searchButton}>
          Search
        </button>
        <input
          className="findFriends"
          type="text"
          placeholder="Find Friends!"
          name="search"
          onClick={onChange}
          onChange={onChange}
          value={formState.search}
        />
        {/* <ReactTooltip
          className="tooltip"
          classNameArrow="arrow"
          anchorId="searchF"
          place="bottom"
          content="Coming Soon!"
        /> */}
        {/* link to results page */}
      </div>
    </div>
  );
};

export default Header;
