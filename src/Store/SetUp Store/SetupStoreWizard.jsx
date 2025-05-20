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
    theme_primary_color: Yup.string()
      .required("Primary color is required")
      .matches(/^#[0-9A-F]{6}$/i, "Invalid hex color format"),
    theme_secondary_color: Yup.string()
      .required("Secondary color is required")
      .matches(/^#[0-9A-F]{6}$/i, "Invalid hex color format"),
    image: Yup.mixed()
      .required("Theme image is required")
      .test("fileSize", "File too large (max 5MB)", 
        (value) => value && value.size <= 5 * 1024 * 1024)
      .test("fileType", "Unsupported format (JPEG/PNG only)", 
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)),
    store_name: Yup.string()
      .required("Store name is required")
      .min(3, "Store name must be at least 3 characters"),
    address: Yup.string()
      .required("Address is required")
      .min(10, "Address must be at least 10 characters"),
    bio: Yup.string().max(500, "Bio cannot exceed 500 characters"),
    banners: Yup.array()
      .min(1, "At least one banner is required")
      .test("fileSize", "One or more files are too large (max 5MB each)", 
        (files) => files && files.every((file) => file.size <= 5 * 1024 * 1024))
      .test("fileType", "Unsupported format (JPEG/PNG only)", 
        (files) => files && files.every((file) => ["image/jpeg", "image/png"].includes(file.type)))
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
        });
      } else if (step === 3) {
        updateFormData("pricing", {
          plan_id: values.plan_id,
          plan_name: values.plan_name,
          plan_price: values.plan_price,
          plan_period: values.plan_period,
          plan_description: values.plan_description,
        });
      }
      setStep(step + 1);
      return;
    }

    // Final submission (step 4 handled by PaymentInfo)
    setIsLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const formDataToSend = new FormData();

      // Append all sections
      ['theme', 'profile', 'pricing', 'payment_info'].forEach(section => {
        if (formData[section]) {
          Object.entries(formData[section]).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((item, index) => {
                formDataToSend.append(`${section}[${key}][${index}]`, item);
              });
            } else if (value instanceof File) {
              formDataToSend.append(`${section}_${key}`, value);
            } else {
              formDataToSend.append(`${section}[${key}]`, value);
            }
          });
        }
      });

      console.log("Final submission data:", Object.fromEntries(formDataToSend.entries()));

      const response = await setUpStore(formDataToSend);
      console.log("API response:", response);

      setSubmitSuccess(true);
      resetForm();
      setPreviewImage(null);
      setBannerPreviews([]);
      setFormData({});
    } catch (error) {
      console.error("Submission error:", error);
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
        {[1, 2, 3, 4].map((stepNum) => (
          <div key={stepNum} className={`step ${step === stepNum ? "active" : ""}`}>
            {stepNum}. {['Theme', 'Profile', 'Pricing', 'Payment'][stepNum - 1]}
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
        {({ values, setFieldValue }) => (
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
                onSubmit={() => handleSubmit(values, {})}
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