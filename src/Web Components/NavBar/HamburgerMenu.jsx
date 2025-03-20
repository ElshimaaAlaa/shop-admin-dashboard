import React, { useState } from "react";

function HamburgerMenu({ onLoginClick, onRegisterClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="lg:hidden relative">
      <button
        className="text-gray-700 p-2 rounded focus:outline-none"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>
      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-11 mt-2 -left-24 w-40 bg-white shadow-lg rounded-lg flex flex-col items-center py-2">
          <button
            className="text-primary w-full py-3 rounded font-bold focus:bg-primary focus:text-white"
            onClick={onLoginClick}
            aria-label="Open Login Modal"
          >
            Login
          </button>
          <button
            className="text-primary w-full py-3 rounded font-bold focus:bg-primary focus:text-white"
            onClick={onRegisterClick}
            aria-label="Open Register Modal"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}
export default HamburgerMenu;