import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="ps-5 pe-5 lg:ps-20 lg:pe-20 lg:pt-40 flex flex-col items-center pt-48 md:flex-row lg:flex-row lg:justify-between ">
      <div>
        <h1 className=" leading-normal lg:w-400 text-4xl font-bold lg:leading-normal lg:text-4xl md:text-3xl md:leading-normal">
          We bring
          <span className="text-primary ms-3 me-3">
            rapid solutions
          </span>
          for your business
        </h1>
        <p className="text-secondary leading-normal lg:w-96 md:w-96  mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
        <Link to={""} className="relative inline-block text-lg group">
          <span className="relative  -z-[1] block px-5 py-3 overflow-hidden font-medium leading-tight text-primary transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
            <span className="relative flex items-center gap-4 font-semibold">
              Get Started
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-colors duration-300 ease-out"
              >
                <path
                  d="M1 8.60685H17M17 8.60685L10.3333 1.94019M17 8.60685L10.3333 15.2735"
                  className="transition-colors duration-300 ease-out group-hover:stroke-white"
                  stroke="#E0A75E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </Link>
      </div>
      <div>
        <img
          src="/assets/images/header-image.png"
          alt="Business solutions illustration"
          loading="lazy"
          className="lg:pe-28 mt-10 lg:mt-0 md:ms-5 md:w- md:pe-10 w-550"
        />
      </div>
    </header>
  );
}
export default Header;