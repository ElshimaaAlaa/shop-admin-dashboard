import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { GetPersonalInfo } from "../../ApiServices/GetPersonalInfo";
import UpdatePassword from "./UpdatePassword";
import { useTranslation } from "react-i18next";
function PersonalInformation() {
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState({});
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await GetPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
        setError(
          "Failed to load personal information. Please try again later."
        );
      }
    };
    getInfo();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{t("personalInfo")}</title>
        <meta name="description" content="Edit personal information" />
        <meta property="og:title" content="Edit Personal Information" />
        <meta property="og:description" content="Edit personal information" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vertex-dashboard.com/personal-information"
        />
      </Helmet>
      <section>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="font-bold text-[18px]">{t("personalInfo")}</h1>
          <button
            onClick={() => navigate("EditInfo", { state: personalInfo })}
            className="text-white font-semibold flex items-center justify-center gap-3 bg-primary p-2 w-24 rounded-md"
            aria-label="Edit personal information"
          >
            <img src="/assets/svgs/edit.svg" alt="Edit icon" className="w-7" />
            {t("edit")}
          </button>
        </div>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-6">
            {error}
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center gap-5 my-3 border rounded-md p-3 w-full">
          <img
            src={personalInfo?.image || "/assets/images/default-profile.png"}
            alt="User profile"
            className="rounded-lg w-32 h-24 md:w:24 md:h-24 object-cover"
            onError={(e) => {
              e.target.src = "/assets/images/default-profile.png";
            }}
          />
          <div className="text-center md:text-left flex flex-col gap-1">
            <h2 className="font-semibold">{personalInfo?.name || t("notProvided")}</h2>
            <p className="text-gray-400 text-14 rtl:text-right">
              {personalInfo?.role || "Shop Admin"}
            </p>
          </div>
        </div>
        {/* Name, Phone, and Email Section */}
        <div className="border rounded-md p-3 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-96">
            <div>
              <p className="text-gray-400 text-15">{t("name")}</p>
              <h3 className="text-14">{personalInfo?.name || t("notProvided")}</h3>
            </div>
            <div>
              <p className="text-gray-400 text-15">{t("email")}</p>
              <h3 className="text-14">{personalInfo?.email || t("notProvided")}</h3>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-gray-400 text-15">{t("phone")}</p>
            <h3 className="text-14">{personalInfo?.phone || t("notProvided")}</h3>
          </div>
        </div>
      </section>
      <UpdatePassword />
    </div>
  );
}
export default PersonalInformation;