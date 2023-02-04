import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "./styles/form.css";
import Modal from "./modal.js";

const Loading = () => {
  return (
    <div>
      <h1>Loading!</h1>
    </div>
  );
};

export default Loading;
