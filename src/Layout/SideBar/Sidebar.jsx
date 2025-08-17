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
import Coupons from "../../Svgs/Coupons";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(
    localStorage.getItem("selectedMenuItem") || ""
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
    setIsRTL(i18n.language === "ar");

    const determineActiveItem = () => {
      // Default to dashboard only for root paths
      if (path === "/" || path === "/Dashboard" || path === "/Dashboard/") {
        return "dashboard";
      }

      const pathMappings = [
        { path: "/Dashboard/Home-dashboard", item: "dashboard" },
        { path: "/Dashboard/categories", item: "categories" },
        { path: "/Dashboard/products", item: "products" },
        { path: "/Dashboard/orders", item: "orders" },
        { path: "/Dashboard/RecivedOrders", item: "orders,orders-pending" },
        { path: "/Dashboard/RefundRequests", item: "orders,orders-processing" },
        { path: "/Dashboard/AllInvoices", item: "invoices" },
        { path: "/Dashboard/AllCustomers", item: "clients" },
        { path: "/Dashboard/AllDiscounts", item: "promotions" },
        { path: "/Dashboard/Coupons", item: "coupons" },
        { path: "/Dashboard/Analytics", item: "reports" },
        { path: "/Dashboard/ShippingProviders", item: "settings,shipping-providers" },
        { path: "/Dashboard/PaymentMethods", item: "settings,payment-methods" },
        { path: "/Dashboard/SupportQuestion", item: "settings,support-questions" },
        { path: "/Dashboard/support", item: "support" },
        { path: "/Dashboard/Faqs", item: "help" },
      ];

      // Check exact matches first
      for (const mapping of pathMappings) {
        if (path === mapping.path) {
          return mapping.item;
        }
      }

      // Handle CRUD operations (add/edit/view)
      const crudMatch = path.match(/\/Dashboard\/([^\/]+)\/(add|edit|view|details)/i);
      if (crudMatch) {
        const mainPath = `/Dashboard/${crudMatch[1]}`;
        for (const mapping of pathMappings) {
          if (mapping.path === mainPath) {
            return mapping.item;
          }
        }
      }

      // Check partial matches for sub-paths
      for (const mapping of pathMappings) {
        if (path.startsWith(mapping.path)) {
          return mapping.item;
        }
      }

      // No match found - return empty to keep nothing selected
      return "";
    };

    const activeItem = determineActiveItem();
    const [mainItem, subItem] = activeItem.split(",");
    
    setSelectedItemPersistent(activeItem);
    setOpenSubmenuPersistent(subItem ? mainItem : null);
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

  const isMenuItemActive = (item) => {
    if (!selectedItem) return false;
    if (item.subItems) {
      return selectedItem.startsWith(item.id);
    }
    return selectedItem === item.id;
  };

  const isSubItemActive = (mainItem, subItem) => {
    return selectedItem === `${mainItem.id},${subItem.id}`;
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
      id: "coupons",
      label: t("coupons"),
      icon: <Coupons />,
      onclick: () => navigate("Coupons"),
      path: "Coupons",
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
                  isMenuItemActive(item) ? "active" : ""
                }`}
                onClick={() => handleItemClick(item)}
                data-id={item.id}
              >
                <div className="menu-icon">
                  {React.cloneElement(item.icon, {
                    className: `${
                      isMenuItemActive(item) ? "icon-active" : ""
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
                        isSubItemActive(item, subItem) ? "active" : ""
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
                isMenuItemActive(item) ? "active" : ""
              }`}
              onClick={() => handleItemClick(item)}
              data-id={item.id}
            >
              <div className="menu-icon">
                {React.cloneElement(item.icon, {
                  className: `${isMenuItemActive(item) ? "icon-active" : ""}`,
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