import { IoCopyOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const CustomerPersonalInfo = ({ customerData }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const copyPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      navigator.clipboard
        .writeText(phoneNumber)
        .then(() => {
          toast.success(t("successCopy"), {
            position: isRTL ? "top-left" : "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          toast.error(t("copyFailed"), {
            position: isRTL ? "top-left" : "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <div className="w-450">
      <ToastContainer rtl={isRTL} />

      <section className="rounded-md bg-white p-3 border border-gray-200">
        <h3 className="font-bold text-17">{t("personalInfo")}</h3>
        <img
          src={customerData.personal_info?.image || "/assets/images/user.png"}
          alt="customer pic"
          className="rounded-md mt-4 w-full h-52"
        />
        <div className="mt-4">
          <h4 className="text-gray-400 text-14">{t("name")}</h4>
          <p className="text-14">{customerData.personal_info?.name}</p>
        </div>
        <div className="mt-4">
          <h4 className="text-gray-400 text-14">{t("email")}</h4>
          <p className="text-14">{customerData.personal_info?.email}</p>
        </div>
        <div className="mt-4">
          <h4 className="text-gray-400 text-14">
            {t("phone")}
            {customerData.phone && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyPhoneNumber(customerData.phone);
                }}
                className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                title={t("copyPhone")}
              >
                <IoCopyOutline color="#E0A75E" size={15} />
              </button>
            )}
          </h4>
          <p className="text-14 flex items-center gap-2">
            {customerData.personal_info?.phone || "Not provided"}
            {customerData.personal_info?.phone && (
              <button
                onClick={copyPhoneNumber}
                className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                title="Copy phone number"
              >
                <IoCopyOutline color="#E0A75E" size={15} />
              </button>
            )}
          </p>
        </div>
      </section>
      <section className="rounded-md bg-white p-4 border-1 border-gray-200 mt-3">
        <h3 className="font-bold text-16">{t("shippingAdd")}</h3>
        <p className="text-13 mt-3">
          {customerData.personal_info?.address || "No provided address"}
        </p>
      </section>
    </div>
  );
};
