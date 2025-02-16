import React from "react";
import Navbar from "../../Components/NavBar/Navbar";
import Sidebar from "../../Components/SideBar/Sidebar";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-0">
          <Navbar />
          {/* Main Content Area */}
          <div className="mt-0 bg-gray-100 min-h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;