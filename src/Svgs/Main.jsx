import React from "react";
const Main = ({onClick , color = "#fff"}) => {
  return (
    <svg
    onClick={onClick}
      width="22"
      height="22"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=" cursor-pointer"
    >
      <path
        d="M0 14.1761H10.6667V0.842773H0V14.1761ZM0 24.8428H10.6667V16.8428H0V24.8428ZM13.3333 24.8428H24V11.5094H13.3333V24.8428ZM13.3333 0.842773V8.84277H24V0.842773H13.3333Z"
        fill={color}
      />
    </svg>
  );
};
export default Main;