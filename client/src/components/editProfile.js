import avatar from "../assets/Avatar.png";
import "./styles/editprofile.css";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "../utils/mutations";
import auth from "../utils/auth";
import React, { useState } from "react";

const EditProfile = (User) => {
  console.log(User);
  let Profile = User.User;
  const [formState, setFormState] = useState({
    username: Profile.username,
    fullName: Profile.fullName,
    bio: Profile.bio,
    devLvl: Profile.devLvl,
    github: Profile.github,
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
        variables: { userId: Profile._id, ...formState },
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (!auth.loggedIn()) {
    console.log("You were not authorized");
    return <div>You are not authorized to edit profile</div>;
  }
  return (
    <>
      {data ? (
        (window.location.href = `/profile/${Profile._id}`)
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="profilePage" key={Profile._id}>
            <div className="profileContainer">
              <div className="rightProfile">
                <div className="topProfile">
                  <div className="topButtonContainer">
                    <input
                      className="lookLikeButton"
                      placeholder={Profile.username}
                      name="username"
                      type="text"
                      value={formState.username}
                      // onChange={handleChange}
                    ></input>
                    <div className="divider"></div>
                    <select
                      className="lookLikeButton select"
                      placeholder={Profile.DevLvl}
                      name="devLvl"
                      type="text"
                      value={formState.devLvl}
                      onChange={handleChange}
                    >
                      <option>n00b</option>
                      <option>Junior Dev</option>
                      <option>Master Dev</option>
                      <option>Ben</option>
                    </select>
                    <div className="divider"></div>
                    <input
                      className="lookLikeButton wider"
                      placeholder={Profile.github}
                      name="github"
                      type="text"
                      value={formState.github}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="bioContainer">
                    <h2 className="bioTitle">Bio</h2>
                    <textarea
                      className="bioInput"
                      placeholder={Profile.bio}
                      name="bio"
                      type=""
                      value={formState.bio}
                      onChange={handleChange}
                    ></textarea>
                    <button className="saveButton">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      {error && <div>{error.message}</div>}
    </>
  );
};

export default EditProfile;
