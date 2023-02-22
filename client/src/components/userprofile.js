// import React from "react";
import "./styles/userprofile.css";
import Loading from "./loading";
import React, { useEffect, useState } from "react";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Post from "../components/post";
import EditProfile from "./editProfile";
import auth from "../utils/auth";
import { ADD_FOLLOWER } from "../utils/mutations";

function UserProfile() {
  const [editState, setEditState] = useState(false);
  const [meState, setMeState] = useState(false);
  const [followingState, setFollowingState] = useState(false);
  const [addFollower] = useMutation(ADD_FOLLOWER);
  //grabs the profile id from the params
  //url looks like heroku/devlog/USER-ID
  const { userId } = useParams();

  const loggedInUser = auth.getProfile();

  const userDataRaw = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: loggedInUser.data._id },
    skip: !loggedInUser.data._id, // skip the query if the user is not logged in
    fetchPolicy: "network-only", // force the query to fetch data from the server, not the cache
  });
  const userData = userDataRaw.data;
  console.log(userData);

  //set up query

  const {
    loading: userLoading,
    data: userData2,
    error: userError,
  } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: userId },
  });

  const User = userData2?.user || {};
  const Friends = User.friends;
  const Posts = User.posts;
  const gitHubLink = `https://github.com/${User.github}`;
  const mailLink = `mailto:${User.email}`;
  console.log(Friends);

  useEffect(() => {
    if (auth.loggedIn() && auth.getProfile().data._id === userId) {
      setMeState(true);
    }

    if (userData) {
      let friends = userData.user.friends;
      console.log(friends);
      friends.map((friend) => {
        console.log(friend.friendId);
        console.log(userId);
        if (friend.friendId === userId) {
          setFollowingState(true);
          console.log(followingState);
        }
      });
    }
    // if (userDataRaw.data) {
    //   checkFollow();
    // }
  }, [userData, userId, userDataRaw.data]);

  const handleAddFriend = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addFollower({
        variables: {
          userId: loggedInUser.data._id,
          followingId: userId,
          followingUsername: User.username,
        },
      });
      window.location.reload();
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  };

  if (userDataRaw.loading || userLoading) {
    return <Loading />;
  }

  if (userDataRaw.error || userError) {
    return <div>Failed to load user data</div>;
  }

  if (userLoading) {
    //basic loading bar
    return <Loading />;
  }

  if (editState) {
    return <EditProfile User={User} />;
  }
  console.log(Friends.length);
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
          ) : followingState ? (
            <>
              <button className="profileButton">Following!</button>
            </>
          ) : (
            <>
              {" "}
              <>
                <button onClick={handleAddFriend} className="profileButton">
                  Follow
                </button>
              </>
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
          <div className="bioContainer">
            <h2 className="bioTitle">Follows:</h2>
            {Friends.length !== 0 ? (
              Friends.map((friend) => (
                <p>
                  <Link reloadDocument to={`/profile/${friend.friendId}`}>
                    {friend.friendUsername}
                  </Link>
                </p>
              ))
            ) : (
              <p>No one...console.log("Thats sad!)"</p>
            )}
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
