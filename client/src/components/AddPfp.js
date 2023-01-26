import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { EDIT_USER } from "../utils/mutations";

const AddPfp = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [formState, setFormState] = useState({
    image: "",
    user: {},
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
          console.log(formState);
        }
      }
    );
  }, [formState]);
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
    // const image = formState.image[0];

    // formData.append("files", image);
    // console.log(formData);
    try {
      // AWS request
      // const AWSresponse = await axios.post(
      //   `http://localhost:3001/api/bucketRequest/${process.env.REACT_APP_SECRET_CODE}`,
      //   formData
      // );
      // console.log(AWSresponse);

      // console.log("image log", image.name);
      const userInfo = {
        profilePhoto: formState.image,
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
                name="image"
                files={formState.image}
                onChange={handleChangeFile}
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

            <button className="submitButton">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPfp;
