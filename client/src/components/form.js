import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "./styles/form.css";
const Form = () => {
  const [formState, setFormState] = useState({
    username: "",
    fullName: "",
    password: "",
    email: "",
    devLvl: "",
    github: "",
  });
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
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit}>
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
            name="reEnterPassword"
            type="password"
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
            placeholder="n00b"
          >
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
          <button>Signup</button>
        </form>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Form;