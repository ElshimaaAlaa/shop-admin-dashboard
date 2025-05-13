import React from "react";
import { IoMdClose } from "react-icons/io";

const UploadUpdatedProductImages = ({
  previewImages,
  onImageChange,
  onRemoveImage,
  setFieldValue,
}) => {
  return (
    <div className="bg-white p-4 rounded-md w-2/4 h-80">
      <h2 className="font-bold mb-3 text-16">Product Icon / Image</h2>
      <div className="bg-transparent w-full border-2 border-dashed border-gray-400 outline-none h-48 p-1 rounded-md">
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
              <div className="flex gap-2 mt-2 relative">
                {previewImages.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-container ${
                      index === 0 ? "border-2 rounded-md border-blue-500" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`thumbnail-${index}`}
                      className="h-14 w-14 p-1 object-cover rounded-md cursor-pointer relative"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveImage(index);
                      }}
                      className="text-red-500 text-xs absolute top-0 left-10"
                    >
                      <IoMdClose size={20}/>
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src="/assets/svgs/upload-file_svgrepo.com.svg"
                alt="upload-image-file"
                className="mt-8 mb-3 w-9"
              />
              <p className="text-center text-14">Upload Your Category Image</p>
              <p className="text-gray-400 leading-8 text-11 w-44 text-center m-auto">
                Only PNG, SVG Format Allowed. Size: 500KB Max.
              </p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default UploadUpdatedProductImages;
