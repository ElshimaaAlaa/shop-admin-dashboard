import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
function Header() {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <header className="ps-5 pe-5 lg:px-20 lg:pt-40 flex flex-col items-center pt-48 md:flex-row lg:flex-row ">
      <div>
        <h1 className=" leading-normal lg:w-400 text-4xl font-bold lg:leading-normal lg:text-4xl md:text-3xl md:leading-normal">
          {t("weBring")}
          <span className="text-primary ms-3 me-3">{t("rapidSolution")}</span>
          {t("for")}
        </h1>
        <p className="text-gray-400  leading-normal lg:w-2/4 md:w-96  mb-5">
          {t("headerP")}
        </p>
        <Link to={""} className="relative inline-block text-lg group">
          <span className="relative  -z-[1] block px-5 py-3 overflow-hidden font-medium leading-tight text-primary transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
            <span className="relative flex items-center gap-4 font-semibold">
              {t("getStarted")}
              {isRTL ? <IoMdArrowBack  size={22}/> : <IoMdArrowForward size={22}/>}
            </span>
          </span>
        </Link>
      </div>
      <div>
        <img
          src="/assets/images/header-image.png"
          alt="Business solutions illustration"
          loading="lazy"
          className="lg:pe-24 w-700 mt-10 lg:mt-0 md:ms-5  md:pe- "
        />
      </div>
    </header>
  );
}
export default Header;