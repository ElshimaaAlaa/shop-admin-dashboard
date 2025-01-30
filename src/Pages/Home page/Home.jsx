import React from "react";
import Navbar from "../../Components/NavBar/Navbar";
import Sidebar from "../../Components/SideBar/Sidebar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-0">
        <Navbar />
        {/* Main Content Area */}
        <div className="mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
