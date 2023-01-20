import React, { useState, useEffect } from "react";
import "./styles/userfeed.css";
import placeholder from "../assets/placeholder.png";
import avatar from "../assets/Avatar.png";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import Post from "./post";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import axios from "axios";

function UserFeed() {
  useEffect(() => {
    getCode();
  }, []);

  const { loading, data } = useQuery(QUERY_POSTS);
  const [codeWarsState, setCodeWarsState] = useState({
    name: "CodeWars",
    category: "Is Down",
    rank: { name: ":(" },
    url: "try Again later",
  });
  const posts = data?.posts || [];
  const getCode = async () => {
    try {
      const codeWarsData = await axios.get(
        "https://codewarsapi.herokuapp.com/api/getDailyChallenge/"
      );
      setCodeWarsState(codeWarsData.data);
    } catch (error) {
      setCodeWarsState({
        name: "CodeWars",
        category: "Is Down",
        rank: { name: ":(" },
        url: "try Again later",
      });
    }
  };
  return (
    // user feed
    <div className="userFeed">
      <div className="container">
        <div className="leftAside">
          <div className="avatarContainer">
            <img className="avatar" src={avatar} alt="decoration" />

            <button className="viewProfile">
              <Link to={`/profile/${auth.getProfile().data._id}`}>
                View Profile
              </Link>
            </button>
          </div>
          <div className="codeWarsContainer">
            <p className="codeWarsTitles">Daily CodeWars:</p>
            <p className="codeWarsBody">{codeWarsState.name}</p>
            <p className="codeWarsTitles">CATEGORY</p>
            <p className="codeWarsBody">{codeWarsState.category}</p>
            <p className="codeWarsTitles">LEVEL</p>
            <p className="codeWarsBody">{codeWarsState.rank.name}</p>
            <p className="codeWarsTitles">URL</p>
            <a className="codeWarsBody">{codeWarsState.url}</a>
          </div>
        </div>
        <div className="rightAside">
          <div className="scopeButtonContainer">
            <button className="localScopeBtn">Local Scope</button>
            <div className="divider"></div>
            <button className="globalScopeBtn">Global Scope</button>
          </div>
          <div className="largerPost">
            <Post posts={posts} title="All posts" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFeed;
