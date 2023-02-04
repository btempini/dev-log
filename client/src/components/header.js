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
    try {
      const userObject = await user({
        variables: { username: formState.search },
      });
      navigate(`/profile/${userObject.data.username._id}`);
      return;
    } catch (error) {
      console.log(error);
      //write a error or modal here?
    }
  };
  return (
    <div className="header" id="top">
      <div>
        <button onClick={logout} className="logoutButton">
          <Link to="/">Logout</Link>
        </button>
      </div>
      <div id="searchF" className="searchDiv">
        <button
          className="searchButton"
          type="button"
          onClick={() => searchButton()}
        >
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
