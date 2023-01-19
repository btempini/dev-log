import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/modal.css";

function Modal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <div show={show} onHide={handleClose} className="modalContainer">
      <div className="modal">
        <Link to="/signup">
          <div onClick={handleClose} className="close"></div>
        </Link>
        <h1 className="errorMessage">Error Can Go Here!</h1>
      </div>
    </div>
  );
}

export default Modal;
