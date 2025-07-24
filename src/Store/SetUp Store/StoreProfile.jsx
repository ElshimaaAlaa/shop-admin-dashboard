import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { setUpStore } from "../../ApiServices/setUpStore";
import "./setUpStoreStyle.scss";
import { useNavigate } from "react-router-dom";
import StepIndicator from "./StepIndicator";
import { ClipLoader } from "react-spinners";
import InputField from "../../Components/InputFields/InputField";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";

const StoreProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [themeData, setThemeData] = useState(null);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const steps = [
    { number: 1, title: t("storeTheme") },
    { number: 2, title: t("storeProfile") },
    { number: 3, title: t("pricingPlan") },
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("storeThemeData");
    if (!savedData) {
      navigate("/Register/StoreTheme");
    } else {
      setThemeData(JSON.parse(savedData));
    }
  }, [navigate]);

  const initialValues = {
    store_name: "",
    address: "",
    bio: "",
  };

  const validationSchema = Yup.object({
    store_name: Yup.string()
      .required("Store name is required")
      .min(3, "Must be at least 3 characters"),
    address: Yup.string().required("Address is required"),
    bio: Yup.string().max(500, "Cannot exceed 500 characters"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("store_name", values.store_name);
      formData.append("address", values.address);
      formData.append("bio", values.bio || "");

      if (themeData) {
        formData.append("theme_primary_color", themeData.theme_primary_color);
        formData.append(
          "theme_secondary_color",
          themeData.theme_secondary_color
        );
      }
      const response = await setUpStore(formData);

      if (response.status === true || response.code === 200) {
        localStorage.removeItem("storeProfileData");
        console.log("response store profile", response);

        setTimeout(() => navigate("/Register/PricingPlan"), 1500);
        localStorage.setItem(
          "storeProfileData",
          JSON.stringify({
            store_name: values.store_name,
            address: values.address,
            bio: values.bio,
          })
        );
      } else {
        throw new Error(response.message || "Profile setup failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
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
    <div className="p-3 bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange min-h-screen flex items-center justify-center">
      <Helmet>
        <title>{t("setUpStore")} </title>
        <html dir={isRTL ? "rtl" : "ltr"} lang={i18n.language} />
      </Helmet>
      <div className="bg-white rounded-md py-5 flex flex-col w-full max-w-2xl">
        <div className="flex justify-center my-5">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mb-5 px-6">
            <div className="rounded-full border-[5px] border-primary p-2 font-bold">
              2/3
            </div>
            <h3 className="text-15 font-bold">{t("startStore")}</h3>
          </div>
          <div className="relative mx-5">
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
        <StepIndicator currentStep={2} steps={steps} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="w-full px-6">
              <h3 className="text-16 font-semibold mb-3">{t("fillProfile")}</h3>
              <div className="flex items-center gap-2 mb-3">
                <InputField name="store_name" placeholder={t("storeName")} />
                <InputField name="address" placeholder={t("location")} />
              </div>
              <Field
                as="textarea"
                name="bio"
                placeholder={t("bio")}
                className={`w-full p-3 h-28 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14 placeholder:text-gray-400 focus:border-primary`}
              />
              <div className="flex justify-between mt-5 rtl:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => navigate("/Register/ThemeStore")}
                  className="flex rtl:flex-row-reverse font-bold items-center gap-3 text-dark px-6 py-2"
                >
                  <FaArrowLeftLong />
                  {t("back")}
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white rounded-md p-3 w-32 flex rtl:flex-row-reverse items-center gap-2 justify-center disabled:opacity-70"
                >
                  {isLoading ? (
                    <ClipLoader size={22} color="#fff" />
                  ) : (
                    <>
                      {t("next")}
                      <FaArrowRightLong />
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default StoreProfile;
