import React from "react";
import "./styles/userprofile.css";

import React from "react";
import User from "../../../server/models/User";

function UserProfile() {
  return (
    <div key= {User._id}>
      <img />
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
        
      </section>
    </div>
  );
}

export default UserProfile;
