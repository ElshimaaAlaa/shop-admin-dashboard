import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  ChevronRight,
  Eye,
  PenLine,
  Plus,
  Bell,
  ChevronLeft,
} from "lucide-react";
import LogOut from "../Auth/LogOut/LogOut";
import { useNavigate } from "react-router-dom";
import { GetPersonalInfo } from "../ApiServices/GetPersonalInfo";
export default function ProfileMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userImage = localStorage.getItem("User image");
  const userName = localStorage.getItem("User Name");
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const [personalInfo, setPersonalInfo] = useState({});
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={userImage}
            alt="Profile"
            width={45}
            height={45}
            className="object-cover"
          />
        </div>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 rtl:-right-60 mt-2 w-300 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 px-3 flex flex-col gap-3"
        >
          <div className="flex items-center rtl:flex-row-reverse gap-3 py-2">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img
                src={userImage}
                alt="Profile"
                width={57}
                height={57}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-17">{userName}</span>
              <span className="text-14 mt-0 text-gray-500 rtl:text-left">
                Shop Admin
              </span>
            </div>
          </div>
          <div className="border-t-1 border-gray-400"></div>
          <button
            className="w-full flex items-center justify-between gap-3 p-2 hover:bg-gray-50"
            onClick={() => navigate("/Dashboard/MainInfo")}
          >
            <div className="flex items-center gap-2">
              <Eye className="w-6 h-6" />
              <span className="flex-grow text-left text-gray-500 text-15">
                {t("acc")}
              </span>
            </div>
            {isRTL ? (
              <ChevronLeft className="w-5 h-5 text-black" />
            ) : (
              <ChevronRight className="w-5 h-5 text-black" />
            )}
          </button>

          <button
            className="w-full flex justify-between items-center gap-3 p-2 hover:bg-gray-50"
            onClick={() =>
              navigate("/Dashboard/MainInfo/EditInfo", { state: personalInfo })
            }
          >
            <div className="flex items-center gap-2">
              <PenLine className="w-6 h-6" />
              <span className="flex-grow text-left text-gray-500 text-15">
                {t("editProfile")}
              </span>
            </div>
            {isRTL ? (
              <ChevronLeft className="w-5 h-5 text-black" />
            ) : (
              <ChevronRight className="w-5 h-5 text-black" />
            )}
          </button>

          <div className="flex items-center gap-3 p-2">
            <Bell className="w-5 h-5" />
            <span className="flex-grow text-gray-600 text-15 rtl:text-[16px]">
              {t("allowNotify")}
            </span>
            <div
              className={`w-11 h-6 rounded-full p-1 ${
                personalInfo.allow_notifications ? "bg-primary" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white ${
                  personalInfo.allow_notifications
                    ? "translate-x-5 rtl:-translate-x-5"
                    : "translate-x-0 rtl:-translate-x-0"
                }`}
              />
            </div>
          </div>
          <button className="w-full flex justify-between items-center gap-3 p-2 hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span
                className="flex-grow text-left text-gray-500 text-15"
                onClick={() => navigate("/Register")}
              >
                {t("addAcc")}
              </span>
            </div>
            {isRTL ? (
              <ChevronLeft className="w-5 h-5 text-black" />
            ) : (
              <ChevronRight className="w-5 h-5 text-black" />
            )}
          </button>

          <div className="border-t-1 border-gray-400 mt-2">
            <LogOut />
          </div>
        </div>
      )}
    </div>
  );
}
