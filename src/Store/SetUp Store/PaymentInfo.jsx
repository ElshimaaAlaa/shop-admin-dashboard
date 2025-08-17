import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import InputField from "../../Components/InputFields/InputField";
import { FaArrowRightLong } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CreditCard from "../../Svgs/CreditCard";
import Paypal from "../../Svgs/Paypal";
import Visa from "../../Svgs/Visa";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { setUpStore } from "../../ApiServices/setUpStore";

function PaymentInfo({
  onSubmit = () => {},
  onBack = () => {},
  formData = {},
  updateFormData = () => {},
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const initialValues = {
    name: formData?.payment_info?.name || "",
    email: formData?.payment_info?.email || "",
    phone: formData?.payment_info?.phone || "",
    payment_method: formData?.payment_info?.payment_method || "",
    card_holder_name: formData?.payment_info?.card_holder_name || "",
    card_number: formData?.payment_info?.card_number || "",
    expiration_date: formData?.payment_info?.expiration_date || "",
    card_cvv: formData?.payment_info?.card_cvv || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(t("nameRequired")),
    email: Yup.string().email(t("validEmail")).required(t("emailRequired")),
    phone: Yup.string().required(t("phoneRequired")),
    payment_method: Yup.string().required(t("paymentMethodRequired")),
    card_holder_name: Yup.string().required(t("cardHolderRequired")),
    card_number: Yup.string().required(t("cardNumberRequired")),
    expiration_date: Yup.string().required(t("expirationDateRequired")),
    card_cvv: Yup.string().required(t("cvvRequired")),
  });

  const paymentMethods = [
    {
      id: "credit_card",
      label: "Credit Card",
      icon: <CreditCard />,
    },
    { id: "paypal", label: "PayPal", icon: <Paypal /> },
    { id: "visa", label: "Visa", icon: <Visa /> },
  ];

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      const selectedMethod = paymentMethods.find(
        (method) => method.id === values.payment_method
      );

      const paymentInfo = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        payment_method: selectedMethod?.id || values.payment_method,
        card_holder_name: values.card_holder_name,
        card_number: values.card_number,
        expiration_date: values.expiration_date,
        card_cvv: values.card_cvv,
      };

      // Update parent component's formData
      updateFormData("payment_info", paymentInfo);

      // Prepare complete data for submission
      const completeData = {
        ...formData,
        payment_info: paymentInfo,
      };

      // Create FormData object
      const formDataToSend = new FormData();
      
      // Add store profile data
      if (formData.store_name) {
        formDataToSend.append('store_name', formData.store_name);
      }
      if (formData.address) {
        formDataToSend.append('address', formData.address);
      }
      if (formData.bio) {
        formDataToSend.append('bio', formData.bio);
      }
      
      // Add theme data
      if (formData.theme_primary_color) {
        formDataToSend.append('theme_primary_color', formData.theme_primary_color);
      }
      if (formData.theme_secondary_color) {
        formDataToSend.append('theme_secondary_color', formData.theme_secondary_color);
      }
      
      // Add payment info
      Object.entries(paymentInfo).forEach(([key, value]) => {
        formDataToSend.append(`payment_info[${key}]`, value);
      });

      // Call API
      const response = await setUpStore(formDataToSend);
      
      if (response.status === true || response.code === 200) {
        onSubmit(completeData);
        navigate('/Register/ShippingProvider');
      } else {
        throw new Error(response.message || 'Payment processing failed');
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(
        error.response?.data?.message || error.message || t("setupFailed")
      );
    } finally {
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
    <div className="min-h-screen bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <Helmet>
        <title>{t("setUpStore")}</title>
        <html dir={isRTL ? "rtl" : "ltr"} lang={i18n.language} />
      </Helmet>

      <div className="w-full lg:w-[600px] md:w-[600px] bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between my-8 mx-5">
          <div>
            <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
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

        <div className="text-center">
          <h2 className="text-17 font-bold">{t("enterData")}</h2>
          <p className="text-14 text-gray-500">{t("completePayment")}</p>
        </div>

        {submitError && (
          <div className="alert alert-error mx-6 my-4 p-3 rounded-md bg-red-100 text-red-700">
            {submitError}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, isValid, dirty }) => (
            <Form className="ps-6 pe-6">
              <section>
                <h2 className="font-bold mb-3 mt-3">{t("contactInfo")}</h2>
                <div className="flex gap-2">
                  <InputField name="name" placeholder={t("name")} />
                  <InputField
                    name="email"
                    placeholder={t("email")}
                    type="email"
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <InputField
                    name="phone"
                    placeholder={t("phone")}
                    // type="tel"
                  />
                </div>
              </section>

              <h2 className="font-bold mt-4 mb-3">{t("paymentMethod")}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`rounded-lg p-1 flex items-center gap-2 font-bold text-14 cursor-pointer transition-colors ${
                      values.payment_method === method.id
                        ? "bg-primary-light border border-primary bg-customOrange-mediumOrange"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <Field
                      type="radio"
                      name="payment_method"
                      value={method.id}
                      className="hidden"
                      onChange={() =>
                        setFieldValue("payment_method", method.id)
                      }
                    />
                    <span className="w-10 h-10 flex items-center justify-center">
                      {method.icon}
                    </span>
                    {method.label}
                  </label>
                ))}
              </div>

              {values.payment_method && (
                <section className="bg-gray-50 py-2 px-4 rounded-md">
                  <h4 className="font-bold mt-4 mb-3">{t("paymentInfo")}</h4>
                  <div className="flex items-center gap-2">
                    <InputField
                      name="card_cvv"
                      placeholder={t("cvv")}
                    />
                    <InputField
                      name="expiration_date"
                      placeholder="MM/YY"
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        // if (value.length > 2) {
                        //   value =
                        //     value.substring(0, 2) + "/" + value.substring(2, 4);
                        // }
                        setFieldValue("expiration_date", value);
                      }}
                      // maxLength="5"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <InputField
                      name="card_holder_name"
                      placeholder={t("cardHolder")}
                    />
                    <InputField
                      name="card_number"
                      placeholder={t("cardNumber")}
                      type="text"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setFieldValue("card_number", value.substring(0, 16));
                      }}
                    />
                  </div>
                </section>
              )}

              <section className="flex items-center gap-3 justify-end my-5 rtl:flex-row-reverse">
                <button
                  type="button"
                  onClick={onBack}
                  className="bg-gray-100 text-gray-400 w-36 rounded-md px-6 py-3 transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !isValid || !dirty}
                  className={`bg-primary text-white flex rtl:flex-row-reverse w-36 justify-center text-16 items-center rounded-md px-6 py-3 gap-3 transition-colors ${
                    isLoading || !isValid || !dirty
                      ? "opacity-50"
                      : "hover:bg-primary-dark"
                  }`}
                >
                  {isLoading ? (
                    <ClipLoader size={20} color="#fff" />
                  ) : (
                    <>
                      {t("payNow")} <FaArrowRightLong />
                    </>
                  )}
                </button>
              </section>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

PaymentInfo.propTypes = {
  onSubmit: PropTypes.func,
  onBack: PropTypes.func,
  formData: PropTypes.object,
  updateFormData: PropTypes.func.isRequired,
};

PaymentInfo.defaultProps = {
  formData: {},
  onSubmit: () => {},
  onBack: () => {},
};

export default PaymentInfo;