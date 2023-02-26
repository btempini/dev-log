import React, { useEffect, useState } from "react";
import "./styles/singlepost.css";
import commentIcon from "../assets/commentIcon.png";

import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../utils/queries";
import auth from "../utils/auth";
import { ADD_COMMENT, DELETE_POST } from "../utils/mutations";

function SinglePost() {
  const { postId } = useParams();
  const [delPost] = useMutation(DELETE_POST);
  const { loading, data, error } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
  });
  if (error) {
    console.log(JSON.stringify(error));
  }
  const Post = data?.post || {};
  const comments = Post.comments;

  console.log(Post);
  console.log(comments);
  const [commentState, setCommentState] = useState(false);
  const [meState, setMeState] = useState(false);
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
      setFormState({
        ...formState,
        text: "",
      });
      setCommentState(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deletePost = async (event) => {
    console.log("working");

    try {
      const { data } = await delPost({
        variables: {
          postId: postId,
        },
      });
      window.location.replace("/feed");
    } catch (e) {
      console.error(JSON.stringify(e));
      window.alert("There was an error delting your post");
    }
  };

  const userId = Post.userProfileId;
  useEffect(() => {
    if (auth.loggedIn() && auth.getProfile().data._id === userId) {
      setMeState(true);
    }
  });
  console.log(meState);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="singlePostPage">
      <div className="singlePostWrapper">
        <div className="singlePostHeader">
          <h1 className="singlePostTitle">
            {" "}
            <span className="purps">Title: </span>
            {Post.postTitle}
          </h1>
          <h2 className="singlePostDate">
            <span className="purps">Date: </span>
            {Post.postedAt}
          </h2>
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
            {meState ? (
              <>
                <h3
                  className="singlePostDelete"
                  onClick={() => {
                    if (window.confirm("delete post?")) {
                      deletePost();
                    }
                  }}
                >
                  Delete Post
                </h3>
              </>
            ) : (
              <></>
            )}
            <br></br>
            <h5 className="singlePostBody">{Post.postText}</h5>
            <div className="commentContainer">
              <a
                className="singlePostCommentIcon"
                onClick={() =>
                  !commentState ? setCommentState(true) : setCommentState(false)
                }
              >
                <span class="commentText">Leave a comment?</span>
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
            </div>
          </div>
        </div>
        {Post.comments.length > 0 ? (
          <>
            <br></br>
            <section className="commentContainer">
              <h2 className="purps">Comments:</h2>
              <div className="commentSingle">
                {comments &&
                  comments.map((comment) => (
                    <>
                      <div className="commentHeader">
                        <h4>{comment.commentBy}</h4>
                        <span>{comment.createdAt} :</span>
                        <p>{comment.text}</p>
                      </div>
                    </>
                  ))}
              </div>
            </section>
          </>
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
