import React, { useEffect, useState } from "react";
import Facebook from "../../Svgs/facebook";
import Instegram from "../../Svgs/instegram";
import WhatsApp from "../../Svgs/WhatsApp";
import { FaXTwitter } from "react-icons/fa6";
import { settings } from "../../ApiServices/Settings";

function Footer() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchSettingData = async () => {
      try {
        const settingsData = await settings();
        setData(settingsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSettingData();
  }, []);
  return (
    <footer className="bg-black text-white ps-5 pe-5 lg:ps-20 lg:pe-20 pt-10 pb-10 ">
      {/* footer top items */}
      <div className="flex flex-col items-center lg:flex-row md:flex-row md:justify-between lg:justify-between lg:items-center">
        {/* Logo Section */}
        <div className="mb-2 lg:mb-0">
          <img
            src="/assets/svgs/Footer logo.svg"
            alt="footer logo"
            className="h-10"
          />
        </div>
        {/* Contact Info Section */}
        <div className="flex flex-col items-center gap-4 md:flex-row lg:flex-row lg:-10">
          {/* Phone Section */}
          <div className="flex items-center gap-2">
            <p className="text-sm md:text-13">{data.phone || "not provided"}</p>
            <img
              src="/assets/images/mdi_phone-outline.png"
              alt="phone"
              className="w-5 h-5 md:w-5 md:h-5"
            />
          </div>
          {/* Email Section */}
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" className="text-sm md:text-13 ">
            {data.email || "not provided"}
            </a>
            <img
              src="/assets/images/email.png"
              alt="email"
              className="w-5 h-5 md:w-5 md:h-5"
            />
          </div>
        </div>
      </div>
      <hr className="mt-6" />
      {/* footer bottom items */}
      <div className="flex flex-col lg:flex-row md:flex-row items-center justify-between mt-5">
        <div>
          <p className="text-13">© 2024 Cadet UI. All Rights Reserved.</p>
        </div>
        {/* social media */}
        <div className="flex gap-3 mt-5 lg:mt-0 md:mt-0">
          <a href="/" target="_blank" className="mt-1.5">
            <FaXTwitter size={23} />
          </a>
          <a href="/" target="_blank">
            <WhatsApp />
          </a>
          <a href="/" target="_blank">
            <Facebook />
          </a>
          <a href="/" target="_blank">
            <Instegram />
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;