import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { setUpStore } from "../../ApiServices/setUpStore";
import "./setUpStoreStyle.scss";
import PricingPlan from "./PricingPlan";
import PaymentInfo from "./PaymentInfo";

const StoreSetupWizard = () => {
  const [step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({});

  const initialValues = {
    // Step 1: Theme
    theme_primary_color: "",
    theme_secondary_color: "",
    image: null,

    // Step 2: Profile
    store_name: "",
    address: "",
    bio: "",
    banners: [],

    // Step 3: Pricing
    plan_id: null,

    // Step 4: Payment
    name: "",
    email: "",
    phone: "",
    payment_method: "",
    card_holder_name: "",
    card_number: "",
    expiration_date: "",
    card_cvv: "",
  };

  const validationSchema = Yup.object().shape({
    // Step 1 validation
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

    // Step 2 validation
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
  });

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
      bannerPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previewImage, bannerPreviews]);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (step < 4) {
      // Handle steps 1-3
      if (step === 1) {
        updateFormData("theme", {
          theme_primary_color: values.theme_primary_color,
          theme_secondary_color: values.theme_secondary_color,
          image: values.image,
        });
      } else if (step === 2) {
        updateFormData("profile", {
          store_name: values.store_name,
          address: values.address,
          bio: values.bio,
          banners: values.banners,
          name: values.name,
          email: values.email,
          phone: values.phone,
        });
      } else if (step === 3) {
        updateFormData("pricing", {
          plan_id: values.plan_id,
        });
      }
      setStep(step + 1);
      return;
    }

    // Final submission (step 4)
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const formDataToSend = new FormData();

      // Prepare complete data
      const completeData = {
        ...formData,
        payment_info: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          payment_method: values.payment_method,
          card_holder_name: values.card_holder_name,
          card_number: values.card_number,
          expiration_date: values.expiration_date,
          card_cvv: values.card_cvv,
        },
      };

      // Append all data to FormData
      for (const section in completeData) {
        if (completeData[section] && typeof completeData[section] === 'object') {
          for (const key in completeData[section]) {
            const value = completeData[section][key];
            
            if (Array.isArray(value)) {
              value.forEach((item, index) => {
                if (item instanceof File) {
                  formDataToSend.append(`${section}[${key}][${index}]`, item);
                } else {
                  formDataToSend.append(`${section}[${key}][${index}]`, item);
                }
              });
            } else if (value instanceof File) {
              formDataToSend.append(`${section}_${key}`, value);
            } else if (value !== null && value !== undefined) {
              formDataToSend.append(`${section}[${key}]`, value);
            }
          }
        }
      }

      const response = await setUpStore(formDataToSend);
      console.log("API response:", response);

      if (response.status) {
        setSubmitSuccess(true);
        resetForm();
        setPreviewImage(null);
        setBannerPreviews([]);
        setFormData({});
      } else {
        setSubmitError(response.message || "Failed to complete store setup");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Failed to complete store setup"
      );
    }
  };

  return (
    <div className="store-setup-container">
      <h2>Store Setup Wizard</h2>
      <div className="step-indicator">
        {[1, 2, 3, 4].map((stepNum) => (
          <div
            key={stepNum}
            className={`step ${step === stepNum ? "active" : ""}`}
          >
            {stepNum}. {["Theme", "Profile", "Pricing", "Payment"][stepNum - 1]}
          </div>
        ))}
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
        {({ values, setFieldValue, isValid, dirty }) => (
          <Form className="setup-form">
            {step === 1 && (
              <div className="form-step">
                {/* Theme step form fields */}
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                {/* Profile step form fields */}
              </div>
            )}

            {step === 3 && (
              <PricingPlan
                formData={formData}
                updateFormData={updateFormData}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}

            {step === 4 && (
              <PaymentInfo
                formData={formData}
                updateFormData={updateFormData}
                onSubmit={handleSubmit}
                onBack={() => setStep(3)}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StoreSetupWizard;