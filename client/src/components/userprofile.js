import React from "react";
import "./styles/userprofile.css";

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
  const Post = {};
  //waits till loading is not true to assign the User value to query data
  if (loading) {
    //basic loading bar
    return <div>Loading...</div>;
  } else {
    User = data.user;
    console.log(User);
  }

  return (
    <div key={User._id}>
      {/* <img /> */}
      {/* name level and github */}
      <section>
        <h2>{User.username}</h2>
        <h2>{User.DevLvl}</h2>
        <h2>{User.github}</h2>
      </section>
      {/* Bio */}
      <section>
        <p>{User.bio}</p>
      </section>
      {/* user post */}
      <section>
        <h3>{User.postTitle}</h3>
        <h3>{Post.postedAt}</h3>
        {/* <img src={Post.image} /> */}
        <p>{Post.postText}</p>
      </section>
      {/* Friends list */}
      <aside>
        <h2>Friends</h2>
        <ul></ul>
        <h3>LUL NO FRIENDS</h3>
      </aside>
    </div>
  );
}

export default UserProfile;
