import { useState } from "react";
import { useTranslation } from "react-i18next";

const LogoUpload = ({ name, setFieldValue, error, logoUrl, setLogoUrl }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { t } = useTranslation();

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFieldValue(name, uploadedFile);
    
    // تحويل إلى base64
    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    reader.onload = () => {
      setLogoUrl(reader.result);
    };
    
    simulateUpload();
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  const handleRemove = () => {
    setFieldValue(name, null);
    setUploadProgress(0);
    setLogoUrl(null);
  };

  return (
    <div className="w-full px-6">
      <p className="text-16 font-semibold mb-3">{t("uploadLogo")}</p>
      <label
        htmlFor="logo-upload"
        className="flex items-center border-2 border-dashed border-primary rounded-md p-3 cursor-pointer text-gray-600 text-13"
      >
        <input
          type="file"
          id="logo-upload"
          name={name}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <span className="flex items-center gap-2 text-gray-600">
          <img
            src="/assets/svgs/upload-file_svgrepo.com.svg"
            alt="upload logo"
            className="w-6"
          />
          {t("dropFile")}
          <span className="text-primary font-bold">{t("browseFile")}</span>
        </span>
      </label>
      {logoUrl && (
        <div className="bg-gray-50 mt-3 rounded-md border-2 border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logoUrl} 
              alt="Logo preview" 
              className="w-12 h-12 object-cover rounded" 
            />
            <div className="w-full">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{uploadProgress}% {t("done")}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 ml-4"
          >
            <img
              src="/assets/svgs/deleteIcon.svg"
              alt="delete category"
              className="w-5 ms-2"
            />
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default LogoUpload;