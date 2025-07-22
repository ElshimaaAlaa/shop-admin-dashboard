import { IoCopyOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
export const CustomerPersonalInfo = ({ customerData, copyPhoneNumber }) => {
  const { t } = useTranslation();
  return (
    <div className="w-450">
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
          <h4 className="text-gray-400 text-14">{t("phone")}</h4>
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
