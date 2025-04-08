import axios from "axios";
import React, { useState } from "react";
import FailedModal from "../Components/Modal/Failed Modal/FailedModal";
import { ClipLoader } from "react-spinners";
import "./customerStyle.scss";
function DeleteCustomer({ onDelete, id }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const handleDeleteCustomer = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${API_BASE_URL}${live_shop_domain}/api/${role}/delete-customer/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        onDelete(id);
        setIsLoading(true);
        console.log("customer deleted successfully");
        setShowModal(true);
      } else {
        console.error("Failed to delete customer");
        setShowModal(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to delete customer", error);
      setShowModal(false);
      setIsLoading(false);
    }
  };
  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
  return (
    <div>
      <button className=" p-1" onClick={() => setShowModal(true)}>
        <img
          src="/assets/svgs/deleteIcon.svg"
          alt="delete category"
          className="w-5 ms-2"
        />
      </button>
      <FailedModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="p-5">
          <img
            src="/assets/images/delete_svgrepo.com.png"
            alt="delete-img"
            className="h-14 w-14 p-1"
          />
        </div>
        <p className="font-bold w-72 text-center">
          Are You Sure You Want To Delete This Customer ?
        </p>
        <div className="flex gap-3 mt-5 mb-3">
          <button
            className="rounded p-3 bg-gray-100 text-gray-500 font-bold w-32"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="rounded text-white bg-customred font-bold p-3 w-32"
            onClick={handleDeleteCustomer}
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
export default DeleteCustomer;
