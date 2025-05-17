import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchShippingProviders } from "../../ApiServices/ShippingProviders";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { setUpStore } from "../../ApiServices/setUpStore";

function ShippingProvider() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getShippingProviders = async () => {
      try {
        setLoading(true);
        const response = await fetchShippingProviders();
        const data = response?.data || [];

        if (Array.isArray(data)) {
          setProviders(data);
        } else {
          console.warn("Expected array but got:", data);
          setProviders([]);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load shipping providers");
      } finally {
        setLoading(false);
      }
    };

    getShippingProviders();
  }, []);

  const initialValues = {
    shipping_provider: []
  };

  const validationSchema = Yup.object().shape({
    shipping_provider: Yup.array()
      .min(1, "Please select at least one shipping provider")
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const providersString = values.shipping_provider.join(',');
      formData.append('shipping_provider', providersString);
      localStorage.setItem('shipping_provider', providersString);
      const response = await setUpStore(formData);
      console.log('shipping' , response)
      if (response) {
        navigate("/Register/PaymentMethod");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setError(error.response?.data?.message || "Failed to save shipping providers");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <Helmet>
        <title>Set Up Store - Shipping Providers</title>
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
                    Select Shipping Providers
                  </h3>
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {providers.length > 0 ? (
                        providers.map((provider) => (
                          <div
                            key={provider.id}
                            className={`border rounded-md p-2 cursor-pointer transition-all bg-gray-50  ${
                              values.shipping_provider.includes(provider.name)
                                ? "bg-customOrange-lightOrange border-primary"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => {
                              const currentProviders = [...values.shipping_provider];
                              const providerIndex = currentProviders.indexOf(provider.name);
                              
                              if (providerIndex === -1) {
                                currentProviders.push(provider.name);
                              } else {
                                currentProviders.splice(providerIndex, 1);
                              }
                              
                              setFieldValue('shipping_provider', currentProviders);
                            }}
                          >
                            <label className="inline-flex items-center cursor-pointer w-full">
                              <Field
                                type="checkbox"
                                name="shipping_provider"
                                value={provider.name}
                                className="hidden peer"
                                checked={values.shipping_provider.includes(provider.name)}
                                onChange={() => {}}
                              />
                              <span className="w-4 h-4 border border-black rounded flex items-center justify-center transition-all duration-200 peer-checked:border-primary">
                                <svg
                                  className="w-3 h-3 text-primary opacity-0 transition-all duration-200 peer-checked:opacity-100"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                </svg>
                              </span>
                              <span className="text-14 text-black ms-3">
                                {provider.name ||
                                  provider.name_en ||
                                  `Provider ${provider.id}`}
                              </span>
                            </label>
                          </div>
                        ))
                      ) : (
                        <p className="col-span-2 text-center text-gray-400 text-15 py-4">
                          No shipping providers available
                        </p>
                      )}
                    </div>
                    {errors.shipping_provider && touched.shipping_provider && (
                      <div className="text-red-500 text-sm mt-2 px-6">
                        {errors.shipping_provider}
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className="flex justify-between mb-5">
                <button
                  type="button"
                  onClick={() => navigate("/Register/ThemeStore")}
                  className="flex font-bold items-center gap-3 text-dark pb-4 mx-6"
                >
                  <FaArrowLeftLong />
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-primary me-5 text-white rounded-md p-3 w-32 flex items-center gap-2 justify-center disabled:opacity-70"
                  disabled={isLoading || values.shipping_provider.length === 0}
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
export default ShippingProvider;