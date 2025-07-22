import { useEffect, useState } from "react";
import "./Register.scss";
import OAuth from "../OAuth/OAuth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import AuthInputField from "../../Components/AuthInput Field/AuthInputField";
import PasswordInput from "../../Components/Password Input/PasswordInput";
import MainBtn from "../../Components/Main Button/MainBtn";
import { register } from "../../ApiServices/RegisterApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    agreeToTerms: false,
    domain: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(t("nameRequired")),
    email: Yup.string()
      .email(t("invaildEmail"))
      .required(t("emailRequired")),
    password: Yup.string()
      .min(8, t("passwordLenght"))
      .required(t("passwordRequired")),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], t("matchPassword"))
      .required(t("confirmRequired")),
    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required(t("confirm")),
    domain: Yup.string().required(t("domainRequired")),
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const registerData = await register(
        values.name,
        values.password,
        values.email,
        values.password_confirmation,
        values.agreeToTerms,
        values.domain
      );
      console.log("Registration Successful:", registerData);
      navigate("/Register/ThemeStore");
    } catch (error) {
      setLoading(false);
      console.error(error.message);
      setError(t("failedRegister"));
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
  return (
    <div className="maincontainer">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("register")}</title>
        <html dir={isRTL ? "rtl" : "ltr"} lang={i18n.language} />
      </Helmet>
      <div className="registerContainer lg:w-450 md:w-450 sm:w-450 xs:w-450 s:w-450 bg-gray-50">
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
        <h1 className="font-bold text-[20px]">{t("createAccount")}</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form className="flex flex-col">
              <div className="relative mt-1">
                <AuthInputField
                  placeholder={t("name")}
                  name="name"
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <div className="relative mt-2">
                <AuthInputField
                  placeholder={t("domain")}
                  name="domain"
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <div className="relative mt-2">
                <AuthInputField
                  placeholder={t("email")}
                  name="email"
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <PasswordInput
                name="password"
                placeholder={t("password")}
                showPassword={showPasswordConfirmation}
                togglePasswordVisibility={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
                dir={isRTL ? "rtl" : "ltr"}
              />
              <PasswordInput
                name="password_confirmation"
                placeholder={t("confirmPassword")}
                showPassword={showPassword}
                togglePasswordVisibility={() => setShowPassword(!showPassword)}
                dir={isRTL ? "rtl" : "ltr"}
              />
              <div className="flex items-center justify-between mt-3">
                <label className="inline-flex items-center cursor-pointer">
                  <Field
                    as="input"
                    type="checkbox"
                    name="agreeToTerms"
                    id="agreeToTerms"
                    className="hidden peer"
                  />
                  <span className="w-4 h-4 border-2 border-gray-300 rounded flex items-center justify-center transition-all duration-200 ">
                    <svg
                      className="w-full h-full bg-primary text-white opacity-0 transition-all duration-200 peer-checked:opacity-100"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  </span>
                  <span className="text-11 lg:text-14 text-gray-600 ms-2">
                    {t("agree")}
                  </span>
                </label>
              </div>
              <div className="my-3">
                <MainBtn
                  text={
                    loading ? <ClipLoader color="#fff" size={22} /> : t("signUp")
                  }
                  btnType="submit"
                  disabled={loading}
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm mb-1 text-center">{error}</p>
              )}
              <div className="flex items-center justify-center w-full">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="mx-4 text-gray-400 text-13 font-bold">
                  {t("or")}
                </span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>
              <OAuth />
              <p className="text-center text-gray-400 mt-3 text-15">
                {t("haveAcc")}
                <span
                  onClick={() => navigate("/Login")}
                  className="ms-2 text-primary font-bold text-16 cursor-pointer"
                >
                  {t("login")}
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default Register;