import { useNavigate } from "react-router-dom";
import ProfileMenu from "../../Profile/Profile";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { GrLanguage } from "react-icons/gr";
import { RiArrowRightCircleLine, RiArrowLeftCircleLine } from "react-icons/ri";

function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage).then(() => {
        document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = savedLanguage;
        setCurrentLanguage(savedLanguage);
        setIsRTL(savedLanguage === "ar");
      });
    }
  }, [i18n]);

  // تحديث حالة اللغة عند تغييرها
  useEffect(() => {
    setCurrentLanguage(i18n.language);
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  const goBack = () => {
    navigate(-1);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lng;
      localStorage.setItem("selectedLanguage", lng);
      setCurrentLanguage(lng);
      setIsRTL(lng === "ar");
      setShowLanguageDropdown(false);
    }).catch(err => {
      console.error("Error changing language:", err);
    });
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  return (
    <div className="bg-white shadow-sm">
      <nav className="flex items-center justify-between px-5 py-2 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={goBack}
            aria-label={t("goBack")}
            className="hover:opacity-80 transition-opacity"
          >
            {isRTL ? (
              <RiArrowRightCircleLine size={35} color="#E0A75E" />
            ) : (
              <RiArrowLeftCircleLine size={35} color="#E0A75E" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-5 relative">
          <div
            className="flex items-center justify-between w-40 border-1 bg-gray-50 border-gray-100 rounded-md py-3 px-4 cursor-pointer"
            onClick={toggleLanguageDropdown}
          >
            <div className="flex items-center gap-2">
              <GrLanguage color="#71717A" size={21} />
              <p className="text-15">
                {currentLanguage === "en" ? "English" : "العربية"}
              </p>
            </div>

            <IoIosArrowDown
              color="#71717A"
              size={20}
              className={`transition-transform ${
                showLanguageDropdown ? "rotate-180" : ""
              }`}
            />

            {showLanguageDropdown && (
              <div className="absolute top-full right-24 rtl:-right-0 w-40 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                <button
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    currentLanguage === "en" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => changeLanguage("en")}
                >
                  English
                </button>
                <button
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    currentLanguage === "ar" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => changeLanguage("ar")}
                >
                  العربية
                </button>
              </div>
            )}
          </div>
          <ProfileMenu />
        </div>
      </nav>
    </div>
  );
}
export default Navbar;