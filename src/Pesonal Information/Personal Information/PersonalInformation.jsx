import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { GetPersonalInfo } from "../../ApiServices/GetPersonalInfo";
import UpdatePassword from "./UpdatePassword";

function PersonalInformation() {
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await GetPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
        setError("Failed to load personal information. Please try again later.");
      }
    };
    getInfo();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Personal Information</title>
        <meta name="description" content="Edit personal information" />
        <meta property="og:title" content="Edit Personal Information" />
        <meta property="og:description" content="Edit personal information" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vertex-dashboard.com/personal-information"
        />
      </Helmet>
      <section>
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="font-bold text-2xl mb-4 md:mb-0">Personal Information</h1>
          <button
            onClick={() => navigate("EditInfo", { state: personalInfo })}
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
        <div className="flex flex-col md:flex-row items-center gap-5 my-10 border rounded-md p-5 w-full">
          <img
            src={personalInfo.image || "/assets/images/default-profile.png"}
            alt="User profile"
            className="rounded-xl w-24 h-24 md:w:24 md:h-24 object-cover"
            onError={(e) => {
              e.target.src = "/assets/images/default-profile.png";
            }}
          />
          <div className="text-center md:text-left">
            <h2 className="font-semibold mt-3">{personalInfo?.name || "N/A"}</h2>
            <p className="text-gray-400 mt-2">{personalInfo?.role || "Vertex CEO"}</p>
          </div>
        </div>
        {/* Name, Phone, and Email Section */}
        <div className="border rounded-md p-5 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-96">
            <div>
              <p className="text-gray-400 text-14">Name</p>
              <h3 className="text-13">{personalInfo?.name || "N/A"}</h3>
            </div>
            <div>
              <p className="text-gray-400 text-14">Email</p>
              <h3 className="text-13">{personalInfo?.email || "N/A"}</h3>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-gray-400 text-14">Phone</p>
            <h3 className="text-13">{personalInfo?.phone || "N/A"}</h3>
          </div>
        </div>
      </section>
      <UpdatePassword />
    </div>
  );
}
export default PersonalInformation;