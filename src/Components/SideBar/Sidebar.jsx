import React, { useState } from "react";
import "./sidebar.scss";
import { useNavigate } from "react-router-dom";
import Home from "../../Svgs/Home";
import Cat from "../../Svgs/Cat";
import Products from "../../Svgs/product";
import Orders from "../../Svgs/Orders";
import Clients from "../../Svgs/Clients";
import Reports from "../../Svgs/reports";
import Settings from "../../Svgs/Settings";
import Support from "../../Svgs/Support";
import Help from "../../Svgs/Help";
import Logo from "../../Svgs/logo";
import Text from "../../Svgs/text";
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
      icon: <Home />,
    },
    {
      id: "categories",
      label: "Categories",
      icon: <Cat />,
      padding: "3px",
      onclick: () => navigate("categories"),
    },
    {
      id: "products",
      label: "Products",
      icon: <Products />,
      padding: "4px",
      width: "32px",
      onclick: () => navigate("products"),
    },
    {
      id: "orders",
      label: "Orders",
      icon: <Orders />,
    },
    {
      id: "clients",
      label: "Clients",
      icon: <Clients />,
      height: "30px",
      padding: "3px",
    },
    {
      id: "promotions",
      label: "Promotions & Disc",
      icon: <Home />,
    },
    {
      id: "reports",
      label: "Reports",
      icon: <Reports />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings />,
    },
    {
      id: "support",
      label: "Support",
      icon: <Support />,
      onclick: () => navigate("support"),
    },
    {
      id: "help",
      label: "Help",
      icon: <Help />,
      onclick: () => navigate("Faqs"),
    },
  ];

  return (
    <div
      className={`sidebar bg-black overflow-hidden h-150vh w-20 flex flex-col gap-4 ${
        expanded ? "expanded" : ""
      }`}
      onMouseEnter={toggleSidebar}
      onMouseLeave={toggleSidebar}
    >
      <div>
        <div className="logo mt-5 mb-5">
          <Logo/>
        </div>
        <div className="text">
          <Text/>
        </div>
      </div>
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-2 cursor-pointer rounded-md hover:bg-primatyOpacity hover:p-2 hover:w-180`}
          onClick={() => handleItemClick(item)}
        >
          <span className="icon">
            {typeof item.icon === "string" ? (
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
            ) : (
              React.cloneElement(item.icon, {
                style: {
                  height: item.height,
                  width: item.width,
                  padding: item.padding,
                },
                className: `${selectedItem === item.id ? "selectedImg" : ""}`,
              })
            )}
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