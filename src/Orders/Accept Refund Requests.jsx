import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import FailedModal from "../Components/Modal/Failed Modal/FailedModal";
function AcceptRefundRequests() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleAcceptRefund = async () => {
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
      <FaCheckCircle size={26} color="#34B41E" onClick={()=>setShowModal(true)}/>
      <FailedModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-[#FCEFDB] rounded-md p-2 mt-5 mb-5 cursor-pointer">
          <FaCheckCircle color="#E0A75E" size={30} className="cursor-pointer"/>
        </div>
        <p className="font-bold text-center text-dark">
          Are You Sure You Want To Accept This <br /> Refund request ?
        </p>
        <div className="mt-5 flex items-center gap-3 ">
          <button
            className="bg-gray-100 text-gray-400 rounded-md p-3 w-40 font-bold"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-primary rounded-md text-white p-3 w-40 font-bold"
            onClick={handleAcceptRefund}
          >
            {isLoading ? <ClipLoader size={22} color="#fff" /> : "Accept"}
          </button>
        </div>
      </FailedModal>
    </div>
  );
}
export default AcceptRefundRequests;