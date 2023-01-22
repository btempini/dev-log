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
            <p className="codeWarsDaily">Daily CodeWars</p>
            <p className="codeWarsName">{codeWarsState.name}</p>
            <p className="codeWarsTitles">CATEGORY:</p>
            <p className="codeWarsBody">{codeWarsState.category}</p>
            <p className="codeWarsTitles">LEVEL:</p>
            <p className="codeWarsBody">{codeWarsState.rank.name}</p>
            <p className="codeWarsTitles">URL:</p>
            <p className="codeWarsBody">
              <a href={codeWarsState.url}>Click Here to try it out!!</a>
            </p>
          </div>
        </div>
        <div className="rightAside">
          <div className="consoleContainer">
            <h2 className="consoleLog">console.log</h2>
            <button className="postButton">
              <Link to={"/addPost"}>Add a Post</Link>
            </button>
          </div>
          <div className="largerPost">
            <Post posts={posts} title="All posts" />
            <button className="scroll">
              <a href="#top">Scroll to top</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFeed;
