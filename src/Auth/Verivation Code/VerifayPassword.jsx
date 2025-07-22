import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import MainBtn from "../../Components/Main Button/MainBtn";
import "./VerifayPassword.scss";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { VerifayPasswordService } from "../../ApiServices/VerifayPasswordService";
import ResendCode from "../Resend Code/ResendCode";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
function VerifayPassword() {
  const [loading, setLoading] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const email = localStorage.getItem("shop admin email");
    const otp =
      values.otp1 +
      values.otp2 +
      values.otp3 +
      values.otp4 +
      values.otp5 +
      values.otp6;

    try {
      await VerifayPasswordService(otp, email);
      console.log("OTP verified successfully!");
      navigate("/Login/CreateNewPassword");
    } catch (error) {
      console.error("Error: OTP Verification", error);
      if (error.message.includes("404")) {
        console.log("Endpoint not found. Please contact support.");
      } else {
        console.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
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
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false);
    localStorage.setItem("selectedLanguage", lng);
  };

  const validationSchema = Yup.object().shape({
    otp1: Yup.string().required("Required"),
    otp2: Yup.string().required("Required"),
    otp3: Yup.string().required("Required"),
    otp4: Yup.string().required("Required"),
    otp5: Yup.string().required("Required"),
    otp6: Yup.string().required("Required"),
  });

  const handleKeyUp = (event) => {
    if (event.target.value.length === 1) {
      const nextField = event.target.nextElementSibling;
      if (nextField && nextField.tagName === "INPUT") {
        nextField.focus();
      }
    }
  };

  return (
    <div className="main-container min-h-screen flex items-center justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("verification")}</title>
        <html dir={isRTL ? "rtl" : "ltr"} lang={i18n.language} />
      </Helmet>
      <div className="verivayContainer w-96 lg:w-450 md:w-450 sm:w-450 xs:w-450 s:w-450 bg-gray-50 rounded-md">
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
        <h1 className="font-bold text-[20px] mt-3">{t("verification")}</h1>
        <p className="text-secondary mt-2 text-15">
          {t("enterVerifayCode")}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-3 flex flex-col ">
              <div className="flex gap-2">
                {Array(6)
                  .fill("")
                  .map((_, index) => (
                    <Field
                      key={index}
                      name={`otp${index + 1}`}
                      maxLength="1"
                      className={`h-14 border-2 border-gray-200 rounded-md text-center font-bold w-12 lg:w-14 md:w-14 ${
                        errors[`otp${index + 1}`] && touched[`otp${index + 1}`]
                          ? "border-red-500"
                          : ""
                      }`}
                      onKeyUp={handleKeyUp}
                    />
                  ))}
              </div>
              <div className="text-gray-600 mt-3 mb-3 flex items-center gap-2 text-15">
                <p className="">{t("notGetCode")}</p>
                <ResendCode />
              </div>
              <MainBtn
                text={
                  loading ? <ClipLoader color="#fff" size={22} /> : t("verifay")
                }
                btnType="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default VerifayPassword;