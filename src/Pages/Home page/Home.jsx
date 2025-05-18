import { useState } from "react";
import Navbar from "../../Components/NavBar/Navbar";
import Sidebar from "../../Components/SideBar/Sidebar";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

function Home() {
  const [isPinned, setIsPinned] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePinToggle = () => {
    setIsPinned(!isPinned);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className="flex">
        <Sidebar isPinned={isPinned} onPinToggle={handlePinToggle} />
        <div className="flex-1 ml-0">
          <Navbar onSearch={handleSearch} />
          <div className="mt-0 bg-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;