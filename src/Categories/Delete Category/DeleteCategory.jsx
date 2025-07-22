import { useState } from "react";
import FailedModal from "../../Components/Modal/Failed Modal/FailedModal";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./DeleteModal.scss";
import { useTranslation } from "react-i18next";
function DeleteCategory({ id, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const { t } = useTranslation();
  const handleDeleteCategory = async () => {
    setIsLoading(true);
    if (!id) {
      console.error("ID is missing");
      return; // Prevent the API call if ID is missing
    }
    try {
      const response = await axios({
        method: "GET",
        url: `http://${live_shop_domain}/api/${role}/categories/delete/${id}`,
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
  return (
    <div>
      <button className="mt-" onClick={() => setShowModal(true)}>
        <img
          src="/assets/svgs/deleteIcon.svg"
          alt="delete category"
          className="w-5"
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
          {t("deleteCat")}
        </p>
        <div className="flex gap-3 mt-5 mb-3 rtl:flex-row-reverse">
          <button
            className="rounded p-3 bg-gray-100 text-gray-400 font-bold w-32"
            onClick={() => setShowModal(false)}
          >
            {t("cancel")}
          </button>
          <button
            className="rounded text-white bg-customred font-bold p-3 w-32"
            onClick={handleDeleteCategory}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={"22px"} className="text-center" />
            ) : (
              t("delete")
            )}
          </button>
        </div>
      </FailedModal>
    </div>
  );
}
export default DeleteCategory;
