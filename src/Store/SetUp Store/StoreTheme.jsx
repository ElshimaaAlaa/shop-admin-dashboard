import { useState } from "react";
import PropTypes from 'prop-types';
import StepIndicator from "./StepIndicator";
import { Trash2 } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { ChromePicker } from "react-color";

export default function ThemeStore({ 
  onNext, 
  formData = {}, 
  updateFormData = () => {}, 
  isSubmitting, 
  errors = {},
  setErrors
}) {
  const [colors, setColors] = useState({
    primary: formData.theme_primary_color || '#3B82F6',
    secondary: formData.theme_secondary_color || '#10B981'
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setUploadProgress(100);
      updateFormData('image', selectedFile);
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: undefined }));
      }
    }
  };

  const handleRemoveFile = () => {
    setUploadProgress(0);
    updateFormData('image', null);
  };

  const handleColorChange = (color, type) => {
    const hexColor = color.hex;
    const newColors = {
      ...colors,
      [type]: hexColor
    };
    setColors(newColors);
    updateFormData(`theme_${type}_color`, hexColor);
    if (errors[`theme_${type}_color`]) {
      setErrors(prev => ({ ...prev, [`theme_${type}_color`]: undefined }));
    }
  };

  const handleNext = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.image) {
      newErrors.image = "Logo is required";
      isValid = false;
    }
    if (!colors.primary || !/^#[0-9A-F]{6}$/i.test(colors.primary)) {
      newErrors.theme_primary_color = "Valid primary color is required";
      isValid = false;
    }
    if (!colors.secondary || !/^#[0-9A-F]{6}$/i.test(colors.secondary)) {
      newErrors.theme_secondary_color = "Valid secondary color is required";
      isValid = false;
    }

    setErrors(newErrors);
    
    if (isValid) {
      onNext?.();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-4 md:p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header section */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex justify-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">VERTEX</h1>
          </div>
          <div className="flex items-center">
            <div className="bg-white border-4 border-blue-500 text-gray-800 font-bold rounded-full h-8 w-8 flex items-center justify-center text-xs mr-3">
              1/4
            </div>
            <h1 className="text-lg font-bold text-gray-800">
              Let's Setup Your Store Branding
            </h1>
          </div>
        </div>

        <StepIndicator currentStep={1} />

        <div className="p-6">
          {/* File Upload Section */}
          <section className="mb-8">
            <h2 className="text-md font-semibold text-gray-800 mb-3">Upload Store Logo</h2>
            <div className={`border-2 ${!formData.image && (errors.image ? 'border-red-500' : 'border-blue-400 hover:border-blue-500')} rounded-lg p-4 transition-all`}>
              {!formData.image ? (
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <img
                      src="/assets/svgs/upload-file_svgrepo.com.svg"
                      alt="Upload"
                      className="w-5"
                    />
                    <span className="text-sm font-medium">
                      Drag & drop your logo here or
                    </span>
                  </div>
                  <label className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer hover:bg-blue-100 transition-colors">
                    <span className="text-sm font-semibold">Browse Files</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".svg,.png,.jpg,.jpeg"
                    />
                  </label>
                </div>
              ) : (
                <div className="mt-4 bg-gray-100 p-4 rounded-md border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-gray-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                        />
                      </svg>
                      <p className="text-sm font-medium text-gray-800">{formData.image.name}</p>
                    </div>
                    <button 
                      onClick={handleRemoveFile}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="h-2 bg-gray-300 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">100% done</p>
                </div>
              )}
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
          </section>

          {/* Color Selection Section */}
          <section className="mb-8">
            <h2 className="text-md font-semibold text-gray-800 mb-4">
              Select Your Brand Colors
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Color */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Color {errors.theme_primary_color && (
                    <span className="text-red-500 text-xs"> - {errors.theme_primary_color}</span>
                  )}
                </label>
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-lg border border-gray-300 shadow-sm cursor-pointer"
                    style={{ backgroundColor: colors.primary }}
                    onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
                  />
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className={`w-full pl-3 pr-10 py-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.theme_primary_color ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={colors.primary}
                      onChange={(e) => handleColorChange({ hex: e.target.value }, 'primary')}
                      placeholder="#FFFFFF"
                    />
                    <span className="absolute right-3 top-2 text-xs text-gray-400">
                      HEX
                    </span>
                  </div>
                </div>
                {showPrimaryPicker && (
                  <div className="absolute z-10 mt-2">
                    <ChromePicker
                      color={colors.primary}
                      onChangeComplete={(color) => handleColorChange(color, 'primary')}
                    />
                    <button
                      className="mt-2 px-3 py-1 bg-gray-200 rounded-md text-sm"
                      onClick={() => setShowPrimaryPicker(false)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

              {/* Secondary Color */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Color {errors.theme_secondary_color && (
                    <span className="text-red-500 text-xs"> - {errors.theme_secondary_color}</span>
                  )}
                </label>
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-lg border border-gray-300 shadow-sm cursor-pointer"
                    style={{ backgroundColor: colors.secondary }}
                    onClick={() => setShowSecondaryPicker(!showSecondaryPicker)}
                  />
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className={`w-full pl-3 pr-10 py-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.theme_secondary_color ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={colors.secondary}
                      onChange={(e) => handleColorChange({ hex: e.target.value }, 'secondary')}
                      placeholder="#FFFFFF"
                    />
                    <span className="absolute right-3 top-2 text-xs text-gray-400">
                      HEX
                    </span>
                  </div>
                </div>
                {showSecondaryPicker && (
                  <div className="absolute z-10 mt-2">
                    <ChromePicker
                      color={colors.secondary}
                      onChangeComplete={(color) => handleColorChange(color, 'secondary')}
                    />
                    <button
                      className="mt-2 px-3 py-1 bg-gray-200 rounded-md text-sm"
                      onClick={() => setShowSecondaryPicker(false)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={isSubmitting || !formData.image || !colors.primary || !colors.secondary}
              className={`flex items-center gap-2 px-6 py-2 rounded-md text-white font-medium transition-colors
                ${isSubmitting || !formData.image || !colors.primary || !colors.secondary
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'}
              `}
            >
              Save Theme <FaArrowRightLong className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ThemeStore.propTypes = {
  onNext: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    theme_primary_color: PropTypes.string,
    theme_secondary_color: PropTypes.string,
    image: PropTypes.object
  }),
  updateFormData: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  errors: PropTypes.object,
  setErrors: PropTypes.func
};

ThemeStore.defaultProps = {
  onNext: () => {},
  formData: {},
  updateFormData: () => {},
  isSubmitting: false,
  errors: {},
  setErrors: () => {}
};