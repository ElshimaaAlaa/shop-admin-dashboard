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
import { ChevronDown, ChevronUp, Pin, PinOff } from "lucide-react";
import Discount from "../../Svgs/Discount";
import Invoices from "../../Svgs/Invoives";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    if (!isPinned) {
      setExpanded(!expanded);
    }
  };

  const togglePin = (e) => {
    e.stopPropagation();
    setIsPinned(!isPinned);
    if (!isPinned) {
      setExpanded(true);
    }
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
      onclick: () => navigate("Home-dashboard"),
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
      padding: "3px",
      onclick: () => navigate("products"),
    },
    {
      id: "orders",
      label: "Orders",
      icon: <Orders />,
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
      ],
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: <Invoices />,
      padding: "4px",
      onclick: () => navigate("AllInvoices"),
    },
    {
      id: "clients",
      label: "Customers",
      icon: <Clients />,
      padding: "3px",
      onclick: () => navigate("AllCustomers"),
    },
    {
      id: "promotions",
      label: "Disc and Promotion",
      icon: <Discount />,
      padding: "5px",
      onclick: () => navigate("AllDiscounts"),
    },
    {
      id: "reports",
      label: "Reports",
      icon: <Reports />,
      onclick: () => navigate("Analytics"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings />,
      subItems: [
        {
          id: "shipping-providers",
          label: "Shipping Providers",
          onclick: () => navigate("ShippingProviders"),
        },
        {
          id: "payment-methods",
          label: "Payment Methods",
          onclick: () => navigate("PaymentMethods"),
        },
        {
          id: "support-questions",
          label: "Support Questions",
          onclick: () => navigate("SupportQuestion"),
        },
      ],
    },
  ];

  const bottomMenuItems = [
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
      padding: "5px",
      onclick: () => navigate("Faqs"),
    },
  ];

  return (
    <div
      className={`sidebar px-6 bg-black min-h-screen flex flex-col items-center justify-between ${
        expanded ? "expanded w-[250px] px-3" : "w-20"
      } ${isPinned ? "pinned" : ""}`}
      onMouseEnter={toggleSidebar}
      onMouseLeave={toggleSidebar}
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-center items-center relative h-16">
          {!expanded && (
            <div className="logo absolute">
              <Logo />
            </div>
          )}
          {expanded && (
            <div className="flex justify-between gap-12 items-center text">
              <div>
                <Text />
              </div>
              <div>
                <button
                  onClick={togglePin}
                  className="pin-button mt-4"
                  title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
                >
                  {isPinned ? (
                    <PinOff size={18} className="text-white" />
                  ) : (
                    <Pin size={18} className="text-white" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Menu Items */}
        {menuItems.map((item) => (
          <div key={item.id}>
            <div
              className={`flex items-center gap-2 cursor-pointer rounded-md hover:bg-primatyOpacity hover:p-2 ${
                expanded ? "hover:w-[215px]" : "hover:w-20"
              } ${openSubmenu === item.id ? "active-menu-item" : ""}`}
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
                    className={`${
                      selectedItem === item.id ? "selectedImg" : ""
                    }`}
                  />
                ) : (
                  React.cloneElement(item.icon, {
                    style: {
                      height: item.height,
                      width: item.width,
                      padding: item.padding,
                    },
                    className: `${
                      selectedItem === item.id ? "selectedImg" : ""
                    }`,
                  })
                )}
              </span>
              {expanded && (
                <>
                  <span
                    className={`text-white text-14 dashbordItem ${
                      selectedItem === item.id ? "selected" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.subItems && (
                    <span className="ml-auto dashbordItem">
                      {openSubmenu === item.id ? (
                        <ChevronUp size={16} className="text-white" />
                      ) : (
                        <ChevronDown size={16} className="text-white" />
                      )}
                    </span>
                  )}
                </>
              )}
            </div>

            {item.subItems && openSubmenu === item.id && expanded && (
              <div className="submenu pl-8 mt-1 flex flex-col ">
                {item.subItems.map((subItem) => (
                  <div
                    key={subItem.id}
                    className={`flex gap-2 cursor-pointer rounded-md ${
                      selectedItem === subItem.id ? "selected-submenu-item" : ""
                    }`}
                    onClick={() => handleSubItemClick(item, subItem)}
                  >
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

      <div className="flex flex-col gap-4 pb-4 w-full">
        {bottomMenuItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center  gap-2 cursor-pointer rounded-md hover:bg-primatyOpacity hover:p-2 ${
              expanded ? "hover:w-[215px]" : "hover:w-20"
            } ${selectedItem === item.id ? "active-menu-item" : ""}`}
            onClick={() => handleItemClick(item)}
          >
            <span className="icon">
              {typeof item.icon === "string" ? (
                <img
                  src={item.icon || "/placeholder.svg"}
                  alt={item.label}
                  aria-label={item.label}
                  className={`${selectedItem === item.id ? "selectedImg" : ""}`}
                />
              ) : (
                React.cloneElement(item.icon, {
                  className: `${selectedItem === item.id ? "selectedImg" : ""}`,
                })
              )}
            </span>
            {expanded && (
              <span
                className={`text-white text-14 dashbordItem ${
                  selectedItem === item.id ? "selected" : ""
                }`}
              >
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;