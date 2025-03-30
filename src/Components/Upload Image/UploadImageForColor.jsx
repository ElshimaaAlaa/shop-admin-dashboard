import { AiOutlineClose } from "react-icons/ai";
import React from "react";

export const UploadImageForColor = ({ 
  previewImage, 
  name,
  setFieldValue,
  colorIndex,
  defaultProductImage 
}) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFieldValue(`${name}.image`, file);
      setFieldValue(`${name}.previewImage`, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setFieldValue(`${name}.image`, null);
    setFieldValue(`${name}.previewImage`, defaultProductImage || "/assets/images/default-color.png");
  };

  return (
    <div className="border-2 w-72 border-dashed bg-white border-primary rounded-md p-1 flex items-center justify-center">
      <input
        type="file"
        name={name}
        onChange={handleImageUpload}
        className="hidden"
        id={`image-upload-${colorIndex}`}
        accept="image/*"
        aria-label="Upload color image"
      />
      <label
        htmlFor={`image-upload-${colorIndex}`}
        className="text-gray-500 cursor-pointer flex flex-col items-center gap-2 w-full h-full relative"
      >
        {previewImage ? (
          <>
            <img
              src={typeof previewImage === 'string' ? previewImage : URL.createObjectURL(previewImage)}
              alt="color preview"
              className="w-full h-32 object-contain rounded-md"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              onClick={handleRemoveImage}
            >
              <AiOutlineClose size={14} />
            </button>
          </>
        ) : (
          <>
            <img
              src="/assets/svgs/upload-file_svgrepo.com.svg"
              alt="upload-image-file"
              className="mt-3 mb-3 w-6"
            />
            <span className="text-xs text-gray-400">Click to upload image</span>
          </>
        )}
      </label>
    </div>
  );
};