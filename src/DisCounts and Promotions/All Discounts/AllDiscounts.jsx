import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { fetchPromotions } from "../../ApiServices/Promotions";
import DeleteDiscount from "./DeleteDiscount";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

function AllDiscounts() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 1,
  });

  useEffect(() => {
    const getPromotions = async () => {
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
      } catch (error) {
        console.error("Error fetching promotions:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPromotions();
  }, [searchQuery, pagination.current_page]);

  const handlePageClick = (event) => {
    setPagination((prev) => ({
      ...prev,
      current_page: event.selected + 1,
    }));
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen ">
      <Helmet>
        <title>Discounts and Promotion | vertex</title>
      </Helmet>
      <h1 className="font-bold rounded-md p-5 text-17 mx-10 bg-white mt-5">
        Promotions
      </h1>
      <div className="bg-white rounded-md p-5 mx-10 my-3">
        <div className="relative w-full mt-3">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
            color="#E0A75E"
          />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPagination((prev) => ({ ...prev, current_page: 1 }));
            }}
            className="w-full pl-10 pr-4 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-2 border-gray-200 bg-lightgray placeholder:text-15 focus:border-primary"
          />
        </div>
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
                    <th className="px-3 py-3 border-t border-b text-left cursor-pointer w-200">
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all categories"
                        />
                        Promotions
                      </p>
                    </th>
                    <th className="px-6 py-3 text-left border w-200">
                      Products Number
                    </th>
                    <th className="px-6 py-3 text-left border w-200">
                      End Date
                    </th>
                    <th className="px-6 py-3 border text-center w-20">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {discounts.map((discount) => (
                    <tr key={discount.id} className="border-t hover:bg-gray-50">
                      <td
                        className="px-3 py-3 border-t text-14 border-r w-250 cursor-pointer"
                        onClick={() =>
                          navigate(`/Dashboard/AllDiscounts/${discount.id}`)
                        }
                      >
                        <p className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label="Select all categories"
                          />
                          {discount.name}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t text-gray-600 border-r text-14 w-250">
                        <p className="flex items-center justify-between bg-customOrange-mediumOrange rounded-md p-2 w-20">
                          <HiOutlineShoppingCart color="#E0A75E" size={25} />
                          {discount.quantity}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t text-gray-600 border-r text-14 w-250">
                        <p className="flex items-center gap-2">
                          <IoCalendarNumberOutline color="#69ABB5" size={13} />
                          {discount.end_date || "N/A"}
                        </p>
                      </td>
                      <td className="text-center px-3 py-3">
                        <div className="flex justify-center gap-1 items-center">
                          <button
                            aria-label={`Edit ${discount.name}`}
                            onClick={() =>
                              navigate(
                                `/Dashboard/editDiscount/${discount.id}`,
                                {
                                  state: discount,
                                }
                              )
                            }
                          >
                            <img
                              src="/assets/svgs/editIcon.svg"
                              alt="edit discount"
                              className="w-6"
                            />
                          </button>
                          <DeleteDiscount
                            id={discount.id}
                            onDelete={() => {
                              setDiscounts(
                                discounts.filter((d) => d.id !== discount.id)
                              );
                            }}
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
              containerClassName="flex items-center justify-end mt-5 space-x-1"
              pageClassName="px-3 py-1 rounded hover:bg-gray-200"
              activeClassName="bg-customOrange-lightOrange text-primary"
              previousLabel={<ChevronLeft className="w-4 h-4" />}
              nextLabel={<ChevronRight className="w-4 h-4" />}
              previousClassName={`px-3 py-1 rounded ${
                pagination.current_page === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
              nextClassName={`px-3 py-1 rounded ${
                pagination.current_page === pagination.total_pages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
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