import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import HistoryList from "../History";

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
            <Modal.Title>Playlist History</Modal.Title>
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
            max-width: 100vw;
            max-height: 100vw;
            width: 75%;
            height: 75%;
        `}
        
        </style>
    </>
  );
}

export default HistoryModal;
