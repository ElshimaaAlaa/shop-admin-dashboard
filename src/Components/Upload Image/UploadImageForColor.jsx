export const UploadImageForColor = ({ previewImage, onImageChange, name }) => {
    return (
      <div className="border-2 w-72 border-dashed bg-white border-primary rounded-md p-1 flex items-center justify-center">
        <input
          type="file"
          name={name}
          onChange={onImageChange}
          className="hidden"
          id={`image-upload-${name}`} 
          aria-label="Upload product image"
        />
        <label
          htmlFor={`image-upload-${name}`}
          className="text-gray-500 cursor-pointer flex flex-col items-center gap-2"
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="preview"
              className="w-full h-full object-fill rounded-md"
            />
          ) : (
            <img
              src="/assets/svgs/upload-file_svgrepo.com.svg"
              alt="upload-image-file"
              className="mt-3 mb-3 w-6"
            />
          )}
        </label>
      </div>
    );
  };
  