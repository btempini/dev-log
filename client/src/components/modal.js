import React from "react";
import { Link } from "react-router-dom";
import "./styles/modal.css";

function modal() {
  return (
    <div className="modalContainer">
      <div className="modal">
        <Link to="/signup">
          <div className="close"></div>
        </Link>
        <h1 className="errorMessage">Error Can Go Here!</h1>
      </div>
    </div>
  );
}

export default modal;
