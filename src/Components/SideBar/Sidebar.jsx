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
    <div className="bg-black w-20 h-115vh relative">
      <div className="flex justify-center">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="mt-5 w-10 p-1"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <h3 className="text-white mt-7 font-bold mb-3 ">Menu</h3>
        <Main
          color={activeItem === "main" ? "#E0A75E" : "#FFFFFF"}
          onClick={() => handleClick("main")}
        />
        <Products
          color={activeItem === "products" ? "#E0A75E" : "#FFFFFF"}
          onClick={() => handleClick("products" ,"/Products")}
        />
        <Cats
          color={activeItem === "categories" ? "#E0A75E" : "#FFFFFF"}
          onClick={() => handleClick("categories", "/categories")}
        />
        <Discount
          color={activeItem === "discount" ? "#E0A75E" : "#FFFFFF"}
          onClick={() => handleClick("discount")}
        />
        <Shipping
          color={activeItem === "shipping" ? "#E0A75E" : "#FFFFFF"}
          onClick={() => handleClick("shipping")}
        />
        <Charts
          color={activeItem === "charts" ? "#E0A75E" : "#FFFFFF"}
          onClick={() => handleClick("charts")}
        />
        <Settings
          color={activeItem === "settings" ? "#E0A75E" : "#FFFFFF"}
          onClick={() => handleClick("settings")}
        />
      </div>
      <div className="border-b-white border-1 w-full mt-24"></div>

      <div className="flex flex-col items-center justify-center absolute bottom-10 gap-4">
        <h3 className="text-white">Support</h3>
        <Support
          color={activeItem === "support" ? "#E0A75E" : "#FFFFFF"}
          onClick={() => handleClick("support")}
        />
        <Messages
          color={activeItem === "messages" ? "#E0A75E" : "#FFFFFF"}
          onClick={() => handleClick("messages")}
        />
      </div>
    </div>
  );
}
export default Sidebar;