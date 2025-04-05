import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../Components/InputFields/InputField";
import { ImageUpload } from "../../Components/Upload Image/UploadImage";
import * as Yup from "yup";
import { setUpStore } from "../../ApiServices/setUpStore";
import "./setUpStoreStyle.scss";

function ThemeStore() {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const initialValues = {
    theme_primary_color: "#6200ee",
    theme_secondary_color: "#03dac6",
    theme_image: null,
    banners: [],
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
      .test("fileSize", "File too large (max 5MB)", (value) => 
        value && value.size <= 5 * 1024 * 1024
      )
      .test("fileType", "Unsupported format (JPEG/PNG only)", (value) => 
        value && ["image/jpeg", "image/png"].includes(value.type)
      ),
    banners: Yup.array()
      .min(1, "At least one banner is required")
      .test("fileSize", "File too large (max 5MB each)", (files) => 
        files.every(file => file.size <= 5 * 1024 * 1024)
      )
      .test("fileType", "Unsupported format (JPEG/PNG only)", (files) => 
        files.every(file => ["image/jpeg", "image/png"].includes(file.type))
  )});

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
      bannerPreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [previewImage, bannerPreviews]);

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      const formData = new FormData();
      formData.append("theme_primary_color", values.theme_primary_color);
      formData.append("theme_secondary_color", values.theme_secondary_color);
      formData.append("theme_image", values.theme_image);
      
      values.banners.forEach((banner, index) => {
        formData.append(`banners[${index}]`, banner);
      });

      const response = await setUpStore(formData);
      
      if (response.status === true || response.code === 200) {
        setSubmitSuccess(true);
        
        // Store minimal banner data for reference
        const bannersData = values.banners.map(banner => ({
          name: banner.name,
          size: banner.size,
          type: banner.type,
          lastModified: banner.lastModified
        }));
        
        localStorage.setItem('storeThemeData', JSON.stringify({
          theme_primary_color: values.theme_primary_color,
          theme_secondary_color: values.theme_secondary_color,
          banners: bannersData
        }));

        setTimeout(() => {
          navigate('/Register/StoreProfile');
        }, 1500);
      } else {
        throw new Error(response.message || "Theme setup failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(error.message || "Failed to save theme configuration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="store-theme-container">
      <h2>Store Theme Configuration</h2>
      
      {submitSuccess && (
        <div className="alert alert-success">
          Theme saved successfully! Redirecting...
        </div>
      )}
      
      {submitError && (
        <div className="alert alert-error">
          {submitError}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="theme-form">
            <div className="form-section">
              <h3>Color Scheme</h3>
              <div className="color-fields">
                <InputField
                  name="theme_primary_color"
                  label="Primary Color"
                  type="color"
                  className="color-picker"
                />
                <InputField
                  name="theme_secondary_color"
                  label="Secondary Color"
                  type="color"
                  className="color-picker"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Theme Image</h3>
              <ImageUpload
                name="theme_image"
                previewImage={previewImage}
                onImageChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    if (previewImage) URL.revokeObjectURL(previewImage);
                    setPreviewImage(URL.createObjectURL(file));
                    setFieldValue("theme_image", file);
                  }
                }}
                error={touched.theme_image && errors.theme_image}
                accept="image/jpeg, image/png"
              />
              {touched.theme_image && errors.theme_image && (
                <div className="field-error">{errors.theme_image}</div>
              )}
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
                  bannerPreviews.forEach(preview => URL.revokeObjectURL(preview));
                  setBannerPreviews(files.map(file => URL.createObjectURL(file)));
                }}
                className={touched.banners && errors.banners ? 'error' : ''}
              />
              {touched.banners && errors.banners && (
                <div className="field-error">{errors.banners}</div>
              )}
              <div className="banner-previews">
                {bannerPreviews.map((preview, index) => (
                  <div key={index} className="banner-preview-container">
                    <img src={preview} alt={`Banner ${index + 1}`} className="banner-preview" />
                    <button
                      type="button"
                      className="remove-banner"
                      onClick={() => {
                        const updatedBanners = [...values.banners];
                        updatedBanners.splice(index, 1);
                        setFieldValue("banners", updatedBanners);
                        URL.revokeObjectURL(preview);
                        setBannerPreviews(prev => prev.filter((_, i) => i !== index));
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : "Save & Continue"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ThemeStore;