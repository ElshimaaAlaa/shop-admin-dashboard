import React, { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import FailedModal from "../../Components/Modal/Failed Modal/FailedModal";
import { ClipLoader } from "react-spinners";
import { logOut } from "../../ApiServices/LogOut";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

function LogOut() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handelLogOut = async () => {
    setIsLoading(true);
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      setShowModal(true);
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <p
        className="text-gray-500 flex items-center gap-3 p-2 text-15 mt-2 hover:bg-gray-50 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <MdOutlineLogout className="text-red-600 h-6 w-6" />
        Log Out
      </p>
      <FailedModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-red-50 p-3 rounded-md text-red-600 my-6">
          <MdLogout size={26} />
        </div>
        <p className="font-bold w-72 text-center">
          Are You Sure You Want To Logout ?
        </p>
        <div className="flex gap-3 mt-5 mb-3">
          <button
            className="rounded p-3 bg-gray-100 text-gray-400 font-bold w-32"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="rounded text-white bg-customred font-bold p-3 w-32"
            onClick={handelLogOut}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={"22px"} className="text-center" />
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </FailedModal>
    </div>
  );
}
export default LogOut;
