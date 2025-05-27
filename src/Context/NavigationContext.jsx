import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(() => {
    return localStorage.getItem("selectedSidebarItem") || null;
  });
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const menuItems = [
    { id: "dashboard", path: "/home-dashboard" },
    { id: "categories", path: "/categories" },
    { id: "products", path: "/products" },
    {
      id: "orders",
      path: "/orders",
      subPaths: ["/received-orders", "/refund-requests"],
    },
    { id: "invoices", path: "/invoices" },
    { id: "clients", path: "/customers" },
    { id: "promotions", path: "/discounts" },
    { id: "reports", path: "/analytics" },
    {
      id: "settings",
      path: "/settings",
      subPaths: [
        "/shipping-providers",
        "/payment-methods",
        "/support-questions",
      ],
    },
  ];

  const bottomMenuItems = [
    { id: "support", path: "/support" },
    { id: "help", path: "/faqs" },
  ];

  useEffect(() => {
    const path = location.pathname.toLowerCase();

    // Check main items
    for (const item of [...menuItems, ...bottomMenuItems]) {
      if (item.path && path.includes(item.path)) {
        setSelectedItem(item.id);
        localStorage.setItem("selectedSidebarItem", item.id);
        return;
      }

      // Check sub-items
      if (item.subPaths) {
        for (const subPath of item.subPaths) {
          if (path.includes(subPath)) {
            setSelectedItem(item.id);
            setOpenSubmenu(item.id);
            localStorage.setItem("selectedSidebarItem", item.id);
            return;
          }
        }
      }
    }
  }, [location.pathname]);

  return (
    <NavigationContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
        openSubmenu,
        setOpenSubmenu,
        menuItems,
        bottomMenuItems,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
