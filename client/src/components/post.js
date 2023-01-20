import React from "react";
import "./styles/userprofile.css";
import placeholder from "../assets/placeholder.png";
import { Link } from "react-router-dom";

function post({ posts, title }) {
  if (!posts.length) {
    return <h2>No posts yet...</h2>;
  }
  console.log(posts);
  return (
    <div className="postContainer">
      {posts &&
        posts.map((post) => (
          <div className="postData" key={post._id}>
            <div className="leftPost">
              <p className="date">{post.postedAt}</p>
              <img src={placeholder} alt="decoration" />
            </div>
            <div className="rightPost">
              <div className="topRight">
                <p className="postTitle">{post.postTitle}</p>
                <p className="postBody">{post.postText}</p>
              </div>
              <div className="bottomRight">
                <p className="postedBy">
                  <Link to={`/profile/${post.userProfileId}`}>
                    Posted by: {post.username}
                  </Link>
                </p>
                <p className="likes">Likes:{post.likes}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default post;
