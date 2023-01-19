import React from "react";
// import { Link } from "react-router-dom";
import Login from "../components/login";
import Video from "../components/video";
import HomeFooter from "../components/homefooter";

const Home = () => {
  return (
    <div className="hero">
      <Video />
      <div className="overlay"></div>
      <div className="overlay"></div>
      <Login />
      <HomeFooter />
    </div>
  );
};

export default Home;