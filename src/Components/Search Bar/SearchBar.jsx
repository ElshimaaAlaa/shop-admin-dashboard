import React from "react";
import { Search, Plus } from "lucide-react";

function SearchBar({onclick , value ,onchange ,text}) {
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
          className="w-full pl-10 pr-4 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border border-gray-200 bg-lightgray"
        />
      </div>
      <div
        className="flex gap-3 bg-primary text-white py-4 px-3 rounded-md w-52 cursor-pointer"
        onClick={onclick}
      >
        <div className="bg-white text-primary rounded-md ">
          <Plus className="p-1 font-bold" />
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}
export default SearchBar;