import React from "react";
import "./styles/userprofile.css";
// import User from "../../../server/models/User";
// import Post from "../../../server/models/Post";

// import { QUERY_SINGLE_USER } from "../utils/queries";
// import { useQuery } from "@apollo/client";
// import {navigate, useParams} from "react-router-dom";

function UserProfile() {
//   console.log("Single Query:", QUERY_SINGLE_USER);

//   const [getUser, { error, data }] = useQuery(QUERY_SINGLE_USER, 
//     {
//       variables: {userId: useParams}});

//     const queryUser = async function() {
//   try {

//     const {data} = await getUser()

//   } catch (error) {
//   }
//  }
  
  return (
    // <div key={User._id}>
    //   {/* <img /> */}
    //   {/* name level and github */}
    //   <section>
    //     <h2>{User.username}</h2>
    //     <h2>{User.DevLvl}</h2>
    //     <h2>{User.github}</h2>
    //   </section>
    //   {/* Bio */}
    //   <section>
    //     <p>{User.bio}</p>
    //   </section>
    //   <btn>add a post</btn>
    //   {/* user post */}
    //   <section>
    //     <h3>{User.postTitle}</h3>
    //     <h3>{Post.postedAt}</h3>
    //     {/* <img src={Post.image} /> */}
    //     <p>{Post.postText}</p>
    //   </section>
    //   {/* Friends list */}
    //   <aside>
    //     <h2>Friends</h2>
    //     <ul></ul>
    //     <h3>LUL NO FRIENDS</h3>
    //   </aside>
    // </div>
  );
}

export default UserProfile;
