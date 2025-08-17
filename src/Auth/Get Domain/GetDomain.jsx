import { useEffect, useState } from "react";
import "./getDomainStyle.scss";
import { Helmet } from "react-helmet";
import AuthInputField from "../../Components/AuthInput Field/AuthInputField";
import { Form, Formik } from "formik";
import MainBtn from "../../Components/Main Button/MainBtn";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { getDomain } from "../../ApiServices/GetDomainSeivce";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";

function GetDomain() {
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const navigate = useNavigate();
  
  const intialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required(t("emailRequired")),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await getDomain(values.email);
      setIsLoading(false);
      setTimeout(() => {
        // Navigate to Login with email as query parameter
        navigate(`/Login?email=${encodeURIComponent(values.email)}`);
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false);
    localStorage.setItem("selectedLanguage", lng);
  };

  return (
    <div className="main-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("getDomain")}</title>
        <html dir={isRTL ? "rtl" : "ltr"} lang={i18n.language} />
      </Helmet>
      <div className="getDomainContainer w-[350px] p-5 lg:p-7 md:p-7 lg:w-450 md:w-450 sm:w-80 xs:w-450 s:w-80 bg-gray-50 rounded-md">
        <div className="flex justify-between items-center">
          <img
            src="/assets/svgs/vertex.svg"
            alt="logo"
            className="w-48 h-10 mb-3"
          />
          <div className="relative">
            <button
              className="flex items-center gap-1 text-14 bg-customOrange-lightOrange text-primary rounded-md p-2"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              {i18n.language.toUpperCase()}
              <IoIosArrowDown size={20} />
            </button>
            {showLanguageDropdown && (
              <div
                className={`absolute ${
                  isRTL ? "left-0" : "right-0"
                } w-14 bg-white rounded-md shadow-lg z-10`}
              >
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => changeLanguage("ar")}
                >
                  AR
                </button>
              </div>
            )}
          </div>
        </div>
        <Formik
          initialValues={intialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <h1 className="font-bold text-[20px] mt-3">{t("getDomain")}</h1>
            <p className="text-secondary mt-3 text-15 mb-3">
              {t(("domainP"))}
            </p>
            <AuthInputField name="email" placeholder={t("enterEmail")} dir={isRTL ? "rtl":"ltr"}/>
            <div className="mt-3">
              <MainBtn
                btnType={"submit"}
                text={
                  isLoading ? <ClipLoader size={22} color="#fff" /> : t("save")
                }
              />
            </div>
          </Form>
        </Formik>
        <p className="text-center mt-4 text-gray-600">
          {t("alreadyHaveAccount")}{" "}
          <span 
            className="text-primary font-medium cursor-pointer"
            onClick={() => navigate("/Login")}
          >
            {t("login")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default GetDomain;