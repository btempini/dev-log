// on all pages but home/signup?

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div>
        <Link to="/login">
        <button>Logout</button>
        </Link>
      </div>
      <div>
        <input type="text" placeholder="Find Friends!" />
        {/* link to results page */}
        <button type="button">Search!</button>
      </div>
    </div>
  );
};

export default Header;
