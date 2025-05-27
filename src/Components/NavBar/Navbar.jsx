import { useNavigate } from "react-router-dom";
import { CiSearch, CiCircleRemove } from "react-icons/ci";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useSearch } from "../../Context/SearchContext";
import ProfileMenu from "../../Profile/Profile";

function Navbar() {
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value.toLowerCase());
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white shadow-sm">
      <nav className="flex items-center justify-between px-5 py-2 border-b border-gray-200">
        <div className="flex items-center gap-4">
          {/* Back button */}
          <button
            onClick={goBack}
            aria-label="Go back"
            className="hover:opacity-80 transition-opacity"
          >
            <FaRegArrowAltCircleLeft size={30} color="#E0A75E" />
          </button>
          
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-[400px]">
            <input
              type="text"
              placeholder="Search something here..."
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pl-10 pr-8 placeholder:text-sm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <CiSearch size={22} color="#E0A75E" />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-3 text-gray-400 hover:text-primary transition-colors"
                aria-label="Clear search"
              >
                <CiCircleRemove size={22} />
              </button>
            )}
          </form>
        </div>
        
        <div className="flex items-center gap-5">
          <ProfileMenu />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;