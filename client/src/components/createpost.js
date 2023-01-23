import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/createpost.css";
import { ADD_POST } from "../utils/mutations";
import auth from "../utils/auth";
import axios from "axios";
const formData = new FormData();

const CreatePost = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    postTitle: "",
    postText: "",
    image: "",
    username: auth.getProfile().data.username,
  });
  console.log(formState);
  const [addPost, { error, data }] = useMutation(ADD_POST);
  console.log(addPost);

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

    formData.append("files", image);
    console.log(formData);
    try {
      if (image) {
        const AWSresponse = await axios.post(
          `http://localhost:3001/api/bucketRequest/${process.env.REACT_APP_SECRET_CODE}`,
          formData
        );
        console.log(AWSresponse);
        console.log("image log", image.name);
        //set form state to image url
        const postData = {
          postTitle: formState.postTitle,
          postText: formState.postText,
          image: `https://devlog-bucket-2023.s3.us-west-1.amazonaws.com/${image.name}`,
          username: formState.username,
        };
        //update DB
        console.log(formState);
        //update DB
        console.log(formState);
        // AWS request
        const { data } = await addPost({
          variables: { ...postData },
        });
        navigate("/feed");
      } else {
        const postData = {
          postTitle: formState.postTitle,
          postText: formState.postText,
          username: formState.username,
        };
        //update DB
        console.log(formState);
        // AWS request
        const { data } = await addPost({
          variables: { ...postData },
        });
        navigate("/feed");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      console.log("AWS IS DOWN");
      navigate("/feed");
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="createPostPage">
        <div className="createPostContainer">
          <div className="topCreate">
            <div className="profileTagWrapper">
              <input
                className="postInput"
                placeholder="postTitle"
                name="postTitle"
                type="text"
                value={formState.postTitle}
                onChange={handleChange}
              />
            </div>
            <div className="divider"></div>
            <div className="profileTagWrapper">
              <p>Upload Image</p>
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
          </div>
          <textarea
            name="postText"
            className="createBody"
            placeholder="..."
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
