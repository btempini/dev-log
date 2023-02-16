// import React from "react";
import "./styles/userprofile.css";
import Loading from "./loading";
import React, { useEffect, useState } from "react";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Post from "../components/post";
import EditProfile from "./editProfile";
import auth from "../utils/auth";

function UserProfile() {
  const [editState, setEditState] = useState(false);
  const [meState, setMeState] = useState(false);
  const [followingState, setFollowingState] = useState(false);
  //grabs the profile id from the params
  //url looks like heroku/devlog/USER-ID
  const { userId } = useParams();

  const loggedInUser = auth.getProfile();

  const userDataRaw = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: loggedInUser.data._id },
  });
  const userData = userDataRaw.data;
  console.log(userData);
  // const friends = userData.data.user.friends;
  // console.log(friends);
  if (userData) {
    let friends = userData.user.friends;
    console.log(friends);
    friends.map((friend) => {
      console.log(friend.friendId);
      if (friend._id === userId) {
        setFollowingState(true);
        console.log(followingState);
      }
    });
  }

  //set up query

  const { loading, data, error } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: userId },
  });

  const User = data?.user || {};
  const Posts = User.posts;
  const gitHubLink = `https://github.com/${User.github}`;
  const mailLink = `mailto:${User.email}`;

  useEffect(() => {
    if (auth.loggedIn() && auth.getProfile().data._id === userId) {
      setMeState(true);
    }
  }, []);

  if (loading) {
    //basic loading bar
    return <Loading />;
  }

  if (editState) {
    return <EditProfile User={User} />;
  }

  return (
    <div className="profilePage" key={User._id}>
      <div className="profileContainer">
        <div className="leftProfile">
          <img className="largeAvatar" src={User.profilePhoto} alt="avatar" />
          {meState ? (
            <>
              <button
                className="editProfile"
                onClick={() => setEditState(true)}
              >
                Edit Profile
              </button>
              <button className="updateProfilePhoto">
                <Link to={"/addPfp"} User={User}>
                  Update Profile Picture
                </Link>
              </button>
            </>
          ) : (
            <>
              <button className="profileButton">Follow</button>
            </>
          )}
        </div>
        <div className="rightProfile">
          <div className="topProfile">
            <div className="topButtonContainer">
              <div className="profileTagWrapper">
                <p>Name</p>
                <div className="lookLikeButton">
                  <p className="name">{User.username}</p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="profileTagWrapper">
                <p>Level</p>
                <div className="lookLikeButton">
                  <p className="level">{User.DevLvl}</p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="profileTagWrapper">
                <p>Email</p>
                <a href={mailLink} target="_blank">
                  <button className="emailButton">{User.email}</button>
                </a>
              </div>
              <div className="divider"></div>
              <div className="profileTagWrapper">
                <p>Github</p>
                <a href={gitHubLink} target="_blank">
                  <button className="emailButton">{User.github}</button>
                </a>
              </div>
            </div>
          </div>
          <div className="bioContainer">
            <h2 className="bioTitle">Bio</h2>
            <p className="bioDescription">{User.bio}</p>
          </div>
        </div>
      </div>
      <div className="abovePost">
        <Link to="/feed">
          <button className="profileButton">Go to Feed</button>
        </Link>
        <h2 className="recentPosts">Recent Posts...</h2>
        <button className="profileButton">
          <Link className="alternate" to={"/addPost"}>
            Add a Post
          </Link>
        </button>
      </div>
      <div className="feedPost">
        <Post posts={Posts} title="your posts..." />
      </div>
    </div>
  );
}

export default UserProfile;
