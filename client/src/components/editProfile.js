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
    username: "",
    fullName: "",
    bio: "",
    devLvl: "",
    github: "",
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
              <div className="leftProfile">
                <img className="largeAvatar" src={avatar} alt="avatar" />
              </div>
              <div className="rightProfile">
                <div className="topProfile">
                  <div className="topButtonContainer">
                    <div className="lookLikeButton">
                      <p className="name">
                        <input
                          placeholder={Profile.username}
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
                          placeholder={Profile.DevLvl}
                          name="devLvl"
                          type="text"
                          value={formState.devLvl}
                          onChange={handleChange}
                        ></input>
                      </p>
                    </div>
                    <div className="divider"></div>
                    <p className="githubButton">
                      <input
                        placeholder={Profile.github}
                        name="github"
                        type="text"
                        value={formState.github}
                        onChange={handleChange}
                      ></input>
                    </p>
                  </div>
                  <div className="bioContainer">
                    <h2 className="bioTitle">Bio</h2>
                    <p className="bioDescription">
                      <input
                        placeholder={Profile.bio}
                        name="bio"
                        type="text"
                        value={formState.bio}
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
      )}
      {error && <div>{error.message}</div>}
    </>
  );
};

export default EditProfile;
