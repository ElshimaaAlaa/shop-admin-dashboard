import { Formik, Form, Field } from "formik";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setUpStore } from "../../ApiServices/setUpStore";
import { ClipLoader } from "react-spinners";
import LogoUpload from "../../Components/Upload Image/UploadLogo";
import BannerUpload from "../../Components/Upload Image/UploadBanner";
import StepIndicator from "./StepIndicator";
import { FaArrowRightLong } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { HexColorPicker } from "react-colorful";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function StoreTheme() {
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState(null);
  const [bannerUrls, setBannerUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);
  const primaryPickerRef = useRef(null);
  const secondaryPickerRef = useRef(null);

  const steps = [
    { number: 1, title: t("storeTheme") },
    { number: 2, title: t("storeProfile") },
    { number: 3, title: t("pricingPlan") },
  ];

  const initialValues = {
    theme_primary_color: "#3b82f6",
    theme_secondary_color: "#f59e0b",
    image: null,
    banners: [],
  };

  const validationSchema = Yup.object({
    theme_primary_color: Yup.string()
      .required(t("primaryColorRequired"))
      .matches(/^#[0-9A-F]{6}$/i, t("invalidHexFormat")),
    theme_secondary_color: Yup.string()
      .required(t("secondaryColorRequired"))
      .matches(/^#[0-9A-F]{6}$/i, t("invalidHexFormat")),
    image: Yup.mixed()
      .required(t("logoRequired"))
      .test(
        "fileSize",
        t("fileTooLarge"),
        (value) => value && value.size <= 5 * 1024 * 1024
      )
      .test(
        "fileType",
        t("unsupportedFormat"),
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
    banners: Yup.array()
      .min(1, t("atLeastOneBanner"))
      .test(
        "fileSize",
        t("fileTooLargeEach"),
        (files) => files && files.every((file) => file.size <= 5 * 1024 * 1024)
      )
      .test(
        "fileType",
        t("unsupportedFormat"),
        (files) => files && files.every((file) => ["image/jpeg", "image/png"].includes(file.type))
      ),
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    i18n.changeLanguage(savedLanguage);
    setIsRTL(savedLanguage === "ar");
  }, [i18n]);

  useEffect(() => {
    return () => {
      if (logoUrl && logoUrl.startsWith("blob:")) URL.revokeObjectURL(logoUrl);
      bannerUrls.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [logoUrl, bannerUrls]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      const logoBase64 = await convertToBase64(values.image);
      const bannersBase64 = await Promise.all(
        values.banners.map((banner) => convertToBase64(banner))
      );

      localStorage.setItem(
        "storeThemeData",
        JSON.stringify({
          theme_primary_color: values.theme_primary_color,
          theme_secondary_color: values.theme_secondary_color,
          logoBase64,
          bannersBase64,
        })
      );

      const formData = new FormData();
      formData.append("theme_primary_color", values.theme_primary_color);
      formData.append("theme_secondary_color", values.theme_secondary_color);
      formData.append("image", values.image);
      values.banners.forEach((banner, index) => {
        formData.append(`banners[${index}]`, banner);
      });

      const response = await setUpStore(formData);
      if (response?.status === true || response?.code === 200) {
        navigate("/Register/StoreProfile", { replace: true });
      } else {
        throw new Error(response?.message || t("themeSetupFailed"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(error.message || t("saveThemeError"));
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false);
    localStorage.setItem("selectedLanguage", lng);
  };

  const handleColorChange = (color, fieldName, setFieldValue) => {
    setFieldValue(fieldName, color);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        primaryPickerRef.current && 
        !primaryPickerRef.current.contains(event.target) &&
        !event.target.closest('.primary-color-input')
      ) {
        setShowPrimaryPicker(false);
      }

      if (
        secondaryPickerRef.current && 
        !secondaryPickerRef.current.contains(event.target) &&
        !event.target.closest('.secondary-color-input')
      ) {
        setShowSecondaryPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-3 bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange min-h-screen flex items-center justify-center">
      <Helmet>
        <title>{t("setUpStore")}</title>
        <html dir={isRTL ? "rtl" : "ltr"} lang={i18n.language} />
      </Helmet>
      <div className="bg-white rounded-md py-5 flex flex-col w-full max-w-2xl">
        <div className="flex justify-center my-5">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mb-5 px-6">
            <div className="rounded-full border-[5px] border-primary p-2 font-bold">
              1/3
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
        <StepIndicator currentStep={1} steps={steps} />

        {submitError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {submitError}
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => (
            <Form className="w-full">
              <div className="mb-6">
                <LogoUpload
                  name="image"
                  setFieldValue={setFieldValue}
                  error={touched.image && errors.image}
                  accept="image/jpeg, image/png"
                  logoUrl={logoUrl}
                  setLogoUrl={setLogoUrl}
                />
              </div>
              <BannerUpload
                banners={values.banners}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                setBannerUrls={setBannerUrls}
                bannerUrls={bannerUrls}
              />
              <h3 className="text-16 font-semibold mb-3 px-6">
                {t("enterColor")}
              </h3>
              <div className="flex gap-2 mb-6 px-6">
                <div className="w-full relative">
                  <Field
                    name="theme_primary_color"
                    placeholder={t("primColor")}
                    className={`primary-color-input w-full bg-gray-50 p-3 border rounded-md outline-none transition-all duration-200 placeholder:text-14 placeholder:text-gray-500 focus:border-primary ${
                      touched.theme_primary_color && errors.theme_primary_color
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    onClick={() => {
                      setShowPrimaryPicker(!showPrimaryPicker);
                      setShowSecondaryPicker(false);
                    }}
                    readOnly
                  />
                  {showPrimaryPicker && (
                    <div 
                      ref={primaryPickerRef}
                      className="absolute -top-44 z-10 mt-2 bg-white p-3 rounded-md shadow-lg"
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <HexColorPicker
                        color={values.theme_primary_color}
                        onChange={(color) =>
                          handleColorChange(color, "theme_primary_color", setFieldValue)
                        }
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          type="button"
                          className="text-primary text-sm"
                          onClick={() => setShowPrimaryPicker(false)}
                        >
                          {t("done")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full relative">
                  <Field
                    name="theme_secondary_color"
                    placeholder={t("secColor")}
                    className={`secondary-color-input w-full bg-gray-50 p-3 border rounded-md outline-none transition-all duration-200 placeholder:text-14 placeholder:text-gray-500 focus:border-primary ${
                      touched.theme_secondary_color &&
                      errors.theme_secondary_color
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      setShowSecondaryPicker(!showSecondaryPicker);
                      setShowPrimaryPicker(false);
                    }}
                    readOnly
                  />
                  {showSecondaryPicker && (
                    <div 
                      ref={secondaryPickerRef}
                      className="absolute -top-44 z-10 mt-2 bg-white p-3 rounded-md shadow-lg"
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <HexColorPicker
                        color={values.theme_secondary_color}
                        onChange={(color) =>
                          handleColorChange(color, "theme_secondary_color", setFieldValue)
                        }
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          type="button"
                          className="text-primary text-sm"
                          onClick={() => setShowSecondaryPicker(false)}
                        >
                          {t("done")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-5 px-6 rtl:justify-start">
                <button
                  type="submit"
                  disabled={isSubmitting}
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
}

export default StoreTheme;