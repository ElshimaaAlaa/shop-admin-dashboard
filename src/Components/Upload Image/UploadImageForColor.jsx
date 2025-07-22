export const UploadImageForColor = ({ 
  previewImage, 
  name,
  setFieldValue,
  colorIndex,
  defaultProductImage,
  existingImage,
  isOptional = false
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
    if (isOptional) {
      // For edit mode, just clear the new image but keep existingImage
      setFieldValue(`${name}.image`, null);
      setFieldValue(`${name}.previewImage`, existingImage || null);
    } else {
      // For create mode, clear everything
      setFieldValue(`${name}.image`, null);
      setFieldValue(`${name}.previewImage`, null);
      setFieldValue(`${name}.existingImage`, null);
    }
  };

  const getImageSrc = () => {
    if (previewImage) {
      if (typeof previewImage === 'string') return previewImage;
      if (previewImage instanceof Blob) return URL.createObjectURL(previewImage);
    }
    return existingImage || defaultProductImage || null;
  };

  const imageSrc = getImageSrc();

  return (
    <div className="border-2 w-80 h-16 border-dashed bg-white border-primary rounded-md p-1 flex items-center justify-center relative">
      <input
        type="file"
        onChange={handleImageUpload}
        className="hidden"
        id={`image-upload-${colorIndex}`}
        accept="image/*"
      />
      <label
        htmlFor={`image-upload-${colorIndex}`}
        className="cursor-pointer w-full h-full flex items-center justify-center"
      >
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt="Color preview"
              className="w-full h-32 object-contain rounded-md"
              onError={(e) => {
                e.target.src = defaultProductImage || '';
              }}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
              ×
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src="/assets/svgs/upload-file_svgrepo.com.svg"
              alt="Upload-image"
              className="w-6"
            />
          </div>
        )}
      </label>
    </div>
  );
};