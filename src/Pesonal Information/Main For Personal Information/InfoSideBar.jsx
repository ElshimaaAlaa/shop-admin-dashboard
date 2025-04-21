import React, { useState } from "react";
import DeleteAccount from "../Personal Information/DeleteAccount";
import { useNavigate, useLocation } from "react-router-dom";
import StoreTheme from "../../Svgs/StoreTheme";
import StoreInformation from "../../Svgs/StoreInformation";
import PricingPlan from "../../Svgs/PricingPlan";
import PaymentMethod from "../../Svgs/PaymentMethod";
import Profile from "../../Svgs/Profile";

function InfoSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = [
    {
      IconComponent: Profile,
      alt: "Personal Information Icon",
      label: "Personal Information",
      path: "",
    },
    {
      IconComponent: StoreTheme,
      alt: "Store Theme Icon",
      label: "Store Theme",
      path: "StoreTheme",
    },
    {
      IconComponent: StoreInformation,
      alt: "Store Information Icon",
      label: "Store Information",
      path: "StoreInformation",
    },
    {
      IconComponent: PricingPlan,
      alt: "Pricing Plans Icon",
      label: "Pricing Plans",
      // path: "PricingPlans",
    },
    {
      IconComponent: PaymentMethod,
      alt: "Payment Information Icon",
      label: "Payment Information",
      // path: "PaymentInformation",
    },
  ];

  const handleItemClick = (path) => {
    navigate(path);
    setActiveItem(path);
  };

  const isActive = (path) => {
    const currentPath = location.pathname.split('/').pop();
    return currentPath === path || (path === "" && location.pathname.endsWith('MainInfo'));
  };

  return (
    <aside className="w-full">
      <div className="flex flex-col gap-10  md:gap-10 border-l p-4 md:p-10">
        {menuItems.map(({ IconComponent, alt, label, path }, index) => (
          <button
            key={index}
            className={`flex items-center gap-1${
              isActive(path) ? "text-primary" : ""
            }`}
            aria-label={label}
            onClick={() => handleItemClick(path)}
          >
            <div className={`w-6 h-6 me-3 ${isActive(path) ? "text-primary" : "text-gray-600"}`}>
              <IconComponent 
                className="w-full h-full"
                stroke={isActive(path) ? "#E0A75E" : "#000"}
              />
            </div>
            <p className={`font-semibold text-14 mt-1 ${isActive(path) ? "text-primary" : ""}`}>
              {label}
            </p>
          </button>
        ))}
        <DeleteAccount />
      </div>
    </aside>
  );
}
export default InfoSideBar;