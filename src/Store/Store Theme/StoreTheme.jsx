import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";

function StoreTheme() {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState([]);
  const [error, setError] = useState(null);

  const handleEditClick = () => {
    // navigate("/Dashboard/MainInfo/EditStoreTheme", { state: storeData });
  };

  const themeData = JSON.parse(localStorage.getItem("storeThemeData") || "{}");

  const imageUrl = themeData.theme_image
    ? `/uploads/${encodeURIComponent(themeData.theme_image)}`
    : null;

  const handleViewImage = () => {
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    }
  };

  const handleDownloadImage = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "store-theme-logo.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
            // onClick={handleEditClick}
            className="text-white font-semibold flex items-center justify-center gap-3 bg-primary p-3 w-24 rounded-md"
            aria-label="Edit personal information"
          >
            <img src="/assets/svgs/edit.svg" alt="Edit icon" className="w-6" />
            Edit
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="border border-gray-200 rounded-md p-5 w-full">
          <div className="flex flex-col md:flex-row items-center gap-x-96">
            <div className="text-center md:text-left">
              <h2 className="text-14 text-gray-400">Primary Color</h2>
              <div
                className="mt-2 border-2 border-black p-3 w-16 h-8 rounded"
                style={{ backgroundColor: themeData.theme_primary_color }}
              ></div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-14 text-gray-400">Secondary Color</h2>
              <div
                className="mt-2 border-2 border-black p-3 w-16 h-8 rounded"
                style={{ backgroundColor: themeData.theme_secondary_color }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row md:flex-row items-end gap-x-64 mt-">
            <div>
              <p className="text-1xl font-bold mb-3 mt-7">Logo</p>
              {imageUrl ? (
                <img src={imageUrl} alt="theme logo" className="w-52" />
              ) : (
                <p className="text-red-500">No image available</p>
              )}
            </div>

            <div className="flex items-center gap-10 mb-3">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleViewImage}
              >
                <FaRegEye color="#E0A75E" size={20} />
                <p>View</p>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleDownloadImage}
              >
                <IoDownloadOutline color="#E0A75E" size={20} />
                <p>Download</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StoreTheme;
