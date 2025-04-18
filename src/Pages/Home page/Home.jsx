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
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-0">
          <Navbar />
          <div className="mt-0 bg-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;