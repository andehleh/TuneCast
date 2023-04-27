import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import HistoryList from "./History";
import { NavLink } from "react-router-dom";

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
        className="color-modal"
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
          max-width: 100vw;
          max-height: 100vw;
          width: 50%;
          height: 50%;
          background-color: #1D8954 !important;

        }
        .object{
          background-color: #1DB954 !important;
        }

        `}
      </style>
    </>
  );
}

export default HistoryModal;
