import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import FailedModal from "../Components/Modal/Failed Modal/FailedModal";
import { ClipLoader } from "react-spinners";
import "./OrderStyle.scss";
function RejectRefundRequests() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleRejectRefund = async () => {
    setIsLoading(true);
    try {
    } catch (error) {}
  };
  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
  return (
    <div>
      <IoIosCloseCircle
        size={30}
        color="#DC2626"
        onClick={() => setShowModal(true)}
      />
      <FailedModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-red-50 rounded-md p-2 mt-5 mb-5">
          <IoIosCloseCircle color="#DC2626" size={30} />
        </div>
        <p className="font-bold text-center text-dark">
          Are You Sure You Want To Reject This <br /> Refund request ?
        </p>
        <div className="mt-5 flex items-center gap-3 ">
          <button
            className="bg-gray-100 text-gray-400 rounded-md p-3 w-40 font-bold"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 rounded-md text-white p-3 w-40 font-bold"
            onClick={handleRejectRefund}
          >
            {isLoading ? <ClipLoader size={22} color="#fff" /> : "Yes , Reject"}
          </button>
        </div>
      </FailedModal>
    </div>
  );
}
export default RejectRefundRequests;