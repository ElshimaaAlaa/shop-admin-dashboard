import { Formik, Form, Field } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setUpStore } from "../../ApiServices/setUpStore";
import { ClipLoader } from "react-spinners";
import LogoUpload from "../../Components/Upload Image/UploadLogo";
import BannerUpload from "../../Components/Upload Image/UploadBanner";
import StepIndicator from "./StepIndicator";
import { FaArrowRightLong } from "react-icons/fa6";
import { Helmet } from "react-helmet";

function ThemeStore() {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const steps = [
    { number: 1, title: "Store Theme" },
    { number: 2, title: "Store Profile" },
    { number: 3, title: "Pricing Plan" },
  ];

  const initialValues = {
    theme_primary_color: "",
    theme_secondary_color: "",
    theme_image: null,
    banners: [],
    bannerPreviews: [],
  };

  const validationSchema = Yup.object({
    theme_primary_color: Yup.string()
      .required("Primary color is required")
      .matches(/^#[0-9A-F]{6}$/i, "Invalid hex color format"),
    theme_secondary_color: Yup.string()
      .required("Secondary color is required")
      .matches(/^#[0-9A-F]{6}$/i, "Invalid hex color format"),
    theme_image: Yup.mixed()
      .required("Theme image is required")
      .test(
        "fileSize",
        "File too large (max 5MB)",
        (value) => value && value.size <= 5 * 1024 * 1024
      )
      .test(
        "fileType",
        "Unsupported format (JPEG/PNG only)",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
    banners: Yup.array()
      .min(1, "At least one banner is required")
      .test("fileSize", "File too large (max 5MB each)", (files) =>
        files.every((file) => file.size <= 5 * 1024 * 1024)
      )
      .test("fileType", "Unsupported format (JPEG/PNG only)", (files) =>
        files.every((file) => ["image/jpeg", "image/png"].includes(file.type))
      ),
  });

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
      bannerPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previewImage, bannerPreviews]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.append("theme_primary_color", values.theme_primary_color);
      formData.append("theme_secondary_color", values.theme_secondary_color);
      formData.append("theme_image", values.theme_image);

      values.banners.forEach((banner, index) => {
        formData.append(`banners[${index}]`, banner);
      });
      const bannersData = values.banners.map((banner) => ({
        name: banner.name,
        size: banner.size,
        type: banner.type,
        lastModified: banner.lastModified,
      }));
      localStorage.setItem(
        "storeThemeData",
        JSON.stringify({
          theme_primary_color: values.theme_primary_color,
          theme_secondary_color: values.theme_secondary_color,
          banners: bannersData,
        })
      );
      const response = await setUpStore(formData);
      if (response?.status === true || response?.code === 200) {
        console.log("Navigation to StoreProfile");
        navigate("/Register/StoreProfile", { replace: true });
      } else {
        throw new Error(response?.message || "Theme setup failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(error.message || "Failed to save theme configuration");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 md:p-16 bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange min-h-screen flex items-center justify-center">
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
            Let’s Get Started To Set Up Your Own Store .{" "}
          </h3>
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
                  name="theme_image"
                  setFieldValue={(field, value) => {
                    if (field === "theme_image") {
                      setFieldValue("theme_image", value);
                      if (value) {
                        if (previewImage) URL.revokeObjectURL(previewImage);
                        setPreviewImage(URL.createObjectURL(value));
                      } else {
                        setPreviewImage(null);
                      }
                    }
                  }}
                  error={touched.theme_image && errors.theme_image}
                  accept="image/jpeg, image/png"
                />
              </div>
              <BannerUpload
                banners={values.banners}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              <h3 className="text-16 font-semibold mb-3 px-6">
                Enter Your Store Theme Colors
              </h3>
              <div className="flex gap-3 mb-6 px-6">
                <Field
                  name="theme_primary_color"
                  placeholder="Primary Color"
                  className={`w-full bg-gray-50 p-3 border rounded-md outline-none transition-all duration-200 placeholder:text-14 placeholder:text-gray-500 focus:border-primary ${
                    touched.theme_primary_color && errors.theme_primary_color
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                />
                <Field
                  name="theme_secondary_color"
                  placeholder="Secondary Color"
                  className={`w-full bg-gray-50 p-3 border rounded-md outline-none transition-all duration-200 placeholder:text-14 placeholder:text-gray-500 focus:border-primary${
                    touched.theme_secondary_color &&
                    errors.theme_secondary_color
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>

              <div className="flex  justify-end mt-5 px-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
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
}
export default ThemeStore;
