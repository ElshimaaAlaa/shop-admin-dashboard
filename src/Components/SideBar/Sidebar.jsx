import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, Pin, PinOff } from "lucide-react";
import Home from "../../Svgs/Home";
import Support from "../../Svgs/Support";
import Help from "../../Svgs/Help";
import Logo from "../../Svgs/logo";
import Text from "../../Svgs/text";
import Invoices from "../../Svgs/Invoives";
import "./sidebar.scss";
import Cat from "../../Svgs/Cat";
import Products from "../../Svgs/product";
import Orders from "../../Svgs/Orders";
import Clients from "../../Svgs/Clients";
import Reports from "../../Svgs/reports";
import Settings from "../../Svgs/Settings";
import Discount from "../../Svgs/Discount";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isPinned, setIsPinned] = useState(
    localStorage.getItem("sidebarPinned") === "true"
  );
  const [expanded, setExpanded] = useState(
    localStorage.getItem("sidebarPinned") === "true"
  );

  useEffect(() => {
    const path = location.pathname;
    if (
      path === "/Login" ||
      path === "/Dashboard" ||
      path === "/Dashboard/" ||
      path.includes("/Dashboard/Home-dashboard")
    ) {
      setSelectedItem("dashboard");
      return;
    }

    if (path.includes("/Dashboard/Home-dashboard"))
      setSelectedItem("dashboard");
    else if (path.includes("/Dashboard/categories"))
      setSelectedItem("categories");
    else if (path.includes("/Dashboard/products")) setSelectedItem("products");
    else if (path.includes("/Dashboard/orders")) setSelectedItem("orders");
    else if (path.includes("/Dashboard/RecivedOrders")) {
      setSelectedItem("orders-pending");
      setOpenSubmenu("orders");
    } else if (path.includes("/Dashboard/RefundRequests")) {
      setSelectedItem("orders-processing");
      setOpenSubmenu("orders");
    } else if (path.includes("/Dashboard/AllInvoices"))
      setSelectedItem("invoices");
    else if (path.includes("/Dashboard/AllCustomers"))
      setSelectedItem("clients");
    else if (path.includes("/Dashboard/AllDiscounts"))
      setSelectedItem("promotions");
    else if (path.includes("/Dashboard/Analytics")) setSelectedItem("reports");
    else if (path.includes("/Dashboard/ShippingProviders")) {
      setSelectedItem("shipping-providers");
      setOpenSubmenu("settings");
    } else if (path.includes("/Dashboard/PaymentMethods")) {
      setSelectedItem("payment-methods");
      setOpenSubmenu("settings");
    } else if (path.includes("/Dashboard/SupportQuestion")) {
      setSelectedItem("support-questions");
      setOpenSubmenu("settings");
    } else if (path.includes("/Dashboard/support")) setSelectedItem("support");
    else if (path.includes("/Dashboard/Faqs")) setSelectedItem("help");
    else if (path === "/Dashboard" || path === "/Dashboard/") {
      setSelectedItem("dashboard");
    }
  }, [location]);

  const togglePin = (e) => {
    e.stopPropagation();
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    setExpanded(newPinnedState);
    localStorage.setItem("sidebarPinned", newPinnedState.toString());
  };

  const handleItemClick = (item) => {
    setSelectedItem(item.id);
    if (item.subItems) {
      setOpenSubmenu(openSubmenu === item.id ? null : item.id);
    } else {
      setOpenSubmenu(null);
      if (item.onclick) item.onclick();
    }
  };

  const handleSubItemClick = (mainItem, subItem) => {
    setSelectedItem(subItem.id);
    if (subItem.onclick) subItem.onclick();
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home />,
      onclick: () => navigate("Home-dashboard"),
      path: "Home-dashboard",
    },
    {
      id: "categories",
      label: "Categories",
      icon: <Cat />,
      onclick: () => navigate("categories"),
      path: "categories",
    },
    {
      id: "products",
      label: "Products",
      icon: <Products />,
      onclick: () => navigate("products"),
      path: "products",
    },
    {
      id: "orders",
      label: "Orders",
      icon: <Orders />,
      path: "orders",
      subItems: [
        {
          id: "orders-pending",
          label: "Received Orders",
          onclick: () => navigate("RecivedOrders"),
          path: "RecivedOrders",
        },
        {
          id: "orders-processing",
          label: "Refund Requests",
          onclick: () => navigate("RefundRequests"),
          path: "RefundRequests",
        },
      ],
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: <Invoices />,
      onclick: () => navigate("AllInvoices"),
      path: "AllInvoices",
    },
    {
      id: "clients",
      label: "Customers",
      icon: <Clients />,
      onclick: () => navigate("AllCustomers"),
      path: "AllCustomers",
    },
    {
      id: "promotions",
      label: "Disc and Promotion",
      icon: <Discount />,
      onclick: () => navigate("AllDiscounts"),
      path: "AllDiscounts",
    },
    {
      id: "reports",
      label: "Reports",
      icon: <Reports />,
      onclick: () => navigate("Analytics"),
      path: "Analytics",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings />,
      path: "settings",
      subItems: [
        {
          id: "shipping-providers",
          label: "Shipping Providers",
          onclick: () => navigate("ShippingProviders"),
          path: "ShippingProviders",
        },
        {
          id: "payment-methods",
          label: "Payment Methods",
          onclick: () => navigate("PaymentMethods"),
          path: "PaymentMethods",
        },
        {
          id: "support-questions",
          label: "Support Questions",
          onclick: () => navigate("SupportQuestion"),
          path: "SupportQuestion",
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
      path: "support",
    },
    {
      id: "help",
      label: "Help",
      icon: <Help />,
      // padding: "5px",
      onclick: () => navigate("Faqs"),
      path: "Faqs",
    },
  ];

  return (
    <div
      className={`sidebar min-h-screen ${expanded ? "expanded" : ""} ${
        isPinned ? "pinned" : ""
      }`}
      onMouseEnter={() => !isPinned && setExpanded(true)}
      onMouseLeave={() => !isPinned && setExpanded(false)}
    >
      <div className="sidebar-header">
        {expanded ? (
          <div className="header-expanded">
            <Text />
            <button
              onClick={togglePin}
              className="pin-button"
              title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
              aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}
            >
              {isPinned ? (
                <PinOff size={18} className="text-white" />
              ) : (
                <Pin size={18} className="text-white" />
              )}
            </button>
          </div>
        ) : (
          <div className="header-collapsed">
            <Logo />
          </div>
        )}
      </div>

      <div className="sidebar-content">
        <div className="main-menu">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item-container">
              <div
                className={`menu-item ${
                  selectedItem === item.id ? "active" : ""
                }`}
                onClick={() => handleItemClick(item)}
                data-id={item.id}
              >
                <div className="menu-icon">
                  {React.cloneElement(item.icon, {
                    className: `${
                      selectedItem === item.id ? "icon-active" : ""
                    }`,
                  })}
                </div>
                {expanded && (
                  <div className="menu-content">
                    <span className="menu-label">{item.label}</span>
                    {item.subItems && (
                      <span className="menu-chevron">
                        {openSubmenu === item.id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {item.subItems && openSubmenu === item.id && expanded && (
                <div className="submenu">
                  {item.subItems.map((subItem) => (
                    <div
                      key={subItem.id}
                      className={`submenu-item ${
                        selectedItem === subItem.id ? "active" : ""
                      }`}
                      onClick={() => handleSubItemClick(item, subItem)}
                    >
                      <span className="submenu-label">{subItem.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bottom-menu">
          {bottomMenuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${
                selectedItem === item.id ? "active" : ""
              }`}
              onClick={() => handleItemClick(item)}
              data-id={item.id}
            >
              <div className="menu-icon">
                {React.cloneElement(item.icon, {
                  className: `${selectedItem === item.id ? "icon-active" : ""}`,
                })}
              </div>
              {expanded && (
                <div className="menu-content">
                  <span className="menu-label">{item.label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
