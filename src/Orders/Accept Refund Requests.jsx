import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import FailedModal from "../Components/Modal/Failed Modal/FailedModal";
import SuccessModal from "../Components/Modal/Success Modal/SuccessModal";
function AcceptRefundRequests({ order_id, status, amount, items_count }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const handleAcceptRefund = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}${live_shop_domain}/api/${role}/orders/respond-return-request`,
        {
          order_id: Number(order_id),
          status: "accepted",
          amount: Number(items_count),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setShowModal(false);
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error(
        "Full error details:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || "Failed to process refund");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <FaCheckCircle
        size={26}
        className="cursor-pointer hover:opacity-80 transition-opacity"
        color="#34B41E"
        onClick={() => setShowModal(true)}
      />
      {showModal &&
        (success ? (
          <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
            <div className="bg-green-100 rounded-md p-2 mt-5 mb-5 flex justify-center">
              <FaCheckCircle color="#34B41E" size={30} />
            </div>
            <p className="font-bold text-center text-dark">
              Refund for order #{items_count} accepted successfully!
            </p>
          </SuccessModal>
        ) : (
          <FailedModal isOpen={showModal} onClose={() => setShowModal(false)}>
            <div className="bg-[#FCEFDB] rounded-md p-2 mt-5 mb-5 flex justify-center">
              <FaCheckCircle color="#E0A75E" size={30} />
            </div>
            <p className="font-bold text-center text-dark">
              Are You Sure You Want To Accept This Refund Request?
            </p>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                className="bg-gray-100 text-gray-400 rounded-md p-3 w-40 font-bold hover:bg-gray-200 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary rounded-md text-white p-3 w-40 font-bold hover:bg-opacity-90 transition-colors"
                onClick={handleAcceptRefund}
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader size={22} color="#fff" /> : "Accept"}
              </button>
            </div>
          </FailedModal>
        ))}
    </div>
  );
}

export default AcceptRefundRequests;
