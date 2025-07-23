import { useState, useEffect } from "react";
import Navbar from "../../Components/NavBar/Navbar";
import Sidebar from "../../Components/SideBar/Sidebar";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function Home() {
  const [isPinned, setIsPinned] = useState(false);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    i18n.changeLanguage(savedLanguage);
    setIsRTL(savedLanguage === "ar");
  }, [i18n]);
  // Update RTL state and localStorage when language changes
  useEffect(() => {
    const currentLanguage = i18n.language;
    setIsRTL(currentLanguage === "ar");
    localStorage.setItem("selectedLanguage", currentLanguage);
  }, [i18n.language]); 
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    if (savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage).then(() => {
        document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = savedLanguage;
      });
    }
  }, [i18n]);

  const handlePinToggle = () => {
    setIsPinned(!isPinned);
  };

  return (
    <>
      <Helmet>
        <title>{t("homePage")}</title>
        <html dir={isRTL ? "rtl" : "ltr"} lang={i18n.language} />
      </Helmet>
      <div className="flex">
        <Sidebar isPinned={isPinned} onPinToggle={handlePinToggle} />
        <div className="flex-1 ml-0">
          <Navbar />
          <div className="mt-0 bg-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;