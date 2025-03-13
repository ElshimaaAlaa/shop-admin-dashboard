import React from "react";

export const UploadProductImage = ({ previewImages, onImageChange }) => {
  return (
    <>
      <h2 className="font-bold mb-3">Product Icon / Image</h2>
      <div className="bg-gray-100 w-full border-2 border-dashed outline-none h-48 p-1 rounded-md ">
        <input
          type="file"
          name="images"
          onChange={onImageChange}
          className="hidden"
          id="image-upload"
          multiple
        />
        <label
          htmlFor="image-upload"
          className="text-gray-500 cursor-pointer gap-2"
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
                      index === 0 ? "border-2 border-blue-500" : ""
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
              <div className="flex justify-center">
                <img
                  src="/assets/svgs/upload-file_svgrepo.com.svg"
                  alt="upload-image-file"
                  className="mt-8 mb-3 w-9"
                />
              </div>
              <p className="text-center text-14">Upload Your Product Image</p>
              <p className="text-gray-400 leading-8 text-11 w-44 text-center m-auto">
                Only PNG, SVG Format Allowed. Size: 500KB Max.
              </p>
            </>
          )}
        </label>
      </div>
    </>
  );
};