import React from "react";
// import { Link } from "react-router-dom";
import "./styles/form.css";
const Form = () => {
  return (
    <div className="signupContainer">
      <div className="leftHero"></div>
      <div className="rightForm">
        <form className="signupForm">
          <h1 className="signupHeader">Please enter your info...</h1>
          <input placeholder="Username" name="username" />
          <input placeholder="Full Name" name="fullName" />
          <input placeholder="Password" name="password" />
          <input placeholder="Re-enter Password" name="reEnterPassword" />
          <input placeholder="Email" name="email" />
          <select name="level">
            <option selected="selected">n00b</option>
            <option>Junior Dev</option>
            <option>Master Dev</option>
            <option>Ben</option>
          </select>
          <input placeholder="Github URL" name="githubUrl" />
          {/* Link button to Feed page */}
          <button className="signupPageButton">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
