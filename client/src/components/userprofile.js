// import React from "react";
import "./styles/userprofile.css";
import avatar from "../assets/Avatar.png";
import React, { useState } from "react";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { navigate, useParams } from "react-router-dom";
import Post from "../components/post";

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
    return <div>workgin !</div>;
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
                <p className="name">Big Poppa</p>
              </div>
              <div className="divider"></div>
              <div className="lookLikeButton">
                <p className="level">Master Dev</p>
              </div>
              <div className="divider"></div>
              <button className="githubButton">Github URL</button>
            </div>
            <div className="bioContainer">
              <h2 className="bioTitle">Bio</h2>
              <p className="bioDescription">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi.
              </p>
            </div>
          </div>
        </div>
      </div>
      <p>{User.username}</p>
      <p>{User.DevLvl}</p>
      <p>{User.github}</p>
      <p>{User.bio}</p>
      {/* <p>{User.postTitle}</p> */}
      <Post posts={Posts} title="your posts..." />
    </div>
  );
}

export default UserProfile;
