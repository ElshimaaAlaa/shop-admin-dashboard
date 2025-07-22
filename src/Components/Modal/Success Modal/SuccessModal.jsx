import "./Modal.scss";
function SuccessModal({ isOpen, children, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay rounded">
      <div className="modalContent modal-width rounded" id="modal-width">
        <div className="modal-content flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
export default SuccessModal;
