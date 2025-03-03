export const ImageUpload = ({ previewImage, onImageChange, name }) => {
  return (
    <div className="border-2 w-full border-dashed bg-gray-100 border-gray-200 rounded-md p-1 h-52 flex items-center justify-center">
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
              src="/assets/svgs/upload-file_svgrepo.com.svg"
              alt="upload-image-file"
              className="mt-8 mb-3 w-9"
            />
            <p className="text-center text-14">Upload Your Category Image</p>
            <p className="text-gray-400 leading-8 text-11 w-44 text-center m-auto">
              Only PNG, SVG Format Allowed. Size: 500KB Max.
            </p>
          </>
        )}
      </label>
    </div>
  );
};
