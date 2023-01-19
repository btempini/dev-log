// import React from "react";
import "./styles/userprofile.css";
import avatar from "../assets/Avatar.png";
import React, { useState } from "react";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { navigate, useParams } from "react-router-dom";
import Post from "../components/post";
import EditProfile from "./editProfile";

function UserProfile() {
  const [editState, setEditState] = useState(false);
  //grabs the profile id from the params
  //url looks like heroku/devlog/USER-ID
  const { userId } = useParams();
  console.log(useQuery);
  //set up query
  const { loading, data, error } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: userId },
  });
  //Define user to be reassigned to data later
  let User = "";
  let Posts = [];
  //waits till loading is not true to assign the User value to query data
  if (loading) {
    //basic loading bar
    return <div>Loading...</div>;
  } else {
    User = data.user;
    Posts = User.posts;
    console.log(User);
    console.log(Posts);
  }

  if (editState) {
    return <EditProfile User={User} />;
  }

  return (
    <div className="profilePage" key={User._id}>
      <div className="profileContainer">
        <div className="leftProfile">
          <img className="largeAvatar" src={avatar} alt="avatar" />
          <button className="editProfile" onClick={() => setEditState(true)}>
            Edit Profile
          </button>
        </div>
        <div className="rightProfile">
          <div className="topProfile">
            <div className="topButtonContainer">
              <div className="lookLikeButton">
                <p className="name">{User.username}</p>
              </div>
              <div className="divider"></div>
              <div className="lookLikeButton">
                <p className="level">{User.DevLvl}</p>
              </div>
              <div className="divider"></div>
              <button className="githubButton">Github:{User.github}</button>
            </div>
            <div className="bioContainer">
              <h2 className="bioTitle">Bio</h2>
              <p className="bioDescription">{User.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <Post posts={Posts} title="your posts..." />
    </div>
  );
}

export default UserProfile;
