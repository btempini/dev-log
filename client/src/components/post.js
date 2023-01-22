import React from "react";
import "./styles/userfeed.css";
import placeholder from "../assets/placeholder.png";
import { Link } from "react-router-dom";
import { QUERY_POSTS } from "../utils/queries";
function post() {
  
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
  console.log(posts);
  
  if (!posts.length) {
    return <h2>No posts yet...</h2>;
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
                <p className="postTitle">{post.postTitle}</p>
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
