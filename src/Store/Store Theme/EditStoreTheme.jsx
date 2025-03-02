import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function EditStoreTheme() {
    const [isLoading , setIsLoading] = useState(false);
    const navigate = useNavigate();
  return (
    <div>
      <Helmet>
        <title>Edit Store Theme</title>
      </Helmet>
      <section>
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="font-bold text-xl mb-4 md:mb-0">Edit Store Theme</h1>
        </div>
        <div className=" border border-gray-200 rounded-md bg-gray-100 p-5 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left bg-white flex items-center justify-between w-full border border-gray-200 rounded-md p-3 ">
              <h2 className="text-14  text-gray-400">Primary Color</h2>
              <p className="mt-2">
                <img src="/assets/svgs/pimaryColor.svg" alt="primary-color" />
              </p>
            </div>
            <div className="text-center md:text-left bg-white flex items-center justify-between w-full border border-gray-200 rounded-md p-3">
              <h2 className="text-14  text-gray-400">Secondary Color</h2>
              <p className="mt-2">
                <img
                  src="/assets/svgs/Frame 1984077692.svg"
                  alt="secondary-color"
                />
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row md:flex-row items-end justify-between border border-gray-200 rounded-md mt-6 p-5">
          <div>
            <p className="text-lg font-bold mb-3 mt-5">Logo</p>
            <img
              src="/assets/svgs/Frame 1984077803.svg"
              alt="upload-file"
              className="w-52"
            />
          </div>
          <div className="flex items-center gap-10 mb-3">
            <div className="flex items-center gap-2">
              <img
                src="/assets/svgs/download-8_svgrepo.com.svg"
                alt="download-file"
                className="w-6"
              />
              <p className="font-semibold text-16">Upload New Logo</p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            className="bg-gray-200 text-gray-500 font-semibold p-3 w-32 rounded-md"
            onClick={() => navigate("")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white font-semibold rounded-md p-3 w-32"
          >
            {isLoading ? <ClipLoader color="#fff" size={22} /> : "Save"}
          </button>
        </div>
      </section>
    </div>
  );
}
export default EditStoreTheme;