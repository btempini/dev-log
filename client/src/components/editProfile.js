import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/header.css";
import avatar from "../assets/Avatar.png";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "../utils/mutations";

const EditProfile = (User) => {
  const [formState, setFormState] = useState({
    username: "",
    fullName: "",
    devLvl: "",
    github: "",
    bio: "",
  });

  console.log(formState);
  const [editUser, { error, data }] = useMutation(EDIT_USER);

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
      const { data } = await editUser({
        variables: { ...formState },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="profilePage" key={User._id}>
        <div className="profileContainer">
          <div className="leftProfile">
            <img className="largeAvatar" src={avatar} alt="avatar" />
          </div>
          <div className="rightProfile">
            <div className="topProfile">
              <div className="topButtonContainer">
                <div className="lookLikeButton">
                  <p className="name">
                    <input
                      placeholder={User.username}
                      name="username"
                      type="text"
                      value={formState.username}
                      onChange={handleChange}
                    ></input>
                  </p>
                </div>
                <div className="divider"></div>
                <div className="lookLikeButton">
                  <p className="level">
                    <input
                      placeholder={User.DevLvl}
                      name="devLvl"
                      type="text"
                      value={formState.devLvl}
                      onChange={handleChange}
                    ></input>
                  </p>
                </div>
                <div className="divider"></div>
                <button className="githubButton">
                  <input
                    placeholder={User.github}
                    name="github"
                    type="text"
                    value={formState.github}
                    onChange={handleChange}
                  ></input>
                </button>
              </div>
              <div className="bioContainer">
                <h2 className="bioTitle">Bio</h2>
                <p className="bioDescription">
                  <input
                    placeholder={User.bio}
                    name="bio"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                  ></input>
                </p>
              </div>
              <button>Save</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
