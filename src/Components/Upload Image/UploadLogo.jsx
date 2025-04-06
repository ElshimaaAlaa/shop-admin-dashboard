export const LogoUpload = ({ previewImage, onImageChange, name }) => {
  return (
    <div className="border-2 w-full border-dashed bg-white border-primary rounded-md p-3 flex items-center ">
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
        className="text-gray-500 cursor-pointer flex items-center gap-2"
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
              className="w-6"
            />
            <p className="text-gray-400 leading-8 text-13 text-center m-auto">
              Drag & Drop Your logo File Here OR <span className="text-primary font-bold ms-2">Browse Files</span>
            </p>
          </>
        )}
      </label>
    </div>
  );
};
