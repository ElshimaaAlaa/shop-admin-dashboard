import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { GetPersonalInfo } from "../../ApiServices/GetPersonalInfo";
import UpdatePassword from "./UpdatePassword";

function PersonalInformation() {
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState([]);
  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await GetPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
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
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">Personal Information</h1>
          <button
            onClick={() => navigate("EditInfo", { state: personalInfo })}
            className="text-white font-semibold flex items-center justify-center gap-3 bg-primary p-3 w-24 rounded-md"
          >
            <img src="/assets/images/edit-3_svgrepo.com.png" alt="edit-info" />
            Edit
          </button>
        </div>
        {/* Image Section */}
        <div className="flex items-center gap-5 my-10 border rounded-md p-5 w-130vh">
          <img
            src={personalInfo.image}
            alt="user-profile"
            className="rounded-xl"
          />
          <div>
            <h2 className="font-semibold">{personalInfo?.name}</h2>
            <p className="text-gray-400 mt-3">Vertex CEO</p>
          </div>
        </div>
        {/* Name, Phone, and Email */}
        <div className="border rounded-md p-5">
          <div className="flex items-center gap-96">
            <div>
              <p className="text-gray-400 text-14">Name</p>
              <h3 className="text-13">{personalInfo?.name}</h3>
            </div>
            <div>
              <p className="text-gray-400 text-14">Email</p>
              <h3 className="text-13">{personalInfo?.email}</h3>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-gray-400 text-14">Phone</p>
            <h3 className="text-13">{personalInfo.phone}</h3>
          </div>
        </div>
      </section>
      <UpdatePassword />
    </div>
  );
}
export default PersonalInformation;
