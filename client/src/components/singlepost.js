import React from "react";
import "./styles/singlepost.css";
import placeholder from "../assets/placeholder.png";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../utils/queries";
import post from "./post";

function SinglePost() {
  const { postId } = useParams();

  const { loading, data, error } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
  });

  const Post = data?.post || {};
  console.log(Post);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="singlePostPage">
      <div className="singlePostWrapper">
        <div className="singlePostImageWrapper">
          <img className="singlePostImage" alt="placeholder" src={Post.image} />
        </div>
        <div className="rightSingle">
          <p className="singleTitle">Title:{Post.postTitle}</p>
          <p className="singleTitle">Date:{Post.postedAt}</p>
          <p className="singleTitle">Body:{Post.postText}</p>
          <p className="singleTitle">Posted By:{Post.username}</p>
          <p className="singleTitle">Likes:{Post.likes}</p>
        </div>
      </div>
      <Link to="/feed">
        <button className="backFeed">Back to feed</button>
      </Link>
    </div>
  );
}

export default SinglePost;
