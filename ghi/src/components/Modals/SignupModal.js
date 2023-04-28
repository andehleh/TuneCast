import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import Signup from "../Signup";

function SignupModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavLink className="nav-link" variant="primary" onClick={handleShow}>
        Sign Up
      </NavLink>

      <Modal
        show={show}
        onHide={handleClose}
        size="x20"
        dialogClassName="signup-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Signup />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <style>
        {`
        .signup-modal {
            max-width: 75vw;
            max-height: 75vw;
            width: 50%;
            height: 50%;

        `}
      </style>
    </>
  );
}

export default SignupModal;
