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
const StoreProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [themeData, setThemeData] = useState(null);

  const steps = [
    { number: 1, title: "Store Theme" },
    { number: 2, title: "Store Profile" },
    { number: 3, title: "Pricing Plan" },
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

  return (
    <div className="p-3 bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange min-h-screen flex items-center justify-center">
      <Helmet>
        <title>Set Up Store </title>
      </Helmet>
      <div className="bg-white rounded-md py-5 flex flex-col w-full max-w-2xl">
        <div className="flex justify-center my-5">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>
        <div className=" flex items-center gap-3 mb-5 px-6">
          <div className="rounded-full border-[5px] border-primary p-2 font-bold">
            1/3
          </div>
          <h3 className="text-15 font-bold">
            Let’s Get Started To Set Up Your Own Store .
          </h3>
        </div>
        <StepIndicator currentStep={2} steps={steps} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="w-full px-6">
              <h3 className="text-16 font-semibold mb-3">
                Fill The Store Profile
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <InputField name="store_name" placeholder="Store Name" />
                <InputField name="address" placeholder="Location" />
              </div>
              <Field
                as="textarea"
                name="bio"
                placeholder="Bio"
                className={`w-full p-3 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14 placeholder:text-gray-400 focus:border-primary`}
              />
              <div className="flex justify-between mt-5">
                <button
                  type="button"
                  onClick={() => navigate("/Register/ThemeStore")}
                  className="flex font-bold items-center gap-3 text-dark px-6 py-2"
                >
                  <FaArrowLeftLong />
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white rounded-md p-3 w-32 flex items-center gap-2 justify-center disabled:opacity-70"
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
};
export default StoreProfile;