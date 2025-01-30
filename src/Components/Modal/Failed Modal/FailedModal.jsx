import React from "react";
import "./Modal.scss";
function FailedModal({ isOpen, children, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modalContent modal-width" id="modal-width">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
export default FailedModal;
