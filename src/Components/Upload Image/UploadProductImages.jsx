import React from "react";

function UploadProductImages({ previewImage, onImageChange }) {
  return (
    <div>
        <h2 className="font-bold mb-5">Category Icon / Image</h2>
        <div className="bg-transparent w-full border-2 border-dashed outline-none rounded-md h-44">
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
            className="text-gray-500 cursor-pointer flex flex-col gap-2"
          >
            {previewImage.length > 0 ? (
              <>
                {/* Main Image Preview */}
                <img
                  src={previewImage[0]}
                  alt="main-product-image"
                  className="rounded-md w-full h-44"
                />
                {/* Thumbnails */}
                <div className="flex gap-2 mt-2">
                  {previewImage.map((image, index) => (
                    <div
                      key={index}
                      className={`thumbnail-container ${
                        index === 0 ? "border-2 border-blue-500" : ""
                      }`}
                    >
                      <img
                        src={image}
                        alt={`thumbnail-${index}`}
                        className="h-12 w-12 object-cover rounded-md cursor-pointer"
                      />
                    </div>
                  ))}
                  <div
                    className="h-12 w-12 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                  >
                    <span className="text-2xl text-gray-500">+</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <img
                    src="/assets/images/upload-file_svgrepo.com.png"
                    alt="upload-image-file"
                    className="mb-2 mt-3 w-9"
                  />
                </div>

                <p className="text-center">Upload Your Product Image</p>
                <p className="text-sm text-gray-300 mt-2 w-60 text-center m-auto">
                  Only PNG, SVG Format Allowed. Size: 500KB Max.
                </p>
              </>
            )}
          </label>
        </div>
      </div>
  );
}

export default UploadProductImages;