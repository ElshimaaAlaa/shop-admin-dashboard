export const ImageUpload = ({ previewImage, onImageChange }) => {
  return (
    <div className="rounded-md h-52 flex items-center justify-center">
      <input
        type="file"
        name="image"
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
          <>
            <img
              src={previewImage}
              alt="Category preview"
              className="w-400 h-44 object-cover rounded-md mt-7"
            />
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                className="flex items-center justify-center text-16 gap-3 text-primary rounded-md p-3 border-2 border-dashed border-primary w-400"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("image-upload").click();
                }}
                aria-label="Upload another image"
              >
                <img
                  src="/assets/images/upload-minimalistic_svgrepo.com.png"
                  alt="Upload another-image"
                  className="h-5"
                />
                Upload Another Image
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              src="/assets/images/upload-file_svgrepo.com.png"
              alt="Upload category-image"
              className="mb-2"
            />
            <p>Upload Your Category Image</p>
          </>
        )}
      </label>
    </div>
  );
};
