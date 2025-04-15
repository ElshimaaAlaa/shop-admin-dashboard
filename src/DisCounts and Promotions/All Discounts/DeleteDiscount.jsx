import React, { useState } from "react";
import FailedModal from "../../Components/Modal/Failed Modal/FailedModal";
import { ClipLoader } from "react-spinners";
import axios from "axios";
function DeleteDiscount({ onDelete, id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");

  const handleDeleteDiscount = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${API_BASE_URL}${live_shop_domain}/api/${role}/promotions/delete/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        console.log("success delete promotions");
        setIsLoading(false)
        setShowModal(false)
      }
    } catch (error) {
      console.error("Failed to delete promotions", error);
      setIsLoading(false)
        setShowModal(false)
    }
  };
  return (
    <div>
      <div className=" cursor-pointer" onClick={() => setShowModal(true)}>
        <img
          src="/assets/svgs/deleteIcon.svg"
          alt="delete category"
          className="w-5 ms-2"
        />
      </div>

      <FailedModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="p-5">
          <img
            src="/assets/images/delete_svgrepo.com.png"
            alt="delete-img"
            className="h-14 w-14 p-1"
          />
        </div>
        <p className="font-bold w-72 text-center">
          Are You Sure You Want To Delete This Discount ?
        </p>
        <div className="flex gap-3 mt-5 mb-3">
          <button
            className="rounded p-3 bg-gray-100 text-gray-400 font-bold w-32"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="rounded text-white bg-customred font-bold p-3 w-32"
            onClick={handleDeleteDiscount}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={"22px"} className="text-center" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </FailedModal>
    </div>
  );
}
export default DeleteDiscount;