import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { EDIT_USER } from "../utils/mutations";

import axios from "axios";
const formData = new FormData();

const AddPfp = () => {
  const navigate = useNavigate();
  const userId = auth.getProfile().data._id;
  console.log(userId);

  const [formState, setFormState] = useState({
    fullName: "",
    bio: "",
    devLvl: "",
    github: "",
    userId: auth.getProfile().data._id,
    username: auth.getProfile().data.username,
    profilePhoto: "",
  });

  const Userdata = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: userId },
  });

  const [editUser, { error, data }] = useMutation(EDIT_USER);
  console.log(Userdata);
  const User = Userdata.data;

  if (Userdata.loading) {
    return <div>Loading...</div>;
  } else {
    setFormState({
      fullName: User.fullname,
      bio: User.bio,
      devLvl: User.devLvl,
      github: User.github,
      userId: auth.getProfile().data._id,
      username: auth.getProfile().data.username,
      profilePhoto: "",
    });
  }

  console.log(User);

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
      // AWS request
      const AWSresponse = await axios.post(
        `http://localhost:3001/api/bucketRequest/${process.env.REACT_APP_SECRET_CODE}`,
        formData
      );
      console.log(AWSresponse);

      console.log("image log", image.name);
      //set form state to image url
      const userData = {
        image: `https://devlog-bucket-2023.s3.us-west-1.amazonaws.com/${image.name}`,
        userId: formState.userId,
        username: formState.username,
        fullName: formState.fullName,
        bio: formState.bio,
        devLvl: formState.devLvl,
        github: formState.github,
      };
      //update DB
      console.log(userData);
      const { data } = await editUser({
        variables: { ...userData },
      });
      navigate(`/profile/${auth.getProfile().data._id}`);
    } catch (error) {
      console.log(JSON.stringify(error));
      console.log("AWS IS DOWN");
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="createPostPage">
          <div className="createPostContainer">
            <div className="topCreate">
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

            <button className="submitButton">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPfp;