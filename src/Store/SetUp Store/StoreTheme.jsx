import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ChromePicker } from "react-color";
import { FaArrowRightLong, FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const StoreTheme = ({ initialData = {}, onSuccess = () => {} }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    image: null,
    theme_primary_color: "#3B82F6",
    theme_secondary_color: "#10B981",
    ...initialData,
  };

  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required("Logo is required")
      .test("fileSize", "File too large", (value) => {
        if (!value) return true; // if no file, let required validation handle it
        return value.size <= 1024 * 1024 * 2; // 2MB max
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "image/svg+xml"].includes(value.type);
      }),
    theme_primary_color: Yup.string().matches(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color"),
    theme_secondary_color: Yup.string().matches(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color"),
  });

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("image", file);
      setFileName(file.name);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setUploadProgress(progress);
      }, 200);

      // Create preview for image
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event, setFieldValue) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const event = { currentTarget: { files: [file] } };
      handleFileChange(event, setFieldValue);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (setFieldValue) => {
    setFieldValue("image", null);
    setPreviewImage(null);
    setFileName("");
    setUploadProgress(0);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSuccess(values);
        navigate("/Register/StoreProfile");
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="p-6 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center text-lg font-semibold">
              <span className="text-orange-500 text-xl font-bold">1 / 3</span>
              <span className="ml-2">Let's Get Started To Set Up Your Own Store.</span>
            </div>
          </div>

          {/* Step Tabs */}
          <div className="flex border-b mb-6">
            <div className="flex-1 text-center py-2 border-b-4 border-orange-500 font-semibold">Step 1 - Store Theme</div>
            <div className="flex-1 text-center py-2 text-gray-400">Step 2 - Store Profile</div>
            <div className="flex-1 text-center py-2 text-gray-400">Step 3 - Pricing Plan</div>
          </div>

          {/* File Upload */}
          <div 
            className="border border-dashed border-gray-300 rounded-lg p-4 text-center mb-6"
            onDrop={(e) => handleDrop(e, setFieldValue)}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={(e) => handleFileChange(e, setFieldValue)}
              accept="image/jpeg, image/png, image/svg+xml"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <p className="text-gray-500">
                Drag & Drop Your Logo File Here OR <span className="text-orange-500">Browse Files</span>
              </p>
            </label>
            
            {previewImage && (
              <div className="mt-4 bg-gray-100 p-2 rounded-lg flex items-center justify-between">
                <span className="text-gray-700 truncate max-w-xs">{fileName}</span>
                <div className="w-2/3 bg-gray-300 h-2 rounded-lg overflow-hidden mx-2">
                  <div className="bg-orange-500 h-2" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <FaTrash 
                  className="text-red-500 cursor-pointer" 
                  onClick={() => removeFile(setFieldValue)} 
                />
              </div>
            )}
            
            {errors.image && touched.image && (
              <div className="text-red-500 text-sm mt-2">{errors.image}</div>
            )}
          </div>

          {/* Color Pickers */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Enter Your Store Theme Colors</h3>
            <div className="flex gap-4">
              {/* Primary Color */}
              <div className="relative flex-1">
                <label className="block mb-1">Primary Color</label>
                <div className="flex items-center border rounded-lg p-2 cursor-pointer" onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}>
                  <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: values.theme_primary_color }}></div>
                  <span className="ml-2">{values.theme_primary_color}</span>
                </div>
                {showPrimaryPicker && (
                  <div className="absolute z-10 mt-2">
                    <ChromePicker 
                      color={values.theme_primary_color} 
                      onChangeComplete={(color) => {
                        setFieldValue("theme_primary_color", color.hex);
                        setShowPrimaryPicker(false);
                      }} 
                    />
                  </div>
                )}
              </div>
              
              {/* Secondary Color */}
              <div className="relative flex-1">
                <label className="block mb-1">Secondary Color</label>
                <div className="flex items-center border rounded-lg p-2 cursor-pointer" onClick={() => setShowSecondaryPicker(!showSecondaryPicker)}>
                  <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: values.theme_secondary_color }}></div>
                  <span className="ml-2">{values.theme_secondary_color}</span>
                </div>
                {showSecondaryPicker && (
                  <div className="absolute z-10 mt-2">
                    <ChromePicker 
                      color={values.theme_secondary_color} 
                      onChangeComplete={(color) => {
                        setFieldValue("theme_secondary_color", color.hex);
                        setShowSecondaryPicker(false);
                      }} 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="flex items-center px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              disabled={!values.image}
            >
              Next <FaArrowRightLong className="ml-2" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StoreTheme;