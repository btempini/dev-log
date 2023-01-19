import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "./styles/form.css";
import Modal from "./modal.js";

const Form = () => {
  const [formState, setFormState] = useState({
    username: "",
    fullName: "",
    password: "",
    email: "",
    devLvl: "",
    github: "",
    passwordVerify: "",
  });
  console.log(formState);
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
    //password verify RETURNS ALERT NEEDS TO BE MODAL
    if (formState.password !== formState.passwordVerify) {
      console.log("Hitting if statement.");
      return <Modal />;
    }
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {data ? (
        (window.location.href = "/feed")
      ) : (
        <div className="signupContainer">
          <Modal />
          <div className="leftHero"></div>
          <div className="rightForm">
            <form className="signupForm" onSubmit={handleFormSubmit}>
              <h1 className="signupHeader">Please enter your info...</h1>
              <input
                placeholder="Username"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                placeholder="Full Name"
                name="fullName"
                type="text"
                value={formState.fullName}
                onChange={handleChange}
              />
              <input
                placeholder="Password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <input
                placeholder="Re-enter Password"
                name="passwordVerify"
                type="password"
                value={formState.passwordVerify}
                onChange={handleChange}
              />
              <input
                placeholder="Email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <select
                selected="selected"
                name="devLvl"
                value={formState.devLvl}
                onChange={handleChange}
                placeholder="Please select your level."
              >
                <option>Please select a level.</option>
                <option>n00b</option>
                <option>Junior Dev</option>
                <option>Master Dev</option>
                <option>Ben</option>
              </select>
              <input
                placeholder="Github Name"
                name="github"
                value={formState.github}
                onChange={handleChange}
              />
              {/* Link button to Feed page */}
              <button className="signupPageButton">Signup</button>
            </form>
          </div>
        </div>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Form;
