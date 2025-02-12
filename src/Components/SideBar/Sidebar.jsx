import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Charts from "../../Svgs/Charts";
import Messages from "../../Svgs/Messages";
import Support from "../../Svgs/Support";
import Settings from "../../Svgs/Setting";
import Shipping from "../../Svgs/Shipping";
import Discount from "../../Svgs/Discount";
import Main from "../../Svgs/Main";
import Cats from "../../Svgs/Cats";
import Products from "../../Svgs/Products";
import "./sidebar.scss";

function Sidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item, path) => {
    setActiveItem(item);
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="bg-black w-24 h-115vh relative">
      <div className="flex justify-center">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="mt-5 w-10 p-1"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-7">
        <h3 className="text-white mt-7">Menu</h3>
        <div
          className={activeItem === "main" ? "active-icon" : ""}
          onClick={() => handleClick("main")}
        >
          <Main color={activeItem === "main" ? "#E0A75E" : "#FFFFFF"} />
        </div>
        <div
          className={activeItem === "products" ? "active-icon" : ""}
          onClick={() => handleClick("products", "/Home/Products")}
        >
          <Products color={activeItem === "products" ? "#E0A75E" : "#FFFFFF"} />
        </div>
        <div
          className={activeItem === "categories" ? "active-icon" : ""}
          onClick={() => handleClick("categories", "/Home/categories")}
        >
          <Cats color={activeItem === "categories" ? "#E0A75E" : "#FFFFFF"} />
        </div>
        <div
          className={activeItem === "discount" ? "active-icon" : ""}
          onClick={() => handleClick("discount", "/Home/AllDiscounts")}
        >
          <Discount color={activeItem === "discount" ? "#E0A75E" : "#FFFFFF"} />
        </div>
        <div
          className={activeItem === "shipping" ? "active-icon" : ""}
          onClick={() => handleClick("shipping", "/AllOrders")}
        >
          <Shipping color={activeItem === "shipping" ? "#E0A75E" : "#FFFFFF"} />
        </div>
        <div
          className={activeItem === "charts" ? "active-icon" : ""}
          onClick={() => handleClick("charts")}
        >
          <Charts color={activeItem === "charts" ? "#E0A75E" : "#FFFFFF"} />
        </div>
        <div
          className={activeItem === "settings" ? "active-icon" : ""}
          onClick={() => handleClick("settings")}
        >
          <Settings color={activeItem === "settings" ? "#E0A75E" : "#FFFFFF"} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center absolute bottom-32 gap-6">
        <hr className="w-full ms-5" />
        <h3 className="text-white ms-3 text-sm">Support</h3>
        <div
          className={activeItem === "support" ? "active-icon" : ""}
          onClick={() => handleClick("support")}
        >
          <Support color={activeItem === "support" ? "#E0A75E" : "#FFFFFF"} />
        </div>
        <div
          className={activeItem === "messages" ? "active-icon" : ""}
          onClick={() => handleClick("messages")}
        >
          <Messages color={activeItem === "messages" ? "#E0A75E" : "#FFFFFF"} />
        </div>
      </div>
    </div>
  );
}
export default Sidebar;