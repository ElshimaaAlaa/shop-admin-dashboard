import { useState } from 'react';
import ProfileMenu from "../../Profile/Profile";
import { CiSearch } from "react-icons/ci";

function Navbar({ onPinToggle, isPinned, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value.toLowerCase());
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="bg-white shadow-sm">
      <nav className="flex items-center justify-between px-5 py-2 border-b border-gray-200">
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative w-400">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pl-10 pr-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch size={22} color='#E0A75E'/>
            </div>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <ProfileMenu />
        </div>
      </nav>
    </div>
  );
}
export default Navbar;