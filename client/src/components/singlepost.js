import React, { useState } from "react";
import "./styles/singlepost.css";
import commentIcon from "../assets/commentIcon.png";

import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../utils/queries";
import auth from "../utils/auth";
import { ADD_COMMENT } from "../utils/mutations";

function SinglePost() {
  const { postId } = useParams();
  const { loading, data, error } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
  });
  if (error) {
    console.log(JSON.stringify(error));
  }
  const Post = data?.post || {};
  console.log(Post);

  const [commentState, setCommentState] = useState(false);
  const [addComment] = useMutation(ADD_COMMENT);
  const [formState, setFormState] = useState({
    text: "",
    username: auth.getProfile().data.username,
    postId: postId,
  });
  console.log(formState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addComment({
        variables: { ...formState },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

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
            <a
              className="singlePostCommentIcon"
              onClick={() => setCommentState(true)}
            >
              <img src={commentIcon} />
            </a>
            {commentState ? (
              <>
                <form onSubmit={handleFormSubmit} className="singlePostForm">
                  <input
                    placeholder="Comment ..."
                    type="text"
                    name="text"
                    value={formState.text}
                    onChange={handleChange}
                  ></input>
                  <button className="singlePostSubmit">Submit</button>
                </form>
              </>
            ) : (
              <></>
            )}

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
