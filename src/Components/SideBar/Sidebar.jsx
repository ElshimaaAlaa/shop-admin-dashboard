import React, { useState } from "react";
import "./sidebar.scss";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  const handleItemClick = (item) => {
    setSelectedItem(item.id);
    if (item.onclick) {
      item.onclick();
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "/assets/Svgs/home.svg",
    },
    {
      id: "categories",
      label: "Categories",
      icon: "/assets/Svgs/category.svg",
      padding: "3px",
      onclick: () => navigate("categories"),
    },
    {
      id: "products",
      label: "Products",
      icon: "/assets/Svgs/product.svg",
      padding: "4px",
      width: "32px",
      onclick: () => navigate("products"),
    },
    {
      id: "orders",
      label: "Orders",
      icon: "/assets/Svgs/orders.svg",
    },
    {
      id: "clients",
      label: "Clients",
      icon: "/assets/Svgs/clients.svg",
      height: "30px",
      padding: "3px",
    },
    {
      id: "promotions",
      label: "Promotions & Disc",
      icon: "/assets/Svgs/home.svg",
    },
    {
      id: "reports",
      label: "Reports",
      icon: "/assets/Svgs/reports.svg",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "/assets/Svgs/settings.svg",
    },
    {
      id: "support",
      label: "Support",
      icon: "/assets/Svgs/supports.svg",
      onclick: () => navigate("support"),
    },
    {
      id: "help",
      label: "Help",
      icon: "/assets/Svgs/help.svg",
      onclick: () => navigate("Faqs"),
    },
  ];

  return (
    <div
      className={`sidebar bg-black overflow-hidden h-150vh w-20 flex flex-col gap-7 ${
        expanded ? "expanded" : ""
      }`}
      onMouseEnter={toggleSidebar}
      onMouseLeave={toggleSidebar}
    >
      <div>
        <span className="logo">
          <img
            src="/assets/Svgs/Group 10.svg"
            alt="vertex-logo"
            className="h-10 w-12 mt-5"
          />
        </span>
        <span className="text">
          <img
            src="/assets/Svgs/Frame 13.svg"
            alt="vertex-logo"
            className="h-16 mt-5"
          />
        </span>
      </div>
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-2 cursor-pointer rounded-md hover:bg-primatyOpacity hover:p-2 hover:w-180`}
          onClick={() => handleItemClick(item)}
        >
          <span className="icon">
            <img
              src={item.icon}
              alt={item.label}
              aria-label={item.label}
              style={{
                height: item.height,
                width: item.width,
                padding: item.padding,
              }}
              className={`${selectedItem === item.id ? "selectedImg" : ""}`}
            />
          </span>
          <span
            className={`text-white text-14 dashbordItem ${
              selectedItem === item.id ? "selected" : ""
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
export default Sidebar;
