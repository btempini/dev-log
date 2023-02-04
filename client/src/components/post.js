import React from "react";
import "./styles/userfeed.css";
import { Link } from "react-router-dom";

function post({ posts }) {
  if (!posts.length) {
    return <h2 className="noposts">No posts yet...</h2>;
  }
  return (
    <div className="postContainer">
      {posts &&
        posts.map((post) => (
          <div className="postData" key={post._id}>
            <div className="leftPost">
              <p className="date">{post.postedAt}</p>
              <div className="imageWrapper">
                <img
                  className="postPicture"
                  src={post.image}
                  alt="decoration"
                />
              </div>
            </div>
            <div className="rightPost">
              <div className="topRight">
                <p className="postTitle">
                  <Link to={`/singlePost/${post._id}`}>{post.postTitle}</Link>
                </p>
                <p className="postBody">{post.postText}</p>
              </div>
              <div className="bottomRight">
                <p className="postedBy">
                  <Link to={`/profile/${post.userProfileId}`}>
                    Posted by: {post.username}
                  </Link>
                </p>
                <div className="likeBtnBackground">
                  <button className="likeBtn"></button>
                  <p className="likes">{post.likes}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default post;
