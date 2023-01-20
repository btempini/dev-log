import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import "./styles/createpost.css";
import { ADD_POST } from "../utils/mutations";
import auth from "../utils/auth";
import axios from "axios";
const formData = new FormData();

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
  const handleChangeFile = (event) => {
    const { name, files } = event.target;

    setFormState({
      ...formState,
      [name]: files,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //send file information to AWS
    //AWS will return a URL
    // addPost {} = formState image URL
    // send to AWS
    const image = formState.image[0];
    console.log("image log", image);
    formData.append("files", image);
    console.log(formData);
    const AWSresponse = await axios.post(
      `http://localhost:3001/api/bucketRequest/`,
      formData
    );
    console.log(AWSresponse);

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
              files={formState.image}
              onChange={handleChangeFile}
              id="file"
              className="inputfile"
            />
            <label className="postInput" for="file">
              Choose a file
            </label>
          </div>
          <textarea className="createBody" defaultValue={"..."} />
          <button className="submitButton">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
