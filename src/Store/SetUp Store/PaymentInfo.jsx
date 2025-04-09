import { Form, Formik, Field } from "formik";
import React from "react";
import * as Yup from "yup";
import InputField from "../../Components/InputFields/InputField";
import { FaArrowRightLong } from "react-icons/fa6";
import { Helmet } from "react-helmet";
function PaymentInfo({ onSubmit, onBack, formData, updateFormData }) {
  const initialValues = {
    name: "",
    email: "",
    phone_number: "",
    payment_method: "credit_card",
    card_holder_name: "",
    card_number: "",
    expiration_date: "",
    cvv: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be at least 10 digits")
      .required("Phone number is required"),
    card_holder_name: Yup.string().when("payment_method", {
      is: "credit_card",
      then: Yup.string().required("Card holder name is required"),
    }),
    card_number: Yup.string().when("payment_method", {
      is: "credit_card",
      then: Yup.string()
        .required("Card number is required")
        .matches(/^\d{16}$/, "Card number must be 16 digits"),
    }),
    expiration_date: Yup.string().when("payment_method", {
      is: "credit_card",
      then: Yup.string()
        .required("Expiration date is required")
        .matches(
          /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
          "Invalid expiration date (MM/YY)"
        ),
    }),
    cvv: Yup.string().when("payment_method", {
      is: "credit_card",
      then: Yup.string()
        .required("CVV is required")
        .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
    }),
  });

  const handleSubmit = (values) => {
    updateFormData("payment_info", values);
    onSubmit();
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <Helmet>
        <title>Set Up Store </title>
      </Helmet>
      <div className="w-full lg:w-600px md:w-600px bg-white rounded-lg shadow-lg">
        <div className="flex justify-center my-7">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>

        <div className="text-center">
          <h2 className="text-17 font-bold">Enter Your Payment Info</h2>
          <p className="text-14 text-gray-500">To Complete the Process</p>
        </div>

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
              <div className="flex gap-3 mt-3">
                <InputField
                  name="phone_number"
                  placeholder="Phone Number"
                  type="tel"
                />
              </div>

              <h2 className="font-bold mt-4 mb-3">Payment Method</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`rounded-md p-3 flex items-center gap-2 text-13 cursor-pointer transition-colors ${
                      values.payment_method === method.id
                        ? "bg-primary-light border border-primary"
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
                    <img src={method.icon} alt={method.label} className="w-6" />
                    {method.label}
                  </label>
                ))}
              </div>

              {values.payment_method === "credit_card" && (
                <div className="mt-4 bg-gray-50 rounded-md p-4 border border-gray-200">
                  <h2 className="font-bold mb-3">Card Details</h2>
                  <div className="flex gap-3">
                    <InputField
                      name="card_holder_name"
                      placeholder="Card Holder Name"
                    />
                    <InputField
                      name="card_number"
                      placeholder="Card Number"
                      type="text"
                      maxLength="16"
                    />
                  </div>
                  <div className="flex gap-3 mt-3">
                    <InputField
                      name="expiration_date"
                      placeholder="Expiration Date (MM/YY)"
                      type="text"
                      maxLength="5"
                    />
                    <InputField
                      name="cvv"
                      placeholder="CVV"
                      type="text"
                      maxLength="4"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 justify-end my-5">
                <button
                  type="button"
                  onClick={onBack}
                  className="bg-gray-100 text-gray-400 w-36 rounded-md px-6 py-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white flex w-36 justify-center text-16 items-center rounded-md px-6 py-2 gap-3 hover:bg-primary-dark transition-colors"
                >
                  Pay Now <FaArrowRightLong />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PaymentInfo;
