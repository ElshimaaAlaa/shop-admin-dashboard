import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, Eye, PenLine, Plus, Bell } from "lucide-react";
import LogOut from "./LogOut";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const userImage = localStorage.getItem("User image");
  const userName = localStorage.getItem("User Name");
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

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
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-[350px] bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 px-3 flex flex-col gap-3"
        >
          <div className="flex items-center gap-4 py-3">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img
                src={userImage}
                alt="Profile"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-xl mt-2">{userName}</span>
              <span className="text-15 text-gray-500">Vertex CEO</span>
            </div>
            <ChevronDown className="w-5 h-5 font-bold text-black ml-auto" />
          </div>
          <hr className="me-3 ms-3" />
          <button
            className="w-full flex items-center gap-3 p-2 hover:bg-gray-50"
            onClick={() => navigate("/Home/MainInfo")}
          >
            <Eye className="w-6 h-6" />
            <span className="flex-grow text-left text-gray-600 text-17">
              My Account
            </span>
            <ChevronRight className="w-5 h-5 text-black" />
          </button>

          <button
            className="w-full flex items-center gap-3 p-2 hover:bg-gray-50"
            onClick={() => navigate("/Home/MainInfo/EditInfo")}
          >
            <PenLine className="w-6 h-6" />
            <span className="flex-grow text-left text-gray-600 text-17">
              Edit Profile
            </span>
            <ChevronRight className="w-5 h-5 text-black" />
          </button>

          <div className="flex items-center gap-3 p-2">
            <Bell className="w-5 h-5" />
            <span className="flex-grow text-gray-600 text-17">
              Allow Notifications
            </span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                notifications ? "bg-orange-400" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  notifications ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-50">
            <Plus className="w-5 h-5" />
            <span className="flex-grow text-left text-gray-600 text-17">
              Add Account
            </span>
            <ChevronRight className="w-5 h-5 text-black" />
          </button>

          <div className="border-t border-gray-100 mt-2">
            <LogOut />
          </div>
        </div>
      )}
    </div>
  );
}