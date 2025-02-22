import React from "react";
import { ClipLoader } from "react-spinners";
function Footer({saveText , cancelText , cancelOnClick , saveOnClick , isLoading , saveBtnType , cancelBtnType}) {
  return (
    <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full mt-5 absolute bottom-0">
      <button
        type={"button"}
        className="bg-gray-100 text-gray-400 font-bold p-3 w-40 rounded-md"
        onClick={cancelOnClick}
      >
        {cancelText}
      </button>
      <button
        type={"submit"}
        className="bg-primary text-white font-bold rounded-md p-3 w-40"
        onClick={saveOnClick}
      >
       {isLoading ? <ClipLoader color="#fff" size={22}/>: saveText} 
      </button>
    </div>
  );
}
export default Footer;