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

  //get current user info !
  //create an object with that info !
  //create form state !
  //handle change file !
  //create a handleform submit
  //update new object with current form state
  //pass form state to aws
  //pass aws url to our new object
  //use mutation and pass new object to editUser
  //take new object with file info

  const User = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: auth.getProfile().data._id },
  });
  let user = {};
  const [editUser, { error, data }] = useMutation(EDIT_USER);
  const [formState, setFormState] = useState({
    image: "",
    user: {},
  });
  if (User.loading) {
    return <>loading...</>;
  } else {
    console.log(User.data);
    user = User.data;
    // setFormState({ image: formState.image, user: user });
  }
  console.log(user);

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
      const userInfo = {
        profilePhoto: `https://devlog-bucket-2023.s3.us-west-1.amazonaws.com/${image.name}`,
        userId: user.user._id,
        username: user.user.username,
        fullName: user.user.fullName,
        bio: user.user.bio,
        devLvl: user.user.DevLvl,
        github: user.user.github,
      };

      console.log(userInfo);

      const { data } = await editUser({
        variables: { ...userInfo },
      });
      navigate(`/profile/${auth.getProfile().data._id}`);
    } catch (error) {
      console.log(JSON.stringify(error));
      console.log("AWS IS DOWN");
    }
  };

  const handleChangeFile = (event) => {
    const { name, files } = event.target;

    setFormState({
      ...formState,
      [name]: files,
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="createPostPage">
          <div className="createPostContainer">
            <div className="topCreate">
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
