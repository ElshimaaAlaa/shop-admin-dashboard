import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import InputField from "../../Components/InputFields/InputField";
import { ImageUpload } from "../../Components/Upload Image/UploadImage";
import * as Yup from "yup";
import { setUpStore } from "../../ApiServices/setUpStore";
import "./setUpStoreStyle.scss";
import { ClipLoader } from "react-spinners";
import PricingPlan from "./PricingPlan";

const StoreSetupWizard = () => {
  const [step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const initialValues = {
    theme_primary_color: "",
    theme_secondary_color: "",
    image: null,
    store_name: "",
    address: "",
    bio: "",
    banners: [],
    plan_id: null,
  };

  const validationSchema = Yup.object().shape({
    theme_primary_color: Yup.string()
      .required("Primary color is required")
      .matches(/^#[0-9A-F]{6}$/i, "Invalid hex color format"),
    theme_secondary_color: Yup.string()
      .required("Secondary color is required")
      .matches(/^#[0-9A-F]{6}$/i, "Invalid hex color format"),
    image: Yup.mixed()
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
    store_name: Yup.string()
      .required("Store name is required")
      .min(3, "Store name must be at least 3 characters"),
    address: Yup.string()
      .required("Address is required")
      .min(10, "Address must be at least 10 characters"),
    bio: Yup.string().max(500, "Bio cannot exceed 500 characters"),
    banners: Yup.array()
      .min(1, "At least one banner is required")
      .test(
        "fileSize",
        "One or more files are too large (max 5MB each)",
        (files) => files && files.every((file) => file.size <= 5 * 1024 * 1024)
      )
      .test(
        "fileType",
        "Unsupported format (JPEG/PNG only)",
        (files) =>
          files &&
          files.every((file) => ["image/jpeg", "image/png"].includes(file.type))
      ),
    plan_id: Yup.number()
      .required("Plan selection is required")
      .oneOf([1, 2, 3], "Please select a valid plan"),
  });

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
      bannerPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previewImage, bannerPreviews]);

  const handleSubmit = async (values, { resetForm }) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    setIsLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const formData = new FormData();
      // Theme data
      formData.append("theme_primary_color", values.theme_primary_color);
      formData.append("theme_secondary_color", values.theme_secondary_color);
      formData.append("image", values.image);

      // Store info
      formData.append("store_name", values.store_name);
      formData.append("address", values.address);
      if (values.bio) formData.append("bio", values.bio);

      // Plan data
      formData.append("plan_id", values.plan_id);
      formData.append("plan_name", values.plan_name);
      formData.append("plan_price", values.plan_price);
      formData.append("plan_period", values.plan_period);
      formData.append("plan_description", values.plan_description);

      // Banners
      values.banners.forEach((banner) => {
        formData.append("banners[]", banner);
      });

      const data = await setUpStore(formData);
      console.log("API Response:", data);

      setSubmitSuccess(true);
      resetForm();
      setPreviewImage(null);
      setBannerPreviews([]);

      setTimeout(() => setSubmitSuccess(false), 5000);
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
    <div className="store-setup-container">
      <h2>Store Setup Wizard</h2>

      <div className="step-indicator">
        <div className={`step ${step === 1 ? "active" : ""}`}>1. Theme</div>
        <div className={`step ${step === 2 ? "active" : ""}`}>2. Profile</div>
        <div className={`step ${step === 3 ? "active" : ""}`}>3. Pricing</div>
      </div>

      {submitSuccess && (
        <div className="alert alert-success">
          Store setup completed successfully!
        </div>
      )}

      {submitError && <div className="alert alert-error">{submitError}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched, isValid, dirty }) => (
          <Form className="setup-form">
            {step === 1 ? (
              <div className="form-step">
                <div className="form-section">
                  <h3>Color Scheme</h3>
                  <div className="color-fields">
                    <InputField
                      name="theme_primary_color"
                      label="Primary Color"
                      placeholder="#HEXCODE"
                    />
                    <InputField
                      name="theme_secondary_color"
                      label="Secondary Color"
                      placeholder="#HEXCODE"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Theme Image</h3>
                  <ImageUpload
                    name="image"
                    previewImage={previewImage}
                    onImageChange={(event) => {
                      const file = event.target.files[0];
                      if (file) {
                        if (previewImage) URL.revokeObjectURL(previewImage);
                        setPreviewImage(URL.createObjectURL(file));
                        setFieldValue("image", file);
                      }
                    }}
                    error={touched.image && errors.image}
                    accept="image/jpeg, image/png"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className="next-btn"
                  >
                    {isLoading ? <ClipLoader size={22} color="#fff" /> : "Next"}
                  </button>
                </div>
              </div>
            ) : step === 2 ? (
              <div className="form-step">
                <div className="form-section">
                  <h3>Store Information</h3>
                  <InputField name="store_name" />
                  <InputField name="address" />
                  <InputField name="bio" type="textarea" as="textarea" />
                </div>

                <div className="form-section">
                  <h3>Store Banners</h3>
                  <input
                    id="banners"
                    name="banners"
                    type="file"
                    multiple
                    accept="image/jpeg, image/png"
                    onChange={(event) => {
                      const files = Array.from(event.target.files);
                      setFieldValue("banners", files);
                      bannerPreviews.forEach((preview) =>
                        URL.revokeObjectURL(preview)
                      );
                      const previews = files.map((file) =>
                        URL.createObjectURL(file)
                      );
                      setBannerPreviews(previews);
                    }}
                    className="banner-upload"
                  />
                  {touched.banners && errors.banners && (
                    <div className="field-error">{errors.banners}</div>
                  )}
                  <div className="banner-previews">
                    {bannerPreviews.map((preview, index) => (
                      <div key={index} className="banner-preview-container">
                        <img
                          src={preview}
                          alt={`Banner preview ${index + 1}`}
                          className="banner-preview"
                        />
                        <button
                          type="button"
                          className="remove-banner"
                          onClick={() => {
                            const updatedBanners = [...values.banners];
                            updatedBanners.splice(index, 1);
                            setFieldValue("banners", updatedBanners);
                            URL.revokeObjectURL(preview);
                            const updatedPreviews = [...bannerPreviews];
                            updatedPreviews.splice(index, 1);
                            setBannerPreviews(updatedPreviews);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="back-btn"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className="next-btn"
                  >
                    {isLoading ? <ClipLoader size={20} color="#fff" /> : "Next"}
                  </button>
                </div>
              </div>
            ) : (
              <PricingPlan
                onNext={() => handleSubmit(values, {})}
                onBack={() => setStep(2)}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StoreSetupWizard;
