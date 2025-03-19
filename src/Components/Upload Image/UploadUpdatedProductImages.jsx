import React from "react";

const UploadUpdatedProductImages = ({ previewImages, onImageChange, setFieldValue }) => {
  return (
    <div className="bg-white p-5 rounded-md w-2/4 h-80">
      <h2 className="font-bold mb-3">Category Icon / Image</h2>
      <div className="bg-transparent w-full border-2 border-dashed outline-none h-48 p-1 rounded-md">
        <input
          type="file"
          name="images"
          onChange={(event) => {
            const files = Array.from(event.currentTarget.files);
            setFieldValue("images", files);
            onImageChange(files);
          }}
          className="hidden"
          id="image-upload"
          multiple
        />
        <label
          htmlFor="image-upload"
          className="text-gray-400 cursor-pointer flex flex-col gap-2"
        >
          {previewImages.length > 0 ? (
            <>
              {/* Main Image Preview */}
              <img
                src={previewImages[0]}
                alt="main-product-image"
                className="w-full h-44 rounded-md mt-1"
              />
              {/* Thumbnails */}
              <div className="flex gap-2 mt-2">
                {previewImages.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-container ${
                      index === 0 ? "border-2 rounded-md border-blue-500" : ""
                    }`}
                    onClick={() => onImageChange([image])}
                  >
                    <img
                      src={image}
                      alt={`thumbnail-${index}`}
                      className="h-12 w-12 object-cover rounded-md cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <img
                src="/assets/images/upload-file_svgrepo.com.png"
                alt="upload-image-file"
                className="mb-2"
              />
              <p>Upload Your Product Image</p>
              <p className="text-sm text-gray-300 mt-2 w-60 text-center">
                Only PNG, SVG Format Allowed. Size: 500KB Max.
              </p>
            </>
          )}
        </label>
      </div>
    </div>
  );
};
export default UploadUpdatedProductImages;