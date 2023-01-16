import React from "react";
// import { Link } from "react-router-dom";

const Form = () => {
  return (
    <form>
      <input placeholder="Username" name="username" />
      <input placeholder="Full Name" name="fullName" />
      <input placeholder="Password" name="password" />
      <input placeholder="Re-enter Password" name="reEnterPassword" />
      <input placeholder="Email" name="email" />
      <select>
        <option selected="selected" name="level">
          n00b
        </option>
        <option>Junior Dev</option>
        <option>Master Dev</option>
        <option>Ben</option>
      </select>
      <input placeholder="Github URL" name="githubUrl" />
      {/* Link button to Feed page */}
      <button>Signup</button>
    </form>
  );
};

export default Form;