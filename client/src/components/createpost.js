import { useMutation } from "@apollo/client";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/createpost.css";
import { ADD_POST } from "../utils/mutations";
import auth from "../utils/auth";
const formData = new FormData();

const CreatePost = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [formState, setFormState] = useState({
    postTitle: "",
    postText: "",
    image: "",
    username: auth.getProfile().data.username,
  });

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: `${process.env.REACT_APP_SECRET_CODE}`,
        uploadPreset: "qzeis8oj",
        styles: {
          palette: {
            window: "#000000",
            windowBorder: "#90A0B3",
            tabIcon: "#18ECD8",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#18ECD8",
            link: "#18ECD8",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#F44235",
            inProgress: "#18ECD8",
            complete: "#20B832",
            sourceBg: "#000000",
          },
          fonts: {
            default: {
              active: true,
            },
          },
        },
      },
      async function (error, response) {
        if (response.event === "success") {
          console.log(response.info.url);
          console.log("formState", formState);
          setFormState({ ...formState, image: response.info.url });
        }
      }
    );
  }, [formState]);
  const navigate = useNavigate();
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
    const image = formState.image[0];

    formData.append("files", image);
    console.log(formData);
    try {
      if (image) {
        //set form state to image url
        const postData = {
          postTitle: formState.postTitle,
          postText: formState.postText,
          image: formState.image,
          username: formState.username,
        };

        const { data } = await addPost({
          variables: { ...postData },
        });
        window.location.replace("/feed");
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
        window.location.replace("/feed");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      console.log("Upload Error");
      window.location.replace("/feed");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="createPostPage">
        <div className="createPostContainer">
          <div className="topCreate">
            <div className="profileTagWrapper">
              <p>Title</p>
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
                name="image"
                files={formState.image}
                // onChange={handleChangeFile}
                id="file"
                className="inputfile"
                onClick={() => {
                  widgetRef.current.open();
                  // handleChangeFile();
                }}
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
