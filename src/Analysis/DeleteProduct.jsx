import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import FailedModal from "../Components/Modal/Failed Modal/FailedModal";
import "./DeleteModal.scss";
function Delete({ id, onDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const handleDeleteProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: `${API_BASE_URL}${live_shop_domain}/api/${role}/products/delete/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        console.log("Product deleted successfully");
        setShowModal(false);
        setIsLoading(false);
        onDelete(id);
      } else {
        setIsLoading(false);
        console.error("Failed to delete product");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to delete product", error);
    }
  };
  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        <img
          src="/assets/svgs/deleteIcon.svg"
          alt="delete product"
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
          Are You Sure You Want To Delete This Product ?
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
            onClick={handleDeleteProduct}
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
export default Delete;