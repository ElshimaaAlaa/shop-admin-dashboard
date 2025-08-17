import { useState, useEffect } from "react";
import Navbar from "../../Layout/NavBar/Navbar";
import Sidebar from "../../Layout/SideBar/Sidebar";
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
      <div className="flex h-screen">
        <Sidebar isPinned={isPinned} onPinToggle={handlePinToggle} />
        <div className="flex flex-col flex-1 min-h-0">
          <Navbar />
          <div className="flex- overflow-auto bg-gra">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;