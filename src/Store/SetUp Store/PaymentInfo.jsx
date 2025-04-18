import { Form, Formik, Field } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import InputField from "../../Components/InputFields/InputField";
import { FaArrowRightLong } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { setUpStore } from "../../ApiServices/setUpStore";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function PaymentInfo({
  onSubmit,
  onBack,
  formData,
  updateFormData = () => {},
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    payment_method: "",
    card_holder_name: "",
    card_number: "",
    expiration_date: "",
    card_cvv: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    payment_method: Yup.string().required("Payment method is required"),
    card_holder_name: Yup.string(),
    card_number: Yup.string().required("Card number is required"),
    expiration_date: Yup.string().required("Expiration date is required"),
    card_cvv: Yup.string().required("CVV is required"),
  });

  const paymentMethods = [
    {
      id: "credit_card",
      label: "Credit Card",
      icon: "/assets/svgs/MasterCard.svg",
    },
    { id: "paypal", label: "PayPal", icon: "/assets/svgs/PayPal - Long.svg" },
    { id: "visa", label: "Visa", icon: "/assets/svgs/Visa Electron.svg" },
    {
      id: "google_pay",
      label: "Google Pay",
      icon: "/assets/svgs/Googlepay.svg",
    },
  ];

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const selectedMethod = paymentMethods.find(
        (method) => method.id === values.payment_method
      );

      // Create payment info object
      const paymentInfo = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        payment_method: selectedMethod
          ? selectedMethod.label
          : values.payment_method,
        card_holder_name: values.card_holder_name,
        card_number: values.card_number,
        card_exp_date: values.expiration_date,
        card_cvv: values.card_cvv,
      };

      // Update parent component with payment info
      updateFormData("payment_info", paymentInfo);

      const formDataToSend = new FormData();
      Object.entries(paymentInfo).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Include previous form data
      Object.entries(formData).forEach(([key, value]) => {
        if (!formDataToSend.has(key)) {
          formDataToSend.append(key, value);
        }
      });

      const response = await setUpStore(formDataToSend);
      console.log("response payment info", response);

      // Call parent's onSubmit if exists
      if (onSubmit) {
        onSubmit({
          ...formData,
          payment_info: paymentInfo,
          ...response.data,
        });
      }
      localStorage.setItem("paymentInfo" ,JSON.stringify({
        name: values.name,
        phone: values.phone,
        email: values.email,
        payment_method: values.payment_method,
        card_holder_name: values.card_holder_name,
        card_number: values.card_number,
        card_exp_date: values.card_exp_date,
        card_cvv: values.card_cvv,
      }))
      navigate("/Register/ShippingProvider", {
        state: {
          ...formData,
          payment_info: paymentInfo,
          ...response.data,
        },
      });
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Failed to complete store setup"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <Helmet>
        <title>Set Up Store</title>
      </Helmet>
      <div className="w-full lg:w-[600px] md:w-[600px] bg-white rounded-lg shadow-lg">
        <div className="flex justify-center my-7">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>

        <div className="text-center">
          <h2 className="text-17 font-bold">Enter Your Payment Info</h2>
          <p className="text-14 text-gray-500">To Complete the Process</p>
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
        >
          {({ values, setFieldValue }) => (
            <Form className="ps-6 pe-6">
              <h2 className="font-bold mb-3 mt-3">Contact Info</h2>
              <div className="flex gap-3">
                <InputField name="name" placeholder="Name" />
                <InputField name="email" placeholder="Email" type="email" />
              </div>
              <div className="flex gap-3 mt-3 w-[274px]">
                <InputField
                  name="phone"
                  placeholder="Phone Number"
                  type="tel"
                />
              </div>
              <h2 className="font-bold mt-4 mb-3">Payment Method</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`rounded-lg p-3 flex items-center gap-2 font-bold text-14 cursor-pointer transition-colors ${
                      values.payment_method === method.id
                        ? "bg-primary-light border border-primary bg-customOrange-mediumOrange"
                        : "bg-gray-100 hover:bg-gray-200"
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
                    <img
                      src={method.icon}
                      alt={method.label}
                      className="w-10"
                    />
                    {method.label}
                  </label>
                ))}
              </div>
              {values.payment_method && (
                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="font-bold mt-4 mb-3">Payment Data</h4>
                  <div className="flex items-center gap-3">
                    <InputField name="card_cvv" placeholder="CVV" />
                    <Field
                      name="expiration_date"
                      placeholder="MM/YY"
                      type="date"
                      className={`w-full h-14 p-3 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14 focus:border-primary`}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value.length === 2 && !value.includes("/")) {
                          value = value + "/";
                        }
                        setFieldValue("expiration_date", value);
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <InputField
                      name="card_holder_name"
                      placeholder="Card Holder Name"
                    />
                    <InputField
                      name="card_number"
                      placeholder="Card Number"
                      type="tel"
                      inputMode="numeric"
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 justify-end my-5">
                <button
                  type="button"
                  onClick={() => navigate("/Register/PricingPlan")}
                  className="bg-gray-100 text-gray-400 w-36 rounded-md px-6 py-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary text-white flex w-36 justify-center text-16 items-center rounded-md px-6 py-2 gap-3 hover:bg-primary-dark transition-colors"
                >
                  {isLoading ? (
                    <ClipLoader size={20} color="#fff" />
                  ) : (
                    <>
                      Pay Now <FaArrowRightLong />
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
