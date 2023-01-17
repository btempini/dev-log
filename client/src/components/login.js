import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="signUpForm">
      <h1 className="devLog">
        <span>{"<"}</span>dev.log<span>{">"}</span>
      </h1>
      <form>
        <input placeholder="Username" name="username" />
        <input placeholder="Password" name="password" />
      </form>
      {/* Link button to Feed page */}
      <button className="loginButton">Login</button>
      <Link to="/signup">
        <button className="signUpButton">Sign up?</button>
      </Link>
    </div>
  );
};

export default Login;