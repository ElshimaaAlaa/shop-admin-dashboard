import React from "react";
// import Image from "next/image"
import { Bell, Globe, ChevronDown, Search } from "lucide-react";
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function Navbar() {
  return (
    <div>
      {/* static at this time  */}
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search Something Here"
              className="w-[400px] pl-10 pr-4 py-3 bg-muted/50 rounded-xl text-sm focus:outline-none border border-gray-200 bg-lightgray"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-5">
          {/* notifications */}
          {/* <button variant="ghost" size="icon" className="relative">
            <Bell className="w-7 h-6" />
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span> */}
          {/* </button> */}
          {/* language settings */}
          {/* <button variant="ghost" size="icon">
            <Globe className="w-7 h-6" />
          </button> */}
          {/* user profile settings */}
          {/* <div className="bg-lightgray border border-gray-300 rounded-xl flex items-center p-4 gap-6">
            <img
              src="/assets/images/image 4.png"
              alt="profile-image"
              className="w-12"
            />
            <div>
              <h3 className="font-bold">Ahmed Mohamed</h3>
              <p className="text-gray-600 mt-3">Vertex CEO</p>
            </div>
            <img src="/assets/images/dropdown-arrow_svgrepo.com.png" alt="" />
          </div> */}
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
/* 
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                variant="ghost"
                className="flex items-center gap-2 pl-2 pr-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EgiPoa6m3n52lQatQbapxZ9HYlcAVD.png"
                    alt="Profile"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Ahmed Mohamed</span>
                    <span className="text-xs text-muted-foreground">
                      Vertex CEO
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */
