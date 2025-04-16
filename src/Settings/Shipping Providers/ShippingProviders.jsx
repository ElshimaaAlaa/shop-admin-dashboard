import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchShippingProviders } from "../../ApiServices/ShippingProviders";
import DeleteShipping from "./DeleteShipping";
import AddShippingProvider from "./AddShippingProvider";

function ShippingProviders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shippingData, setShippingData] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 1,
  });

  useEffect(() => {
    const getShippingProviders = async () => {
      setIsLoading(true);
      try {
        const response = await fetchShippingProviders(
          searchQuery,
          pagination.current_page,
          pagination.per_page
        );
        setShippingData(response.data || []);
        setPagination(
          response.pagination || {
            current_page: 1,
            per_page: 10,
            total: 0,
            total_pages: 1,
          }
        );
      } catch (error) {
        console.error("Error fetching shipping providers:", error);
        setError(true);
        setShippingData([]);
      } finally {
        setIsLoading(false);
      }
    };
    getShippingProviders();
  }, [searchQuery, pagination.current_page, pagination.per_page]);

  const handlePageClick = (event) => {
    setPagination((prev) => ({
      ...prev,
      current_page: event.selected + 1,
    }));
  };
  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen ">
      <Helmet>
        <title>Shipping Providers | vertex</title>
      </Helmet>
      <h1 className="font-bold rounded-md p-5 text-17 mx-10 bg-white mt-5">
        Shipping Providers
      </h1>
      <div className="bg-white rounded-md p-5 mx-10 my-3">
        <SearchBar
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
          text={"Add Shipping Provider"}
          onclick={() => setShowModal(true)}
          value={searchQuery}
          onchange={(e) => {
            setSearchQuery(e.target.value);
            setPagination((prev) => ({ ...prev, current_page: 1 }));
          }}
        />
        <AddShippingProvider
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
        {error ? (
          <div className="text-red-500 text-center mt-10">
            Failed to fetch data. Please try again.
          </div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : shippingData.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery
              ? "No shipping providers match your search."
              : "No shipping providers found."}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-t border-b text-left cursor-pointer">
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all categories"
                        />
                        Shipping Providers
                      </p>
                    </th>
                    <th className="px-6 py-3 border text-center w-12">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shippingData.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-3 border-t text-14 border-r cursor-pointer">
                        <p className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label="Select all categories"
                          />
                          {item.name}
                        </p>
                      </td>
                      <td className="text-center px-3 py-3">
                        <div className="flex justify-center items-center">
                          <DeleteShipping
                            id={item.id}
                            onDelete={() => {
                              setShippingData(
                                shippingData.filter((d) => d.id !== item.id)
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
            {pagination.total_pages > 1 && (
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default ShippingProviders;
