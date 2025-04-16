import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import InputField from "../../Components/InputFields/InputField";
import { ImageUpload } from "../../Components/Upload Image/UploadImage";
import * as Yup from "yup";
import { setUpStore } from "../../ApiServices/setUpStore";
import "./setUpStoreStyle.scss";
import { ClipLoader } from "react-spinners";
import PricingPlan from "./PricingPlan";
import PaymentInfo from "./PaymentInfo";

const StoreSetupWizard = () => {
  const [step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({});

  const initialValues = {
    theme_primary_color: "",
    theme_secondary_color: "",
    image: null,
    store_name: "",
    address: "",
    bio: "",
    banners: [],
    plan_id: null,
    payment_info: null
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
 ) });

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
      bannerPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previewImage, bannerPreviews]);

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (step === 1) {
      updateFormData("theme", {
        theme_primary_color: values.theme_primary_color,
        theme_secondary_color: values.theme_secondary_color,
        image: values.image
      });
      setStep(2);
      return;
    }

    if (step === 2) {
      updateFormData("profile", {
        store_name: values.store_name,
        address: values.address,
        bio: values.bio,
        banners: values.banners
      });
      setStep(3);
      return;
    }

    if (step === 3) {
      updateFormData("pricing", {
        plan_id: values.plan_id,
        plan_name: values.plan_name,
        plan_price: values.plan_price,
        plan_period: values.plan_period,
        plan_description: values.plan_description
      });
      setStep(4);
      return;
    }

    setIsLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const completeFormData = {
        ...formData.theme,
        ...formData.profile,
        ...formData.pricing,
        ...formData.payment_info
      };

      const formDataToSend = new FormData();
      
      Object.entries(completeFormData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => formDataToSend.append(`${key}[]`, item));
        } else if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formDataToSend.append(`${key}[${subKey}]`, subValue);
          });
        } else {
          formDataToSend.append(key, value);
        }
      });

      const data = await setUpStore(formDataToSend);
      console.log("API Response:", data);

      setSubmitSuccess(true);
      resetForm();
      setPreviewImage(null);
      setBannerPreviews([]);
      setFormData({});
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
        <div className={`step ${step === 4 ? "active" : ""}`}>4. Payment</div>
      </div>

      {submitSuccess && (
        <div className="alert alert-success">
          Store setup completed successfully!
        </div>
      )}

      {submitError && <div className="alert alert-error">{submitError}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={step <= 2 ? validationSchema : Yup.object()}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched, isValid, dirty }) => (
          <Form className="setup-form">
            {step === 1 ? (
              <div className="form-step">
                {/* Step 1 content */}
              </div>
            ) : step === 2 ? (
              <div className="form-step">
                {/* Step 2 content */}
              </div>
            ) : step === 3 ? (
              <PricingPlan
                onNext={() => {
                  updateFormData("pricing", {
                    plan_id: values.plan_id,
                    plan_name: values.plan_name,
                    plan_price: values.plan_price,
                    plan_period: values.plan_period,
                    plan_description: values.plan_description
                  });
                  setStep(4);
                }}
                onBack={() => setStep(2)}
              />
            ) : (
              <PaymentInfo
                onSubmit={() => handleSubmit(values, {})}
                onBack={() => setStep(3)}
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StoreSetupWizard;