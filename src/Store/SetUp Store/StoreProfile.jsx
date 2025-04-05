import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setUpStore } from "../../ApiServices/setUpStore";
import "./setUpStoreStyle.scss";
import { useNavigate } from "react-router-dom";

const StoreProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [themeData, setThemeData] = useState(null);

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
    banners: [],
  };

  const validationSchema = Yup.object({
    store_name: Yup.string()
      .required("Store name is required")
      .min(3, "Must be at least 3 characters"),
    address: Yup.string()
      .required("Address is required")
      .min(10, "Must be at least 10 characters"),
    bio: Yup.string().max(500, "Cannot exceed 500 characters"),
    banners: Yup.array()
      .min(1, "At least one banner is required")
      .test("fileSize", "File too large (max 5MB each)", (files) =>
        files.every((file) => file.size <= 5 * 1024 * 1024)
      )
      .test("fileType", "Unsupported format (JPEG/PNG only)", (files) =>
        files.every((file) => ["image/jpeg", "image/png"].includes(file.type))
      ),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.append("store_name", values.store_name);
      formData.append("address", values.address);
      formData.append("bio", values.bio || "");

      // Include theme data references
      if (themeData) {
        formData.append("theme_primary_color", themeData.theme_primary_color);
        formData.append(
          "theme_secondary_color",
          themeData.theme_secondary_color
        );
      }
      values.banners.forEach((banner, index) => {
        formData.append(`banners[${index}]`, banner);
      });

      const response = await setUpStore(formData);

      if (response.status === true || response.code === 200) {
        setSubmitSuccess(true);
        localStorage.removeItem("storeProfileData");
        setTimeout(() => navigate("/"), 1500);
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
      setSubmitError(error.message || "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="store-profile-container">
      <h2>Store Profile Setup</h2>

      {themeData && (
        <div className="theme-summary">
          <h4>Your Theme Configuration:</h4>
          <p>Primary Color: {themeData.theme_primary_color}</p>
          <p>Secondary Color: {themeData.theme_secondary_color}</p>
          <p>Banners: {themeData.banners?.length || 0} uploaded</p>
        </div>
      )}

      {submitSuccess && (
        <div className="alert alert-success">
          Store setup complete! Redirecting...
        </div>
      )}

      {submitError && <div className="alert alert-error">{submitError}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="profile-form">
            <div className="form-group">
              <label htmlFor="store_name">Store Name *</label>
              <Field
                type="text"
                name="store_name"
                className={
                  touched.store_name && errors.store_name ? "error" : ""
                }
              />
              <ErrorMessage
                name="store_name"
                component="div"
                className="field-error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <Field
                type="text"
                name="address"
                className={touched.address && errors.address ? "error" : ""}
              />
              <ErrorMessage
                name="address"
                component="div"
                className="field-error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Store Bio</label>
              <Field
                as="textarea"
                name="bio"
                rows={4}
                placeholder="Tell customers about your store..."
              />
              <ErrorMessage
                name="bio"
                component="div"
                className="field-error"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`submit-btn ${isLoading ? "loading" : ""}`}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : (
                "Complete Setup"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StoreProfile;
