// import React from "react";
import "./styles/userprofile.css";
import avatar from "../assets/Avatar.png";

import { QUERY_SINGLE_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { navigate, useParams } from "react-router-dom";

function UserProfile() {
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

  return (
    <div className="profilePage" key={User._id}>
      <div className="profileContainer">
        <div className="leftProfile">
          <img className="largeAvatar" src={avatar} alt="avatar" />
          <button className="editProfile">Edit Profile</button>
        </div>
        <div className="rightProfile">
          <div className="topProfile"></div>
        </div>
      </div>
      <p>{User.username}</p>
      <p>{User.DevLvl}</p>
      <p>{User.github}</p>
      <p>{User.bio}</p>
      <p>{User.postTitle}</p>
    </div>
  );
}

export default UserProfile;