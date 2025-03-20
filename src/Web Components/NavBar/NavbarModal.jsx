import React from "react";
// import Login from "../../Pages/Auth/Login/Login";
// import Register from "../../Pages/Auth/Register/Register";

function NavbarModal({ showLogin, showRegister, onClose }) {
  return (
    <div>
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0  bg-gray-300 bg-opacity-95 m-auto  h-full w-full flex items-center justify-center">
          <div className="relative w-full m-auto rounded">
            <button
              className="absolute top-2 md:top-3 lg:top-3 right-1 p-1 text-red-600 bg-red-100 rounded-full font-bold"
              onClick={onClose}
              aria-label="Close Login Modal"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* <Login closeModal={onClose} /> */}
          </div>
        </div>
      )}
      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-95 overflow-auto-y h-full w-full">
          <div className="relative mx-auto border rounded">
            <button
              className="absolute top-2 md:top-3 lg:top-3 right-3 p-1 text-red-600 bg-red-100 rounded-full font-bold"
              onClick={onClose}
              aria-label="Close Register Modal"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* <Register closeModal={onClose} /> */}
          </div>
        </div>
      )}
    </div>
  );
}
export default NavbarModal;