import { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import DesktopButtons from "./DesktopButtons";
import { useNavigate } from "react-router-dom";
import { getGeneralSettings } from "../../ApiServices/GeneralSettings";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";

function Navbar() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const {i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsData = await getGeneralSettings();
        setData(settingsData);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchSettings();
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    i18n.changeLanguage(savedLanguage);
    setIsRTL(savedLanguage === "ar");
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = savedLanguage;
  }, [i18n]);

  useEffect(() => {
    const currentLanguage = i18n.language;
    setIsRTL(currentLanguage === "ar");
    localStorage.setItem("selectedLanguage", currentLanguage);
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLanguage;
  }, [i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false);
    localStorage.setItem("selectedLanguage", lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
  };

  return (
    <section className="fixed w-full z-10">
      {/* Top item of navbar */}
      <div className="bg-black text-white flex flex-col items-center lg:flex-row lg:justify-center lg:items-center gap-5 p-3 font-light">
        <div className="flex gap-3 items-center justify-center -mb-3 lg:mb-0 md:mb-0">
          <p className="text-sm underline">{data.phone || "not provided"}</p>
          <img
            src="/assets/images/mdi_phone-outline.png"
            alt="phone"
            className="w-6"
          />
        </div>
        <div className="flex gap-3 items-center justify-center">
          <a href="/" target="_blank" className="text-sm underline">
            {data.email || "not provided"}
          </a>
          <img
            src="/assets/images/email.png"
            alt="email"
            className="w-7 mt-1 h-5"
          />
        </div>
        {/* language */}
        <div className="relative">
          <button
            className="flex items-center gap-1 text-14 bg-customOrange-lightOrange text-primary rounded-md px-2 py-1 mt-1"
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            aria-expanded={showLanguageDropdown}
            aria-label="Change language"
          >
            {i18n.language.toUpperCase()}
            <IoIosArrowDown 
              size={20} 
              className={`transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} 
            />
          </button>
          {showLanguageDropdown && (
            <div
              className={`absolute ${
                isRTL ? "left-0" : "right-0"
              } w-14 bg-white rounded-md shadow-lg z-10 border border-gray-200`}
            >
              <button
                className={`block w-full text-left px-4 py-2 text-sm ${
                  i18n.language === 'en' ? 'bg-gray-100 font-medium text-12 text-black' : 'text-black hover:bg-gray-100 text-12'
                }`}
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-sm ${
                  i18n.language === 'ar' ? 'bg-gray-100 font-medium text-black text-12' : 'text-black hover:bg-gray-100 text-12'
                }`}
                onClick={() => changeLanguage("ar")}
              >
                AR
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Navbar bottom items */}
      <div className="relative flex items-center justify-between px-4 lg:px-20 pt-2 pb-3 bg-white shadow-sm">
        <div>
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-36" />
        </div>
        <HamburgerMenu
          onLoginClick={() => navigate("/GetDomain")}
          onRegisterClick={() => navigate("/Register")}
        />
        <DesktopButtons
          onLoginClick={() => navigate("/GetDomain")}
          onRegisterClick={() => navigate("/Register")}
        />
      </div>
    </section>
  );
}
export default Navbar;