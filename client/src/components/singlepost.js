import React from "react";
import "./styles/singlepost.css";
import placeholder from "../assets/placeholder.png";

function SinglePost() {
  return (
    <div className="singlePostPage">
      <div className="singlePostWrapper">
        <div className="singlePostImageWrapper">
          <img
            className="singlePostImage"
            alt="placeholder"
            src={placeholder}
          />
        </div>
        <div className="rightSingle">
          <p className="singleTitle">Title:</p>
          <p className="singleTitle">Date:</p>
          <p className="singleTitle">Body:</p>
          <p className="singleTitle">Posted By:</p>
          <p className="singleTitle">Likes:</p>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
