import { useEffect, useState } from "react";
import FailedModal from "../../Components/Modal/Failed Modal/FailedModal";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import "./UpdatePassword.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { useTranslation } from "react-i18next";
function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const { t } = useTranslation();
  useEffect(() => {
    document.body.classList.add("no-scroll");
  });
  const handelDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `https://${live_shop_domain}/api/${role}/delete-account`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")} `,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });
      if (response.status === 200) {
        setShowModal(true);
        setIsLoading(false);
        console.log("Account deleted successfully");
      } else {
        console.error("Failed to delete account");
        setShowModal(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to delete account", error);
      setShowModal(true);
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <AiOutlineDelete color="#DC2626" size={24} className="me-2" />
        <p className="font-semibold text-15 mt-1 text-red-600">
          {t("deleteAcc")}
        </p>
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
          {t("sureDeleteAcc")}
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
            onClick={handelDeleteAccount}
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
export default DeleteAccount;