import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import HistoryList from "./History";
import { NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";

function HistoryModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <NavLink className="nav-link" variant="primary" onClick={handleShow}>
          History
        </NavLink>

        <Modal
          show={show}
          onHide={handleClose}
          size="x20"
          dialogClassName="history-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <HistoryList />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <style>
          {`
        .history-modal {
            max-width: 75vw;
            max-height: 75vw;
            width: 50%;
            height: 50%;
        `}
        </style>
    </>
  );
}

export default HistoryModal;
