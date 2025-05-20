import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { fetchPromotions } from "../../ApiServices/Promotions";
import DeleteDiscount from "./DeleteDiscount";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";

function AllDiscounts() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 5,
    total: 0,
    total_pages: 1,
  });

  const fetchData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetchPromotions(
        searchQuery,
        pagination.current_page,
        pagination.per_page
      );
      setDiscounts(response.data);
      setPagination(response.pagination);
      if (response.data.length === 0 && pagination.current_page > 1) {
        setPagination((prev) => ({
          ...prev,
          current_page: prev.current_page - 1,
        }));
        return; 
      }
    } catch (error) {
      console.error("Error fetching promotions:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchQuery, pagination.current_page]);

  const handlePageClick = (event) => {
    setPagination((prev) => ({
      ...prev,
      current_page: event.selected + 1,
    }));
  };

  const handleDeleteSuccess = () => {
    fetchData();
  };

  return (
    <div className="bg-gray-100 flex flex-col h-[89vh] mx-5">
      <Helmet>
        <title>Discounts and Promotion | vertex</title>
      </Helmet>
      <section className=" rounded-md p-5 bg-white mt-5">
        <p className="text-gray-400 text-13">
          Menu / Promotions & Discounts / Promotions
        </p>
        <h1 className="mt-2 text-17 font-bold">Promotions</h1>
      </section>
      <div className="bg-white rounded-md p-5  my-2">
        <SearchBar
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
          text={"Add New Promotion"}
          onclick={() => navigate("/Dashboard/AddDiscounts")}
          value={searchQuery}
          onchange={(e) => {
            setSearchQuery(e.target.value);
            setPagination((prev) => ({ ...prev, current_page: 1 }));
          }}
        />
        {error ? (
          <div className="text-red-500 text-center mt-10">
            Failed to fetch data. Please try again.
          </div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : discounts.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery
              ? "No promotions match your search."
              : "No promotions found."}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-t border-b text-15 text-left w-200">
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all categories"
                        />
                        Promotions
                      </p>
                    </th>
                    <th className="px-3 py-3 text-left text-15 border w-200">
                      Products Number
                    </th>
                    <th className="px-3 py-3 text-left border text-15 w-200">
                      End Date
                    </th>
                    <th className="px-6 py-3 border text-center text-15 w-12">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {discounts.map((discount) => (
                    <tr key={discount.id} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-3 border-t text-gray-600 text-15 border-r w-250 ">
                        <p className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label="Select all categories"
                          />
                          {discount.name}
                        </p>
                      </td>
                      <td className="px-3 py-2 border-t text-gray-600 border-r text-14 w-250">
                        <p className="flex items-center justify-between bg-customOrange-mediumOrange rounded-md p-2 w-20">
                          <HiOutlineShoppingCart color="#E0A75E" size={22} />
                          {discount.quantity}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t text-gray-600 border-r text-13 w-250">
                        <p className="flex items-center gap-2">
                          <IoCalendarNumberOutline color="#69ABB5" size={16} />
                          {discount.end_date || "N/A"}
                        </p>
                      </td>
                      <td className="text-center px- py-3">
                        <div className="flex justify-center items-center">
                          <DeleteDiscount
                            id={discount.id}
                            onDelete={handleDeleteSuccess}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ReactPaginate
              pageCount={pagination.total_pages}
              onPageChange={handlePageClick}
              forcePage={pagination.current_page - 1}
              containerClassName="flex items-center justify-end mt-5  text-gray-400 text-14"
              pageClassName="px-3 py-1 rounded "
              activeClassName="bg-customOrange-lightOrange text-primary"
              previousLabel={<ChevronLeft className="w-5 h-5 text-primary" />}
              nextLabel={<ChevronRight className="w-5 h-5 text-primary" />}
              previousClassName={`px-3 py-1 rounded ${
                pagination.current_page === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
              nextClassName={`px-3 py-1 rounded ${
                pagination.current_page === pagination.total_pages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </>
        )}
      </div>
    </div>
  );
}
export default AllDiscounts;