import React from "react";
import { ClipLoader } from "react-spinners";
import { FaCircleCheck } from "react-icons/fa6";

function Footer({
  saveText,
  cancelText,
  cancelOnClick,
  saveOnClick,
  isLoading,
  saveBtnType,
  cancelBtnType,
}) {
  return (
    <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full mt-5 absolute bottom-0">
      <button
        type={"button"}
        className="bg-gray-100 text-gray-400 p-3 w-40 rounded-md"
        onClick={cancelOnClick}
      >
        {cancelText}
      </button>
      <button
        type={"submit"}
        className="bg-primary text-white rounded-md p-3 w-40 flex items-center gap-2 justify-center"
        onClick={saveOnClick}
      >
        {isLoading ? (
          <ClipLoader color="#fff" size={22} />
        ) : (
          <>
            <FaCircleCheck /> {saveText}
          </>
        )}
      </button>
    </div>
  );
}
export default Footer;