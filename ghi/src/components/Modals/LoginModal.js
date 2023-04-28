import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import LoginForm from "../LoginForm";

function LoginModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <NavLink className="nav-link" variant="primary" onClick={handleShow}>
          Login
        </NavLink>

        <Modal
          show={show}
          onHide={handleClose}
          size="x20"
          dialogClassName="login-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <style>
          {`
        .login-modal {
            max-width: 75vw;
            max-height: 75vw;
            width: 50%;
            height: 50%;
        `}
        </style>
    </>
  );
}

export default LoginModal;
