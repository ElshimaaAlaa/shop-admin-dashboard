import React from "react";
import { Bell, Search } from "lucide-react";
import ProfileMenu from "../../Profile/Profile";
import LanguageSelector from "../../Profile/UpdateLanguage";

function Navbar() {
  return (
    <div className="">
      <nav className="flex items-center justify-between px-4 py-2 bg-white">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button variant="ghost" className="p-2">
            <img
              src="/assets/images/arrow-multi-line-right_svgrepo.com.png"
              alt="Logo"
              className="w-9 h-9"
            />
          </button>
          <div className="relative">
            <Search
              color="#E0A75E"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
            />
            <input
              type="text"
              placeholder="Search Something Here"
              className="w-[400px] pl-10 pr-4 py-3 bg-muted/50 rounded-xl text-sm focus:outline-none border border-gray-200 bg-lightgray"
            />
          </div>
        </div>
        {/* Right section */}
        <div className="flex items-center gap-5">
          {/* <LanguageSelector /> */}
          {/* Notifications */}
          {/* <button
            variant="ghost"
            size="icon"
            className="relative bg-gray-100 rounded-md p-3"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-3 w-2 h-2 bg-red-600 text-white text-11 rounded-full flex items-center justify-center"></span>
          </button> */}
          <ProfileMenu />
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
