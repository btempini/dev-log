import React from "react";
import videoBg from "../assets/video.mp4";
import './styles/video.css'

const video = () => {
  return <video src={videoBg} autoPlay loop muted />;
};

export default video;