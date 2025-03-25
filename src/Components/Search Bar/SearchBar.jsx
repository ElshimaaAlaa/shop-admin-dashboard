import React from "react";
import { Search, Plus } from "lucide-react";

function SearchBar({onclick , value ,onchange ,text , icon}) {
  return (
    <div className="flex justify-between items-center gap-5 bg-white mb-10 rounded-md">
      <div className="relative w-full">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
          color="#E0A75E"
        />
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={onchange}
          className="w-full pl-10 pr-4 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-2 border-gray-200 bg-lightgray placeholder:text-15 focus:border-primary"
        />
      </div>
      <div
        className="flex items-center gap-3 bg-primary text-white py-4 px-3 rounded-md w-64 cursor-pointer"
        onClick={onclick}
      >
        <div >
          {icon}
        </div>
        <p className="text-16">{text}</p>
      </div>
    </div>
  );
}
export default SearchBar;