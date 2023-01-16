import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <form>
        <input placeholder="Username" name="username" />
        <input placeholder="Password" name="password" />
      </form>
     {/* Link button to Feed page */}
      <button>Login</button>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
    </div>
  );
};

export default Login;
