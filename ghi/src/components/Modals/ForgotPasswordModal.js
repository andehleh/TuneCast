import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import ForgotPassword from "./Modals/ForgotPasswordModal";

function ForgotPasswordModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <Modal
          show={show}
          onHide={handleClose}
          size="x20"
          dialogClassName="login-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ForgotPassword />
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

export default ForgotPasswordModal;
