export const ImageUpload = ({ previewImage, onImageChange , name }) => {
  return (
    <div className="border-2 w-full border-dashed border-gray-200 rounded-md p-1 h-52 flex items-center justify-center">
      <input
        type="file"
        name={name}
        onChange={onImageChange}
        className="hidden"
        id="image-upload"
        aria-label="Upload category image"
      />
      <label
        htmlFor="image-upload"
        className="text-gray-500 cursor-pointer flex flex-col items-center gap-2"
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="preview"
            className="w-400 h-48 object-fill rounded-md"
          />
        ) : (
          <>
            <img
              src="/assets/images/upload-file_svgrepo.com.png"
              alt="upload-image-file"
              className="mb-2"
            />
            <p className="">Upload Your Category Image</p>
            <p className="text-sm text-gray-300 mt-2 w-60 text-center">
              Only PNG, SVG Format Allowed. Size: 500KB Max.
            </p>
          </>
        )}
      </label>
    </div>
  );
};
