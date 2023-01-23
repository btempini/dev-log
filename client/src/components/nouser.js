import React from "react";
import "./styles/nouser.css";
import { Link } from "react-router-dom";

function NoUser() {
  return (
    <div className="userError">
      <h1 className="noUser">No User Found</h1>
      <div className="returnBtn">
      <Link to="/feed">
        <button className="returnFeed">Return to feed</button>
        </Link>
      </div>
    </div>
  );
}

export default NoUser;
