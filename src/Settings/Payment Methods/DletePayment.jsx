import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import FailedModal from "../../Components/Modal/Failed Modal/FailedModal";
import "./PaymentStyle.scss";
import { useTranslation } from "react-i18next";
function DeletePaymentMethods({ id, onDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const { t } = useTranslation();
  const handleDeletePaymentMathod = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `https://${live_shop_domain}/api/${role}/payment-methods/delete/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      });

      if (response.status === 200) {
        console.log("Successfully deleted Payment Methods");
        onDelete();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Failed to delete Payment Methods", error);
    } finally {
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
      <div className="cursor-pointer" onClick={() => setShowModal(true)}>
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
        <p className="font-bold w-72 text-center">{t("deletePay")}</p>
        <div className="flex gap-3 mt-5 mb-3 rtl:flex-row-reverse">
          <button
            className="rounded p-3 bg-gray-100 text-gray-400 font-bold w-32"
            onClick={() => setShowModal(false)}
          >
            {t("cancel")}
          </button>
          <button
            className="rounded text-white bg-customred font-bold p-3 w-32"
            onClick={handleDeletePaymentMathod}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={22} className="text-center" />
            ) : (
              t("delete")
            )}
          </button>
        </div>
      </FailedModal>
    </div>
  );
}
export default DeletePaymentMethods;
