import React from "react";
import "./styles/userprofile.css";
import placeholder from "../assets/placeholder.png";

function post({ posts, title }) {
  if (!posts.length) {
    return <h2>No posts yet...</h2>;
  }
  return (
    <div className="postContainer">
      <div className="leftPost"></div>
      <div className="rightPost">
        {posts &&
          posts.map((post) => (
            <div key={post._id}>
              <div>
                <p className="postTitle">{post.postTitle}</p>
                <p className="date">{post.postedAt}</p>
                <div>Posted by: {post.username}</div>
                <img src={placeholder} alt="decoration" />
                <p className="postBody">{post.postText}</p>
                <div>Likes:{post.likes}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default post;
