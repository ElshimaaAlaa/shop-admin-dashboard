import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
function StoreInformation() {
  const [storeInfo, setStoreInfo] = useState([]);
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate("/Home/MainInfo/EditStoreInformation", { state: storeInfo });
  };
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
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="font-bold text-xl mb-4 md:mb-0">Store Information</h1>
          <button
            onClick={handleEditClick}
            className="text-white font-semibold flex items-center justify-center gap-2 bg-primary p-3 w-24 rounded-md"
            aria-label="Edit personal information"
          >
            <img src="/assets/svgs/edit.svg" alt="Edit icon" className="w-6" />
            Edit
          </button>
        </div>
        <div className=" border border-gray-200 rounded-md p-5 w-full">
          <div className="flex flex-col md:flex-row items-center gap-x-96">
            <div className="text-center md:text-left">
              <h2 className="text-14  text-gray-400">Name</h2>
              <p className="mt-2 text-14">Vertex</p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-14  text-gray-400">Loaction</h2>
              <p className="mt-2 text-14">saudi arabia</p>
            </div>
          </div>
          <h2 className="text-14 mt-5 text-gray-400">Bio</h2>
          <p className="mt-2 text-14">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-col lg:flex-row md:flex-row items-end gap-x-64 mt-">
            <div>
              <p className="text-1xl font-bold mb-3 mt-7">Banners</p>
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

export default StoreInformation;
