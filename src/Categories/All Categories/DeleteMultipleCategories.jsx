import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import FailedModal from "../../Components/Modal/Failed Modal/FailedModal";
function DeleteMultipleCategories({ isOpen, onClose, onConfirm, count }) {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FailedModal isOpen={isOpen} onClose={onClose}>
      <div className="p-5">
        <img
          src="/assets/images/delete_svgrepo.com.png"
          alt="delete-img"
          className="h-14 w-14 p-1 mx-auto"
        />
      </div>
      <p className="font-bold text-center w-64 text-15">
        {t("DeleteMultipleCategories", { count })}
      </p>
      <div
        className={`flex gap-3 mt-5 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <button
          className="rounded p-3 bg-gray-100 text-gray-400 font-bold w-32 rtl:text-[16px]"
          onClick={onClose}
          disabled={isLoading}
        >
          {t("cancel")}
        </button>
        <button
          className="rounded text-white bg-customred font-bold p-3 w-32 rtl:text-[16px]"
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader color="#fff" size={"22px"} className="text-center" />
          ) : (
            t("delete")
          )}
        </button>
      </div>
    </FailedModal>
  );
}
export default DeleteMultipleCategories;