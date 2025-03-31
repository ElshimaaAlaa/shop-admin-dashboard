import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import DesktopButtons from "./DesktopButtons";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
    <section className="fixed w-full z-10">
      {/* Top item of navbar */}
      <div className="bg-black text-white flex flex-col items-center lg:flex-row lg:justify-center lg:items-center gap-5 p-3 font-light">
        <div className="flex gap-3 items-center justify-center -mb-3 lg:mb-0 md:mb-0">
          <p className="text-sm underline">+96665147896 / +96665125478</p>
          <img
            src="/assets/images/mdi_phone-outline.png"
            alt="phone"
            className="w-6"
          />
        </div>
        <div className="flex gap-3 items-center justify-center">
          <a href="/" target="_blank" className="text-sm underline">
            Vertex@gmail.com
          </a>
          <img src="/assets/images/email.png" alt="email" className="w-6 h-6" />
        </div>
      </div>
      {/* Navbar bottom items */}
      <div className="relative flex items-center justify-between px-4 lg:px-32 pt-2 pb-3 bg-white shadow-sm">
        <div>
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-36" />
        </div>
        <HamburgerMenu
          onLoginClick={() =>navigate('/GetDomain')}
          onRegisterClick={() =>navigate('/Register')}
        />
        <DesktopButtons
          onLoginClick={() =>navigate('/GetDomain')}
          onRegisterClick={() =>navigate('/Register')}
        />
      </div>
    </section>
  );
}
export default Navbar;