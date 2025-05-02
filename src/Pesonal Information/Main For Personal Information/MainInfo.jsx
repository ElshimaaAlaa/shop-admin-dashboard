import React from "react";
import { Outlet } from "react-router-dom";
import InfoSideBar from "./InfoSideBar";

function MainInfo() {
  return (
    <div className="bg-gray-100 h-[89vh]">
      <div className="bg-white rounded-md mx-5 p-4 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 relative top-4">
        <section className="flex-1" aria-label="Main content">
          <Outlet />
        </section>
        <aside className="w-full md:w-1/3 lg:w-1/4">
          <InfoSideBar />
        </aside>
      </div>
    </div>
  );
}
export default MainInfo;