import React from "react";
import { ClipLoader } from "react-spinners";
function Footer({
  Savetext,
  Cancel,
  isCancelLoading = false,
  isSaveLoading = false,
  CancelOnClick,
  SaveOnClick,
  cancelbtnType,
  savebtnType,
  ...prop
}) {
  return (
    <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full mt-5 absolute bottom-0">
      <button
        type={cancelbtnType}
        className="bg-gray-200 text-gray-500 font-bold p-3 w-40 rounded-md"
        onClick={CancelOnClick}
      >
        {isCancelLoading ? <ClipLoader color="#fff" size={22} /> : Cancel}
      </button>
      <button
        type={savebtnType}
        className="bg-primary text-white font-bold rounded-md p-3 w-40"
        onClick={SaveOnClick}
      >
        {isSaveLoading ? <ClipLoader color="#fff" size={22} /> : Savetext}
      </button>
    </div>
  );
}
export default Footer;