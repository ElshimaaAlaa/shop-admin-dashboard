import React from "react";
import "./Modal.scss";
function SuccessModal({ isOpen, children, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay rounded">
      <div className="modalContent modal-width rounded" id="modal-width">
        <div className="modal-content flex flex-col justify-center items-center">
          <img src="/assets/images/success.png" alt="success"  className="w-32 mt-6"/>
          {children}
        </div>
      </div>
    </div>
  );
}
export default SuccessModal;
