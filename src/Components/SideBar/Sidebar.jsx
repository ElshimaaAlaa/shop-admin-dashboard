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
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(
    localStorage.getItem("selectedMenuItem") || "dashboard"
  );
  const [openSubmenu, setOpenSubmenu] = useState(
    localStorage.getItem("openSubmenu") || null
  );
  const [isPinned, setIsPinned] = useState(
    localStorage.getItem("sidebarPinned") === "true"
  );
  const [expanded, setExpanded] = useState(
    localStorage.getItem("sidebarPinned") === "true"
  );
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);

  const setSelectedItemPersistent = (item) => {
    setSelectedItem(item);
    localStorage.setItem("selectedMenuItem", item);
  };

  const setOpenSubmenuPersistent = (item) => {
    setOpenSubmenu(item);
    localStorage.setItem("openSubmenu", item);
  };

  useEffect(() => {
    const path = location.pathname;
    
    // Reset selection first
    setSelectedItemPersistent("");
    setOpenSubmenuPersistent(null);

    if (
      path === "/Login" ||
      path === "/Dashboard" ||
      path === "/Dashboard/" ||
      path.includes("/Dashboard/Home-dashboard")
    ) {
      setSelectedItemPersistent("dashboard");
      return;
    }

    if (path.includes("/Dashboard/Home-dashboard")) {
      setSelectedItemPersistent("dashboard");
    } 
    else if (path.includes("/Dashboard/categories")) {
      setSelectedItemPersistent("categories");
    } 
    else if (path.includes("/Dashboard/products")) {
      setSelectedItemPersistent("products");
    } 
    else if (path.includes("/Dashboard/orders")) {
      if (path.includes("/Dashboard/RecivedOrders")) {
        setSelectedItemPersistent("orders,orders-pending");
        setOpenSubmenuPersistent("orders");
      } 
      else if (path.includes("/Dashboard/RefundRequests")) {
        setSelectedItemPersistent("orders,orders-processing");
        setOpenSubmenuPersistent("orders");
      } 
      else {
        setSelectedItemPersistent("orders");
      }
    } 
    else if (path.includes("/Dashboard/AllInvoices")) {
      setSelectedItemPersistent("invoices");
    } 
    else if (path.includes("/Dashboard/AllCustomers")) {
      setSelectedItemPersistent("clients");
    } 
    else if (path.includes("/Dashboard/AllDiscounts")) {
      setSelectedItemPersistent("promotions");
    } 
    else if (path.includes("/Dashboard/Analytics")) {
      setSelectedItemPersistent("reports");
    } 
    else if (path.includes("/Dashboard/ShippingProviders")) {
      setSelectedItemPersistent("settings,shipping-providers");
      setOpenSubmenuPersistent("settings");
    } 
    else if (path.includes("/Dashboard/PaymentMethods")) {
      setSelectedItemPersistent("settings,payment-methods");
      setOpenSubmenuPersistent("settings");
    } 
    else if (path.includes("/Dashboard/SupportQuestion")) {
      setSelectedItemPersistent("settings,support-questions");
      setOpenSubmenuPersistent("settings");
    } 
    else if (path.includes("/Dashboard/support")) {
      setSelectedItemPersistent("support");
    } 
    else if (path.includes("/Dashboard/Faqs")) {
      setSelectedItemPersistent("help");
    } 
    else {
      setSelectedItemPersistent("dashboard");
    }

    setIsRTL(i18n.language === "ar");
  }, [location, i18n.language]);

  const togglePin = (e) => {
    e.stopPropagation();
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    setExpanded(newPinnedState);
    localStorage.setItem("sidebarPinned", newPinnedState.toString());
  };

  const handleItemClick = (item) => {
    if (item.subItems) {
      setOpenSubmenuPersistent(openSubmenu === item.id ? null : item.id);
      if (!openSubmenu || openSubmenu !== item.id) {
        setSelectedItemPersistent(item.id);
      }
    } else {
      setSelectedItemPersistent(item.id);
      setOpenSubmenuPersistent(null);
      if (item.onclick) item.onclick();
    }
  };

  const handleSubItemClick = (mainItem, subItem) => {
    setSelectedItemPersistent(`${mainItem.id},${subItem.id}`);
    setOpenSubmenuPersistent(mainItem.id);
    if (subItem.onclick) subItem.onclick();
  };

  const menuItems = [
    {
      id: "dashboard",
      label: t("dashboard"),
      icon: <Home />,
      onclick: () => navigate("Home-dashboard"),
      path: "Home-dashboard",
    },
    {
      id: "categories",
      label: t("cats"),
      icon: <Cat />,
      onclick: () => navigate("categories"),
      path: "categories",
    },
    {
      id: "products",
      label: t("products"),
      icon: <Products />,
      onclick: () => navigate("products"),
      path: "products",
    },
    {
      id: "orders",
      label: t("orders"),
      icon: <Orders />,
      path: "orders",
      subItems: [
        {
          id: "orders-pending",
          label: t("recivedOrders"),
          onclick: () => navigate("RecivedOrders"),
          path: "RecivedOrders",
        },
        {
          id: "orders-processing",
          label: t("refundRquests"),
          onclick: () => navigate("RefundRequests"),
          path: "RefundRequests",
        },
      ],
    },
    {
      id: "invoices",
      label: t("invoices"),
      icon: <Invoices />,
      onclick: () => navigate("AllInvoices"),
      path: "AllInvoices",
    },
    {
      id: "clients",
      label: t("customers"),
      icon: <Clients />,
      onclick: () => navigate("AllCustomers"),
      path: "AllCustomers",
    },
    {
      id: "promotions",
      label: t("discounts"),
      icon: <Discount />,
      onclick: () => navigate("AllDiscounts"),
      path: "AllDiscounts",
    },
    {
      id: "reports",
      label: t("repors"),
      icon: <Reports />,
      onclick: () => navigate("Analytics"),
      path: "Analytics",
    },
    {
      id: "settings",
      label: t("settings"),
      icon: <Settings />,
      path: "settings",
      subItems: [
        {
          id: "shipping-providers",
          label: t("shippingProvider"),
          onclick: () => navigate("ShippingProviders"),
          path: "ShippingProviders",
        },
        {
          id: "payment-methods",
          label: t("paymentMethod"),
          onclick: () => navigate("PaymentMethods"),
          path: "PaymentMethods",
        },
        {
          id: "support-questions",
          label: t("supportQ"),
          onclick: () => navigate("SupportQuestion"),
          path: "SupportQuestion",
        },
      ],
    },
  ];

  const bottomMenuItems = [
    {
      id: "support",
      label: t("support"),
      icon: <Support />,
      onclick: () => navigate("support"),
      path: "support",
    },
    {
      id: "help",
      label: t("help"),
      icon: <Help />,
      onclick: () => navigate("Faqs"),
      path: "Faqs",
    },
  ];

  return (
    <div
      className={`sidebar min-h-screen ${isRTL ? "rtl" : "ltr"} ${
        isRTL ? "ltr-style" : ""
      } ${expanded ? "expanded" : ""} ${isPinned ? "pinned" : ""}`}
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
              title={isPinned ? t("unpinSidebar") : t("pinSidebar")}
              aria-label={isPinned ? t("unpinSidebar") : t("pinSidebar")}
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
                  selectedItem.includes(item.id) && !selectedItem.includes(',') ? "active" : ""
                }`}
                onClick={() => handleItemClick(item)}
                data-id={item.id}
              >
                <div className="menu-icon">
                  {React.cloneElement(item.icon, {
                    className: `${
                      selectedItem.includes(item.id) ? "icon-active" : ""
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
                        selectedItem.includes(subItem.id) ? "active" : ""
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
                  className: `${
                    selectedItem === item.id ? "icon-active" : ""
                  }`,
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