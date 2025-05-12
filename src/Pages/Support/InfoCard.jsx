import React, { useEffect ,useState} from "react";
import EmailAddress from "../../Svgs/EmailAddress";
import PhoneNum from "../../Svgs/PhoneNum";
import { settings } from "../../ApiServices/Settings";

function InfoCard() {
  const [settingData, setSettingData] = useState([]);
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
      <img
        src="/assets/svgs/arrow_forward.svg"
        alt="arrow"
        className="w-6 h-4"
      />
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
    <section className="bg-white rounded-md drop-shadow-lg p-5 w-500px h-72 mt-10">
      <h2 className="font-bold text-17 mb-3 mt-2 relative pb-1 gradient-border-bottom">
        Contact information
      </h2>
      <ContactCard
        icon={<PhoneNum />}
        title="Call us"
        value={settingData.phone || "Not provided"}
      />
      <ContactCard
        icon={<EmailAddress />}
        title="Email"
        value={settingData.email || "Not provided"}
        link="mailto:Vertex@gmail.com"
      />
    </section>
  );
}
export default InfoCard;