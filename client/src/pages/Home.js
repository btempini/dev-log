import React from "react";
// import { Link } from "react-router-dom";
import Login from "../components/login";
import Video from "../components/video";

const Home = () => {
  return (
    <div className="hero">
      <Video />
      <div className="overlay"></div>
      <div className="overlay"></div>
      <Login />
    </div>
  );
};

export default Home;
