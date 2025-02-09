import React from "react";

const Facebook = ({ width = 22, height = 26, fill = "#3E67C6", ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1577_1406)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.1033 25.5H2.12981C1.36754 25.5 0.75 24.8821 0.75 24.1201V1.8798C0.75 1.11763 1.36763 0.5 2.12981 0.5H24.3703C25.1323 0.5 25.75 1.11763 25.75 1.8798V24.1201C25.75 24.8822 25.1322 25.5 24.3703 25.5H17.9996V15.8186H21.2492L21.7358 12.0456H17.9996V9.6368C17.9996 8.54442 18.303 7.8 19.8694 7.8L21.8674 7.79913V4.42453C21.5218 4.37855 20.3358 4.27582 18.956 4.27582C16.0754 4.27582 14.1033 6.03413 14.1033 9.26313V12.0456H10.8454V15.8186H14.1033V25.5Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_1577_1406">
          <rect
            width="25"
            height="25"
            fill="white"
            transform="translate(0.75 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Facebook;
