import React from "react";
import "./styles/singlepost.css";

import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../utils/queries";

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
          <p className="singleTitle">
            Title:<span className="deets">{Post.postTitle}</span>{" "}
          </p>
          <p className="singleTitle">
            Date: <span className="deets">{Post.postedAt}</span>
          </p>
          <p className="singleTitle">
            Body: <span className="deets">{Post.postText}</span>
          </p>
          <p className="singleTitle">
            <Link to={`/profile/${Post.userProfileId}`}>
              Posted by: {Post.username}
            </Link>{" "}
          </p>
          <p className="singleTitle">
            Likes: <span className="deets">{Post.likes}</span>
          </p>
        </div>
      </div>
      <Link to="/feed">
        <button className="backFeed">Back to feed</button>
      </Link>
    </div>
  );
}

export default SinglePost;
