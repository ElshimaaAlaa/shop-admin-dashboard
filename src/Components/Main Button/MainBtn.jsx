import React from "react";
import "./MainBtn.scss";
function MainBtn({ text, onclick, btnType, ...props }) {
  return (
    <div>
      <button
        className="mainButton bg-primary rounded-md text-18 text-white font-bold outline-none w-full"
        onClick={onclick}
        type={btnType}
      >
        {text}
      </button>
    </div>
  );
}
export default MainBtn;