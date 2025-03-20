import React from "react";
import Login from "../Login/Login";
function RegisterModal({ onClose, ShowLogin }) {
  return (
    <div>
      {/* Login Modal */}
      {ShowLogin && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-95 h-full w-full">
          <div className="relative mx-auto border rounded">
            <button
              className="absolute top-2 md:top-3 lg:top-3 right-1 p-1 text-red-600 bg-red-100 rounded-full font-bold"
              onClick={onClose}
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
            <Login closeModal={onClose} />
          </div>
        </div>
      )}
    </div>
  );
}
export default RegisterModal;