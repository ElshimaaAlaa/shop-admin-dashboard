import React from "react";

const EmailAddress = ({ width = 22, height = 26, fill = "#3E67C6", ...props }) => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 48 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.898438" width="48" height="48" rx="24" fill="#E0A75E" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 30.8672L12 20.2772V33.8984H36V20.2772L24 30.8672ZM24.0012 27.6729L12 17.0757V15.8984H36V17.0757L24.0012 27.6729Z"
        fill="white"
      />
    </svg>
  );
};

export default EmailAddress;
