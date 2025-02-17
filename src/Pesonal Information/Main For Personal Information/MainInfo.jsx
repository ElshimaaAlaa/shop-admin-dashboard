import React from "react";
import { Outlet } from "react-router-dom";
import InfoSideBar from "./InfoSideBar";

function MainInfo() {
  return (
    <div className="bg-white rounded-md mx-10 p-10 flex items-center justify-between top-10 relative">
      <section>
        <Outlet />
      </section>
      <InfoSideBar />
    </div>
  );
}
export default MainInfo;