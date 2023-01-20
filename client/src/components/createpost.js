import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import "./styles/createpost.css";
import { ADD_POST } from "../utils/mutations";

const CreatePost = () => {
  const [formState, setFormState] = useState({
    postTitle: "",
    postText: "",
    image: "",
    username: "",
  });
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
    <div className="createPostPage">
      <div className="createPostContainer">
        <div className="topCreate">
          <input className="postInput" placeholder="postTitle" />
          <div className="divider"></div>
          <input type="file" name="file" id="file" className="inputfile" />
          <label className="postInput" for="file">
            Choose a file
          </label>
        </div>
        <textarea className="createBody" defaultValue={"..."} />
        <button className="submitButton">Submit</button>
      </div>
    </div>
  );
};

export default CreatePost;
