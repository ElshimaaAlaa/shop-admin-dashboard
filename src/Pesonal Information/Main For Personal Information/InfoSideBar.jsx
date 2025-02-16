import React from "react";
import DeleteAccount from "../Personal Information/DeleteAccount";
import { useNavigate } from "react-router-dom";
function InfoSideBar() {
    const Navigate = useNavigate();
  return (
    <section className="flex flex-col gap-10 border-l p-10">
      <div className="flex items-center gap-3 cursor-pointer" onClick={()=>Navigate('/Home/MainInfo/personalInformation')}>
        <img
          src="/assets/images/profile_svgrepo.com.png"
          alt="user-info"
          className="w-6 h-6"
        />
        <p className="font-semibold text-13 mt-1 text-primary">
          Personal Information
        </p>
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <img
          src="/assets/images/paint_svgrepo.com.png"
          alt="user-info"
          className="w-6 h-6"
        />
        <p className="font-semibold text-13 mt-1">Store Theme</p>
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <img
          src="/assets/images/store-1_svgrepo.com.png"
          alt="user-info"
          className="w-6 h-6"
        />
        <p className="font-semibold text-13 mt-1">Store Information</p>
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <img
          src="/assets/images/pricetag2_svgrepo.com.png"
          alt="user-info"
          className="w-6 h-6"
        />
        <p className="font-semibold text-13 mt-1">Pricing Plans</p>
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <img
          src="/assets/images/payment_svgrepo.com.png"
          alt="user-info"
          className="w-6 h-6"
        />
        <p className="font-semibold text-13 mt-1">Payment Information</p>
      </div>
      <DeleteAccount />
    </section>
  );
}

export default InfoSideBar;
