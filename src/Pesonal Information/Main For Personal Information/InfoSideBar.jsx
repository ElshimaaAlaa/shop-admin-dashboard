import React from "react";
import DeleteAccount from "../Personal Information/DeleteAccount";
import { useNavigate } from "react-router-dom";

function InfoSideBar() {
  const navigate = useNavigate();
  const menuItems = [
    {
      icon: "/assets/images/profile_svgrepo.com.png",
      alt: "Personal Information Icon",
      label: "Personal Information",
      className: "text-primary",
    },
    {
      icon: "/assets/svgs/Vector.svg",
      alt: "Store Theme Icon",
      label: "Store Theme",
      onClick: () => navigate("StoreTheme"),
    },
    {
      icon: "/assets/svgs/store-1_svgrepo.com.svg",
      alt: "Store Information Icon",
      label: "Store Information",
      onClick: () => navigate("StoreInformation"),
    },
    {
      icon: "/assets/svgs/pricetag2_svgrepo.com.svg",
      alt: "Pricing Plans Icon",
      label: "Pricing Plans",
    },
    {
      icon: "/assets/svgs/payment_svgrepo.com.svg",
      alt: "Payment Information Icon",
      label: "Payment Information",
    },
  ];

  return (
    <section className="flex flex-col gap-7 md:gap-7 border-l p-4 md:p-10">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="flex items-center gap-3 w-full text-left hover:bg-gray-100 p-2 rounded-md transition-colors"
          aria-label={item.label}
          onClick={item.onClick}
        >
          <img src={item.icon} alt={item.alt} className="w-6 h-6" />
          <p className={`font-semibold text-15 mt-1 ${item.className || ""}`}>
            {item.label}
          </p>
        </button>
      ))}
      <DeleteAccount />
    </section>
  );
}
export default InfoSideBar;
