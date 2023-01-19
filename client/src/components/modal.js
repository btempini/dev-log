import React from "react";
import { Link } from "react-router-dom";
import "./styles/modal.css";

const Modal = (props) => {
  return (
    <div className="modalContainer">
      <div className="modal">
        <Link to="/">
          <button className="close"></button>
        </Link>
        <h1 className="errorMessage">{props.message}</h1>
      </div>
    </div>
  );
};

export default Modal;
