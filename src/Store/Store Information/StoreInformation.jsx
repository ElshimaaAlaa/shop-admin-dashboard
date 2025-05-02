import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";
function StoreInformation() {
  const [storeInfo, setStoreInfo] = useState([]);
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate("/Home/MainInfo/EditStoreInformation", { state: storeInfo });
  };
  const storeInformation = JSON.parse(
    localStorage.getItem("storeProfileData") || "{}"
  );
  const banner = JSON.parse(localStorage.getItem("storeThemeData") || "{}");
  return (
    <div>
      <Helmet>
        <title>Store Information</title>
        <meta name="description" content="Edit Store Information" />
        <meta property="og:title" content="Edit Store Information" />
        <meta property="og:description" content="Edit Store Information" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vertex-dashboard.com/Store Information"
        />
      </Helmet>
      <section>
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <h1 className="font-bold text-[18px]">Store Information</h1>
          <button
            onClick={handleEditClick}
            className="text-white font-semibold flex items-center justify-center gap-2 bg-primary p-2 w-24 rounded-md"
            aria-label="Edit personal information"
          >
            <img src="/assets/svgs/edit.svg" alt="Edit icon" className="w-6" />
            Edit
          </button>
        </div>
        <div className=" border border-gray-200 rounded-md p-5 w-full">
          <div className="flex flex-col md:flex-row items-center gap-x-96">
            <div className="text-center md:text-left">
              <h2 className="text-15  text-gray-400">Name</h2>
              <p className="mt-2 text-15">{storeInformation.store_name}</p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-15 text-gray-400">Loaction</h2>
              <p className="mt-2 text-15">{storeInformation.address}</p>
            </div>
          </div>
          <h2 className="text-15 mt-5 text-gray-400">Bio</h2>
          <p className="mt-2 text-15">{storeInformation.bio}</p>
          <div className="flex flex-col lg:flex-row md:flex-row items-end gap-x-80">
            <div>
              <p className="text-1xl font-bold mb-3 mt-7">Banners</p>
              <div className="flex flex-wrap gap-4">
                {banner.banners && 
                  Array.isArray(banner.banners) &&
                  banner.banners.map((file, index) => (
                    <div key={index}>
                      <img
                        src={URL.createObjectURL(
                          new File([file], file.name, { type: file.type })
                        )}
                        alt={`Banner`}
                        className=" object-cover rounded"
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex items-center gap-10 mb-3">
              <div className="flex items-center gap-2">
                <FaRegEye color="#E0A75E" size={20} />
                <p className="text-15">View</p>
              </div>
              <div className="flex items-center gap-2">
                <IoDownloadOutline color="#E0A75E" size={20} />
                <p className="text-15">Download</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default StoreInformation;