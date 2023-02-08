import React from "react";
import "./styles/singlepost.css";
import commentIcon from "../assets/commentIcon.png";

import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../utils/queries";

function SinglePost() {
  const { postId } = useParams();
  console.log(postId);

  const { loading, data, error } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
  });
  console.log(JSON.stringify(error));

  const Post = data?.post || {};
  console.log(Post);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="singlePostPage">
      <div className="singlePostWrapper">
        <div className="singlePostHeader">
          <h1 className="singlePostTitle"> Title: {Post.postTitle}</h1>
          <h2 className="singlePostDate">Date: {Post.postedAt}</h2>
        </div>
        <div className="singlePostBodyDiv">
          <div className="singlePostImageDiv">
            <img className="singlePostImage" src={Post.image}></img>
            <br></br>

            <h3 className="singlePostAuthor">
              <Link to={`/profile/${Post.userProfileId}`}>
                Posted by: {Post.username}
              </Link>{" "}
            </h3>
            <br></br>
            <a>
              <img src={commentIcon}></img>
            </a>

            <br></br>
            <h5 className="singlePostBody">{Post.postText}</h5>
          </div>
        </div>
        {Post.comments.length > 0 ? (
          <></>
        ) : (
          <>
            <div></div>
          </>
        )}
      </div>
      <br></br>
      <div className="singlePageButtonDiv">
        <Link to="/feed">
          <button className="backFeed">Back to feed</button>
        </Link>
      </div>
    </div>
  );
}

export default SinglePost;
