import React from "react";
import "./styles/userfeed.css";
import placeholder from "../assets/placeholder.png";
import avatar from "../assets/Avatar.png";
import Post from "./post";

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
          {Post}
        </div>
      </div>
    </div>
  );
}

export default userFeed;
