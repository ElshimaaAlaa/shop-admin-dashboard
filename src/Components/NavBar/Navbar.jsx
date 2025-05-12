import React from "react";
import ProfileMenu from "../../Profile/Profile";
import { BsFillPinAngleFill } from "react-icons/bs";

function Navbar({ onPinToggle, isPinned }) {
  return (
    <div className="bg-white shadow-sm">
      <nav className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-4">
          {/* <button 
            onClick={onPinToggle}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}
          >
            <BsFillPinAngleFill 
              size={20} 
              className={isPinned ? "text-orange-500" : "text-gray-500"} 
            />
          </button> */}
        </div>
        <div className="flex items-center gap-5">
          <ProfileMenu />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;