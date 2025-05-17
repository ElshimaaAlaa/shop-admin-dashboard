import axios from "axios";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import FailedModal from "../Components/Modal/Failed Modal/FailedModal";
import { ClipLoader } from "react-spinners";
import "./OrderStyle.scss";

function RejectRefundRequests({ order_id, status }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const handleCancelOrder = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios({
        url: `${API_BASE_URL}${live_shop_domain}/api/${role}/orders/respond-cancel-request`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        data: {
          order_id: order_id,
          status: status,
        },
      });

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        setErrorMessage(error.response.data.message || "Request failed");
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };
  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
  return (
    <div>
      <div className="  cursor-pointer">
        <IoIosCloseCircle
          color="#DC2626"
          size={30}
          className="cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </div>
      <FailedModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-red-50 rounded-md p-2 mt-5 mb-5">
          <IoIosCloseCircle color="#DC2626" size={30} />
        </div>
        <p className="font-bold text-center">
          Are You Sure You Want To Reject This <br /> Refund Request?
        </p>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mt-2">
            {errorMessage}
          </p>
        )}

        <div className="mt-5 flex items-center gap-3">
          <button
            className="bg-gray-100 text-gray-400 rounded-md p-3 w-40 font-bold"
            onClick={() => {
              setShowModal(false);
              setErrorMessage("");
            }}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 rounded-md text-white p-3 w-40 font-bold"
            onClick={handleCancelOrder}
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader size={22} color="#fff" /> : "Yes, Cancel"}
          </button>
        </div>
      </FailedModal>
    </div>
  );
}
export default RejectRefundRequests;