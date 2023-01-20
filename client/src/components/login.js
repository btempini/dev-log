import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/login.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
// import Modal from "./modal.js"

import Auth from "../utils/auth";

const Login = (props) => {
  // const [modalError, setModalError] = useState("")
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    // if (password and/or email do not match ) {
    // setModalError({
      // message: Invalid email and/or password
    // });
    // return;
    // }
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <>
      {data ? (
        (window.location.href = "/feed")
      ) : (
        <div className="signUpForm">
          {/* {modalError&& <Modal message={modalError.message}} /> */}
          <h1 className="devLog">
            <span>{"<"}</span>dev.log<span>{">"}</span>
          </h1>
          <form className="loginFormEl" onSubmit={handleFormSubmit}>
            <input
              type="email"
              placeholder="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button className="loginButton">Login</button>
          </form>
          {/* Link button to Feed page */}
          <Link to="/signup">
            <button className="signUpButton">Sign up?</button>
          </Link>
        </div>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </>
  );
};

export default Login;
