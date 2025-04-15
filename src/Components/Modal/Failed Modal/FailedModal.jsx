import React from "react";
import "./Modal.scss";
function FailedModal({ isOpen, children, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modalContent modal-width rounded-md w-96" id="modal-width">
        <div className="modal-content flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
export default FailedModal;