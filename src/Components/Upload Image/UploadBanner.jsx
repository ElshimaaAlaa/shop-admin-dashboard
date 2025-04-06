import React, { useCallback, useState } from "react";

const BannerUpload = ({
  banners,
  bannerPreviews,
  setFieldValue,
  errors,
  touched,
}) => {
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileList = Array.from(files);
    setFieldValue("banners", [...banners, ...fileList]);

    // Revoke previous preview URLs
    bannerPreviews.forEach((preview) => URL.revokeObjectURL(preview));

    // Create new preview URLs
    setFieldValue("bannerPreviews", [
      ...bannerPreviews,
      ...fileList.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeBanner = (index) => {
    const updatedBanners = [...banners];
    updatedBanners.splice(index, 1);
    setFieldValue("banners", updatedBanners);

    URL.revokeObjectURL(bannerPreviews[index]);
    setFieldValue(
      "bannerPreviews",
      bannerPreviews.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="form-section">
        <h3 className="font-bold text-14 mb-2">Upload Banners File</h3>
      <div
        className={`border-2 border-dashed border-primary rounded-md p-4 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-gray-400"
        } ${touched.banners && errors.banners ? "border-red-500" : ""}`}
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
            alt="upload-image-file"
            className="w-6 me-3"
          />
          <p className="text-13 text-gray-400">
            {isDragging ? "Drop your banners here" : "Drag & Drop Banners Here"}
          </p>
          <p className="text-13 text-gray-400 ms-1">OR</p>
          <button
            type="button"
            className="text-primary hover:text-primary-dark text-13 ms-3 font-bold"
          >
            Browse Files
          </button>
        </div>
      </div>

      {touched.banners && errors.banners && (
        <p className="text-red-500 text-xs mt-1">{errors.banners}</p>
      )}

      {bannerPreviews.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Uploaded Banners:
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {bannerPreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md border border-gray-200"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeBanner(index)}
                  aria-label="Remove banner"
                >
                  ×
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                  {banners[index]?.name || `Banner ${index + 1}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerUpload;
