
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import MainBtn from "../../Components/Main Button/MainBtn";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import "./CreateNewPassword.scss";
import { CreateNewPasswordService } from "../../ApiServices/CreateNewPasswordService";
import PasswordInput from "../../Components/Password Input/PasswordInput";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";

function CreateNewPassword() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const initialValues = {
    password: "",
    password_confirmation: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, t("passwordLenght"))
      .required(t("passwordRequired")),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], t("matchPassword"))
      .required(t("confirmRequired")),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);
    const email = localStorage.getItem("shop admin email");
    const token = localStorage.getItem("token");
    try {
      await CreateNewPasswordService(
        values.password,
        values.password_confirmation,
        email,
        token
      );
      setShowSuccessModal(true);
      localStorage.removeItem("shop admin email");
      setTimeout(() => navigate("/Login"), 2500);
    } catch (error) {
      setError(error);
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

  return (
    <div className="p-4 sm:p-8 md:p-16 main-container min-h-screen flex items-center justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("createNewPassword")}</title>
        <html dir={isRTL ? "rtl" : "ltr"} lang={i18n.language} />
      </Helmet>
      <div className="CreateNewPasswordContainer w-96 lg:w-450 md:w-450 sm:w-450 xs:w-450 s:w-450 bg-gray-50">
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
        <h1 className="font-bold mt-3 text-[20px]">{t("createNewPassword")}</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col justify-center ">
              <PasswordInput
                name={"password"}
                placeholder={t("password")}
                showPassword={showConfirmPassword}
                togglePasswordVisibility={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                dir={isRTL ? "rtl" : "ltr"}
              />
              <PasswordInput
                name={"password_confirmation"}
                placeholder={t("confirmPassword")}
                showPassword={showPassword}
                togglePasswordVisibility={() => setShowPassword(!showPassword)}
                dir={isRTL ? "rtl" : "ltr"}
              />
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              <div className="mt-3">
                <MainBtn
                  text={
                    loading ? <ClipLoader color="#fff" size={22} /> : t("save")
                  }
                  btnType="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        >
          <div className="flex flex-col items-center justify-center rounded p-5">
            <img
              src="/assets/images/success.png"
              alt="success"
              className="w-32 mt-6"
            />
            <p className="w-80 text-black text-14 text-center mt-2 font-bold rtl:text-[17px]">
              {t("successChange")}
            </p>
          </div>
        </SuccessModal>
      </div>
    </div>
  );
}
export default CreateNewPassword;