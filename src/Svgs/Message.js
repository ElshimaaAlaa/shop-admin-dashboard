import React from "react";

const Message = ({ width = 22, height = 26, fill = "#3E67C6", ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      props={props}
    >
      <g clip-path="url(#clip0_801_21708)">
        <path
          d="M8.5 11.3984H15.5"
          stroke="#71717A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7 19.3283H11L15.45 22.2884C16.11 22.7284 17 22.2583 17 21.4583V19.3283C20 19.3283 22 17.3283 22 14.3283V8.32837C22 5.32837 20 3.32837 17 3.32837H7C4 3.32837 2 5.32837 2 8.32837V14.3283C2 17.3283 4 19.3283 7 19.3283Z"
          stroke="#71717A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_801_21708">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.898438)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Message;
