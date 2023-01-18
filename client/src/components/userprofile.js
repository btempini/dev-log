import React from "react";
import "./styles/userprofile.css";

import { QUERY_SINGLE_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { navigate, useParams } from "react-router-dom";

function UserProfile() {
  //grabs the profile id from the params
  //url looks like heroku/devlog/USER-ID
  const { userId } = useParams();
  console.log(userId);
  //set up query
  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: userId },
  });
  const User = data;
  const Post = {};

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
      <btn>add a post</btn>
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
