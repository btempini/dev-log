// import React from "react";
import "./styles/userprofile.css";
import avatar from "../assets/Avatar.png";

import { QUERY_SINGLE_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Link, navigate, useParams } from "react-router-dom";
import Post from "../components/post";

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
    console.log(data);
  }

  return (
    <div className="profilePage" key={User._id}>
      <div className="profileContainer">
        <div className="leftProfile">
          <img className="largeAvatar" src={avatar} alt="avatar" />
          <button className="editProfile">Edit Profile</button>
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
              <button className="githubButton">{User.github}</button>
            </div>
            <div className="bioContainer">
              <h2 className="bioTitle">Bio</h2>
              <p className="bioDescription">{User.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="abovePost">
        <Link to="/feed">
          <button className="profileButton">Go to Feed</button>
        </Link>
        <h2 className="recentPosts">Recent Posts...</h2>
        <button className="profileButton">Add a Post</button>
      </div>
      <div className="feedPost">
        <Post posts={Posts} title="your posts..." />
      </div>
    </div>
  );
}

export default UserProfile;
