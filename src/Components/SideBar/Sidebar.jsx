"use client";

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
import { ChevronDown, ChevronUp } from "lucide-react";
// import Invoices from "../../Svgs/Invoices";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item.id);

    if (item.subItems) {
      setOpenSubmenu(openSubmenu === item.id ? null : item.id);
    } else {
      setOpenSubmenu(null);
      if (item.onclick) {
        item.onclick();
      }
    }
  };

  const handleSubItemClick = (mainItem, subItem) => {
    setSelectedItem(subItem.id);
    if (subItem.onclick) {
      subItem.onclick();
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
      width: "32px",
      subItems: [
        {
          id: "orders-pending",
          label: "Received Orders",
          onclick: () => navigate("RecivedOrders"),
        },
        {
          id: "orders-processing",
          label: "Refund Requests",
          onclick: () => navigate("RefundRequests"),
        },
        {
          id: "orders-completed",
          label: "Invoices",
          onclick: () => navigate(""),
          // icon: <Invoices />, 
        },
      ],
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
      className={`sidebar bg-black overflow-hidden h-[160vh] w-20 flex flex-col gap-4 ${
        expanded ? "expanded" : ""
      }`}
      onMouseEnter={toggleSidebar}
      onMouseLeave={toggleSidebar}
    >
      <div>
        <div className="logo mt-5 mb-5">
          <Logo />
        </div>
        <div className="text">
          <Text />
        </div>
      </div>
      {menuItems.map((item) => (
        <div key={item.id}>
          <div
            className={`flex items-center gap-2 cursor-pointer rounded-md hover:bg-primatyOpacity hover:p-2 hover:w-180 ${
              openSubmenu === item.id ? "active-menu-item" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            <span className="icon">
              {typeof item.icon === "string" ? (
                <img
                  src={item.icon || "/placeholder.svg"}
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
            {item.subItems && expanded && (
              <span className="ml-auto dashbordItem">
                {openSubmenu === item.id ? (
                  <ChevronUp size={16} className="text-white" />
                ) : (
                  <ChevronDown size={16} className="text-white" />
                )}
              </span>
            )}
          </div>
          {/* Submenu items */}
          {item.subItems && openSubmenu === item.id && expanded && (
            <div className="submenu pl-8 mt-1">
              {item.subItems.map((subItem) => (
                <div
                  key={subItem.id}
                  className={`flex items-center gap-2 cursor-pointer py-2 pl- rounded-md ${
                    selectedItem === subItem.id ? "selected-submenu-item" : ""
                  }`}
                  onClick={() => handleSubItemClick(item, subItem)}
                >
                  {/* Render the icon for submenu items */}
                  {subItem.icon && (
                    <span className="icon">
                      {typeof subItem.icon === "string" ? (
                        <img
                          src={subItem.icon || "/placeholder.svg"}
                          alt={subItem.label}
                          aria-label={subItem.label}
                          style={{
                            height: subItem.height,
                            width: subItem.width,
                            padding: subItem.padding,
                          }}
                          className={`${
                            selectedItem === subItem.id ? "selectedImg" : ""
                          }`}
                        />
                      ) : (
                        React.cloneElement(subItem.icon, {
                          style: {
                            height: subItem.height,
                            width: subItem.width,
                            padding: subItem.padding,
                          },
                          className: `${
                            selectedItem === subItem.id ? "selectedImg" : ""
                          }`,
                        })
                      )}
                    </span>
                  )}
                  <span
                    className={`text-white text-14 ${
                      selectedItem === subItem.id ? "selected" : ""
                    }`}
                  >
                    {subItem.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;