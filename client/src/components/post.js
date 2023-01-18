import React from "react";
import "./styles/userprofile.css";

function post() {
  return (
    <div className="postContainer">
      <div className="leftPost">
        <p className="date">Mon, Jan 16th 2023</p>
        <img src={placeholder} alt="decoration" />
      </div>
      <div className="rightPost">
        <p className="postTitle">POST TITLE</p>
        <p className="postBody">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
      </div>
    </div>
  );
}

export default post;
