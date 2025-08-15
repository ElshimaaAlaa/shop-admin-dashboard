import { useEffect, useState } from "react";
import EmailAddress from "../../Svgs/EmailAddress";
import PhoneNum from "../../Svgs/PhoneNum";
import { settings } from "../../ApiServices/Settings";
import { useTranslation } from "react-i18next";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
function InfoCard() {
  const [settingData, setSettingData] = useState([]);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const ContactCard = ({ icon, title, value, link }) => (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md mb-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
        <div>
          <h3 className="font-bold text-16 mb-2">{title}</h3>
          <a href={link} className="text-gray-400 mt-5 text-15">
            {value}
          </a>
        </div>
      </div>
      {isRTL ? (
        <FaArrowLeftLong size={23} color="#E0A75E" />
      ) : (
        <FaArrowRightLong size={23} color="#E0A75E" />
      )}
    </div>
  );
  useEffect(() => {
    const fetchGeneralSetting = async () => {
      const data = await settings();
      console.log("settings data", data);
      setSettingData(data);
    };
    fetchGeneralSetting();
  }, []);

  return (
    <section className="bg-white rounded-md drop-shadow-lg p-5 w-450 h-72 mt-10">
      <h2 className="font-bold text-17 mb-3 mt-2 relative pb-1 gradient-border-bottom">
        {t("contactInfo")}
      </h2>
      <ContactCard
        icon={<PhoneNum />}
        title={t("callUs")}
        value={settingData.phone || t("notProvided")}
      />
      <ContactCard
        icon={<EmailAddress />}
        title={t("email")}
        value={settingData.email || t("notProvided")}
        link="mailto:Vertex@gmail.com"
      />
    </section>
  );
}
export default InfoCard;
