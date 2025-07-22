import axios from "axios";
import { useState } from "react";
import FailedModal from "../Components/Modal/Failed Modal/FailedModal";
import { ClipLoader } from "react-spinners";
import "./customerStyle.scss";
import { useTranslation } from "react-i18next";
function DeleteCustomer({ onDelete, id }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const { t } = useTranslation();
  const handleDeleteCustomer = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `https://${live_shop_domain}/api/${role}/delete-customer/${id}`,
        method: "GET",
        headers: {
          "Accept-Language": "ar",
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
        <p className="font-bold w-72 text-center">{t("deleteCustomer")}</p>
        <div className="flex gap-3 mt-5 mb-3 rtl:flex-row-reverse">
          <button
            className="rounded p-3 bg-gray-100 text-gray-400 font-bold w-32"
            onClick={() => setShowModal(false)}
          >
            {t("cancel")}
          </button>
          <button
            className="rounded text-white bg-customred font-bold p-3 w-32"
            onClick={handleDeleteCustomer}
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
export default DeleteCustomer;
