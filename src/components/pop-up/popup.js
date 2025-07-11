import React from "react";
import Modal from "react-bootstrap/Modal";

function Popup({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header className="modal-bd" closeButton></Modal.Header>
      <Modal.Body className="modal-text">Added to favorites!</Modal.Body>
    </Modal>
  );
}

export default Popup;
