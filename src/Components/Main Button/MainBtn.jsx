import React from "react";
import "./MainBtn.scss";
function MainBtn({ text, onclick, btnType, ...props }) {
  return (
    <div className="">
      <button
        className="mainButton bg-primary text-white font-bold outline-none w-80 lg:w-400 md:w-400 sm:w-390 s:w-390"
        onClick={onclick}
        style={{fontSize:"15px"}}
        type={btnType}
      >
        {text}
      </button>
    </div>
  );
}
export default MainBtn;