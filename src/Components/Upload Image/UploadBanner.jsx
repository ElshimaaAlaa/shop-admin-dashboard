import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const BannerUpload = ({ 
  banners = [], 
  setFieldValue, 
  errors, 
  touched, 
  setBannerUrls, 
  bannerUrls 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const { t } = useTranslation();

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const simulateUpload = (index) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prev) => ({ ...prev, [index]: progress }));
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFileInputChange = (e) => {
    if (e.target.files?.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileList = Array.from(files);
    const startIndex = banners.length;
    const newUrls = [];

    fileList.forEach((file) => {
      newUrls.push(URL.createObjectURL(file));
    });

    setBannerUrls(prev => [...prev, ...newUrls]);
    setFieldValue("banners", [...banners, ...fileList]);
    
    fileList.forEach((_, i) => {
      simulateUpload(startIndex + i);
    });
  };

  const removeBanner = (index) => {
    const updatedBanners = [...banners];
    updatedBanners.splice(index, 1);
    setFieldValue("banners", updatedBanners);

    const updatedUrls = [...bannerUrls];
    URL.revokeObjectURL(updatedUrls[index]);
    updatedUrls.splice(index, 1);
    setBannerUrls(updatedUrls);

    setUploadProgress((prev) => {
      const updated = { ...prev};
      delete updated[index];
      return updated;
    });
  };

  return (
    <div className="w-full mb-6 px-6">
      <h3 className="text-16 font-semibold mb-3">{t("uploadBanner")}</h3>
      <div
        className={`border-2 border-dashed border-primary rounded-md p-3 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-gray-400"
        } ${touched?.banners && errors?.banners ? "border-red-500" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById("banner-upload-input").click()}
      >
        <input
          id="banner-upload-input"
          type="file"
          multiple
          accept="image/jpeg, image/png"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <div className="flex items-center">
          <img
            src="/assets/svgs/upload-file_svgrepo.com.svg"
            alt="upload"
            className="w-6 mr-3 rtl:mr-0 rtl:ml-3"
          />
          <p className="text-14 text-gray-600">
            {isDragging ? "Drop files here" : t("dropFile")}
          </p>
          <button
            type="button"
            className="text-primary hover:text-primary-dark text-14 ml-2 rtl:mr-2 font-bold"
          >
            {t("browseFile")}
          </button>
        </div>
      </div>

      {touched?.banners && errors?.banners && (
        <p className="text-red-500 text-xs mt-1">{t("oneBanner")}</p>
      )}

      {banners.length > 0 && (
        <div className="mt-4">
          <ul className="space-y-2">
            {banners.map((file, index) => (
              <li
                key={index}
                className="border-2 bg-gray-50 border-gray-200 rounded-md p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img
                    src={bannerUrls[index]}
                    alt="Banner preview"
                    className="w-12 h-12 object-cover rounded "
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {file.name}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress[index] || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeBanner(index)}
                  className="text-red-500 hover:text-red-700 ml-3"
                >
                  <img
                    src="/assets/svgs/deleteIcon.svg"
                    alt="delete category"
                    className="w-5 ms-2 mt-4"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default BannerUpload;