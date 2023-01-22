import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import "./styles/createpost.css";
import { ADD_POST } from "../utils/mutations";
import auth from "../utils/auth";

const CreatePost = () => {
  const [formState, setFormState] = useState({
    postTitle: "",
    postText: "",
    image: "",
    username: auth.getProfile().data.username,
  });
  console.log(formState);
  const [addPost, { error, data }] = useMutation(ADD_POST);

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
      const { data } = await addPost({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="createPostPage">
        <div className="createPostContainer">
          <div className="topCreate">
            <input
              className="postInput"
              placeholder="postTitle"
              name="postTitle"
              type="text"
              value={formState.postTitle}
              onChange={handleChange}
            />
            <div className="divider"></div>
            <input
              type="file"
              name="image"
              value={formState.image}
              onChange={handleChange}
              id="file"
              className="inputfile"
            />
            <label className="postInput" for="file">
              Choose a file
            </label>
          </div>
          <textarea
            className="createBody"
            defaultValue={"..."}
            type="text"
            name="postText"
            value={formState.postText}
            onChange={handleChange}
          />
          <button className="submitButton">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
