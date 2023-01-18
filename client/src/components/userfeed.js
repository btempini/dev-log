import React from "react";
import "./styles/userfeed.css";
import placeholder from "../assets/placeholder.png";
import avatar from "../assets/Avatar.png";

function userFeed() {
  return (
    // user feed
    <div className="userFeed">
      <div className="container">
        <div className="leftAside">
          <div className="avatarContainer">
            <img className="avatar" src={avatar} alt="decoration" />
            <button className="viewProfile">View Profile</button>
          </div>
          <div className="codeWarsContainer">
            <p className="codeWarsTitles">TITLE</p>
            <p className="codeWarsBody">title here...</p>
            <p className="codeWarsTitles">DESCRIPTION</p>
            <p className="codeWarsBody">description here...</p>
            <p className="codeWarsTitles">LEVEL</p>
            <p className="codeWarsBody">level here...</p>
            <p className="codeWarsTitles">URL</p>
            <p className="codeWarsBody">url here...</p>
          </div>
        </div>
        <div className="rightAside">
          <div className="scopeButtonContainer">
            <button className="localScopeBtn">Local Scope</button>
            <div className="divider"></div>
            <button className="globalScopeBtn">Global Scope</button>
          </div>
          <div className="postContainer">
            <div className="leftPost">
              <p className="date">Mon, Jan 16th 2023</p>
              <img src={placeholder} alt="decoration" />
            </div>
            <div className="rightPost">
              <p className="postTitle">POST TITLE</p>
              <p className="postBody">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default userFeed;
