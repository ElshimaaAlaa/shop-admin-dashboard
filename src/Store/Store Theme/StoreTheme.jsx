import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

function StoreTheme() {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState([]);
  const [error, setError] = useState(null);

  const handleEditClick = () => {
    navigate("/Home/MainInfo/EditStoreTheme", { state: storeData });
  };

  return (
    <div>
      <Helmet>
        <title>Store Theme</title>
        <meta name="description" content="Edit Store Theme" />
        <meta property="og:title" content="Edit Store Theme" />
        <meta property="og:description" content="Edit Store Theme" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vertex-dashboard.com/Store Theme"
        />
      </Helmet>
      <section>
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="font-bold text-xl mb-4 md:mb-0">Store Theme</h1>
          <button
            onClick={handleEditClick}
            className="text-white font-semibold flex items-center justify-center gap-3 bg-primary p-3 w-24 rounded-md"
            aria-label="Edit personal information"
          >
            <img src="/assets/images/edit-3_svgrepo.com.png" alt="Edit icon" />
            Edit
          </button>
        </div>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-6">
            {error}
          </div>
        )}
        <div className=" border border-gray-200 rounded-md p-5 w-full">
          <div className="flex flex-col md:flex-row items-center gap-x-96">
            <div className="text-center md:text-left">
              <h2 className="text-14  text-gray-400">Primary Color</h2>
              <p className="mt-2">
                <img src="/assets/svgs/pimaryColor.svg" alt="primary-color" />
              </p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-14  text-gray-400">Secondary Color</h2>
              <p className="mt-2">
                <img
                  src="/assets/svgs/Frame 1984077692.svg"
                  alt="secondary-color"
                />
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row md:flex-row items-end gap-x-64 mt-">
            <div>
              <p className="text-lg font-bold mb-3 mt-7">Logo</p>
              <img
                src="/assets/svgs/Frame 1984077803.svg"
                alt="upload-file"
                className="w-52"
              />
            </div>

            <div className="flex items-center gap-10 mb-3">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/svgs/Component 6.svg"
                  alt="see-file"
                  className="w-6"
                />
                <p className="font-bold">View</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/svgs/download-8_svgrepo.com.svg"
                  alt="download-file"
                  className="w-6"
                />
                <p className="font-bold">Download</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default StoreTheme;