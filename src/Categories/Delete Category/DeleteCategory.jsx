import React, { useState } from "react";
import FailedModal from "../../Components/Modal/Failed Modal/FailedModal";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { RiDeleteBin6Fill } from "react-icons/ri";

function DeleteCategory({ id, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteCategory = async () => {
    setIsLoading(true);
    if (!id) {
      console.error("ID is missing");
      return; // Prevent the API call if ID is missing
    }
    try {
      const response = await axios({
        method: "GET",
        url: `https://demo.vrtex.duckdns.org/api/shop/categories/delete/${id}`,
        headers: {
          Authorization:
            "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990",
        },
      });
      if (response.status === 200) {
        onDelete(id);
        setIsLoading(true);
        console.log("Category deleted successfully");
        setShowModal(true);
      } else {
        console.error("Failed to delete category");
        setShowModal(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to delete category", error);
      setShowModal(false);
      setIsLoading(false);
    }
  };
  return (
    <div>
      {/* Delete Category Button */}
      <button className="h-6 w-6 p-1" onClick={() => setShowModal(true)}>
        <RiDeleteBin6Fill className=" text-red-500" size={18}  />
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
          Are You Sure You Want To Delete This Category ?
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
            onClick={handleDeleteCategory}
          >
            {isLoading ? <ClipLoader color="#fff" size={"22px"} className="text-center" /> : "Delete"}
          </button>
        </div>
      </FailedModal>
    </div>
  );
}
export default DeleteCategory;