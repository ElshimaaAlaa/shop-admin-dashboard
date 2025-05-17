import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { setUpStore } from "../../ApiServices/setUpStore";
import { fetchPaymentMethods } from "../../ApiServices/PaymentMethods";

function PaymentMethods() {
  const [paymentMethods, setpaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPaymentMethods = async () => {
      try {
        setLoading(true);
        const response = await fetchPaymentMethods();
        const data = response?.data || [];

        if (Array.isArray(data)) {
          setpaymentMethods(data);
        } else {
          console.warn("Expected array but got:", data);
          setpaymentMethods([]);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load payment method");
      } finally {
        setLoading(false);
      }
    };
    getPaymentMethods();
  }, []);

  const initialValues = {
    payment_method: [],
  };

  const validationSchema = Yup.object().shape({
    payment_method: Yup.array().min(
      1,
      "Please select at least one shipping provider"
    ),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const paymentMethodString = values.payment_method.join(",");
      formData.append("payment_method", paymentMethodString);
      localStorage.setItem("payment_method", paymentMethodString);
      const response = await setUpStore(formData);
      console.log("payment method", response);
      if (response) {
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setError(
        error.response?.data?.message || "Failed to save payment method"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <Helmet>
        <title>Set Up Store - Payment Methods</title>
      </Helmet>
      <div className="w-full lg:w-[600px] md:w-[600px] bg-white rounded-lg shadow-lg">
        <div className="flex justify-center my-7">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>
        <div className="flex items-center gap-5 mb-5 px-6">
          <div className="rounded-full border-[5px] border-primary p-2 font-bold">
            2/3
          </div>
          <h3 className="text-15 font-bold">
            Set UP The Shipping Providers and Shipping Rates
          </h3>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              {loading ? (
                <div className="flex justify-center p-8">
                  <ClipLoader size={30} color="#E0A75E" />
                </div>
              ) : error ? (
                <div className="mx-6 p-4 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              ) : (
                <>
                  <h3 className="text-15 font-bold my-5 px-6">
                    Select Payment Methods
                  </h3>
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {paymentMethods.length > 0 ? (
                        paymentMethods.map((item) => (
                          <div
                            key={item.id}
                            className={`border rounded-lg p-2 bg-gray-50 cursor-pointer transition-all ${
                              values.payment_method.includes(item.name)
                                ? "bg-customOrange-lightOrange border-primary"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => {
                              const currentPaymentMthods = [
                                ...values.payment_method,
                              ];
                              const paymentIndex = currentPaymentMthods.indexOf(
                                item.name
                              );

                              if (paymentIndex === -1) {
                                currentPaymentMthods.push(item.name);
                              } else {
                                currentPaymentMthods.splice(paymentIndex, 1);
                              }

                              setFieldValue(
                                "payment_method",
                                currentPaymentMthods
                              );
                            }}
                          >
                            <label className="inline-flex items-center cursor-pointer w-full">
                              <Field
                                type="checkbox"
                                name="payment_method"
                                value={item.name}
                                className="hidden peer"
                                checked={values.payment_method.includes(
                                  item.name
                                )}
                                onChange={() => {}}
                              />
                              <span className="w-4 h-4 border-1 border-black rounded flex items-center justify-center transition-all duration-200 peer-checked:border-primary">
                                <svg
                                  className="w-3 h-3 text-primary opacity-0 transition-all duration-200 peer-checked:opacity-100"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                </svg>
                              </span>
                              <span className="text-14 text-black ms-3">
                                {item.name ||
                                  item.name_en ||
                                  `Provider ${item.id}`}
                              </span>
                            </label>
                          </div>
                        ))
                      ) : (
                        <p className="col-span-2 text-center text-gray-500 py-4">
                          No payment methods available
                        </p>
                      )}
                    </div>
                    {errors.payment_method && touched.payment_method && (
                      <div className="text-red-500 text-sm mt-2 px-6">
                        {errors.payment_method}
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className="flex justify-between mb-5">
                <button
                  type="button"
                  onClick={() => navigate("/Register/ShippingProvider")}
                  className="flex font-bold items-center gap-3 text-dark pb-4 mx-6"
                >
                  <FaArrowLeftLong />
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-primary me-5 text-white rounded-md p-3 w-32 flex items-center gap-2 justify-center disabled:opacity-70"
                  disabled={isLoading || values.payment_method.length === 0}
                >
                  {isLoading ? (
                    <ClipLoader size={22} color="#fff" />
                  ) : (
                    <>
                      Next
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
export default PaymentMethods;