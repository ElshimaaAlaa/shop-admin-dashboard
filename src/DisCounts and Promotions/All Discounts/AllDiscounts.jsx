import React, { useEffect, useState, useMemo } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { fetchProducts } from "../../ApiServices/AllProuctsApi";
import { ClipLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import DeleteDiscount from "./DeleteDiscount";
import EditDiscount from "./EditDiscount";

function AllDiscounts() {
  const [discount, setDiscount] = useState([]);
  const [isLoading, setiSLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();
  // Fetch data from API
  useEffect(() => {
    const fetchDiscounts = async () => {
      setiSLoading(true);
      try {
        const products = await fetchProducts();
        setDiscount(products);
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error);
      } finally {
        setiSLoading(false);
      }
    };
    fetchDiscounts();
  }, []);

  // Delete discount functionality
  const handleDeleteDiscount = (discountId) => {
    setDiscount((prevDiscount) =>
      prevDiscount.filter((discount) => discount.id !== discountId)
    );
  };
  // Search functionality
  const filteredProducts = discount.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProducts, indexOfFirstItem, indexOfLastItem]);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="bg-lightgray p-10 min-h-screen">
      <Helmet>
        <title>Promotions & Discounts - VERTEX</title>
      </Helmet>
      <h1 className="font-bold mb-3 p-2 text-xl">Promotions & Discounts</h1>
      <div className="flex justify-between items-center gap-5 bg-white p-4 rounded-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="font-bold w-full pl-10 pr-4 py-3 bg-muted/50 rounded text-sm focus:outline-none border border-gray-200 bg-lightgray"
          />
        </div>
        <div className="flex items-center gap-5 w-96">
          <div className="bg-customOrange-mediumOrange rounded p-3 font-bold cursor-pointer flex items-center gap-3">
            <img
              src="/assets/images/date-range_svgrepo.com.png"
              alt=""
              className="w-5 h-5"
            />
            <p className="text-primary">Select Date</p>
          </div>
          <div
            className="flex gap-3 bg-primary text-white font-bold p-3 rounded  cursor-pointer"
            onClick={() => navigate("/AddDiscounts")}
          >
            <div className="bg-white text-primary font-bold  rounded ">
              <Plus className="p-1 font-bold" />
            </div>
            <p>Add</p>
          </div>
        </div>
      </div>
      {error ? (
        <div className="text-red-500 text-center mt-10 font-bold">
          Failed to fetch data. Please try again.
        </div>
      ) : isLoading ? (
        <div className="text-gray-600 text-center font-bold mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : (
        <>
          <table className="bg-white min-w-full table border-collapse mt-8">
            <thead>
              <tr>
                <th className="px-3 py-3 border border-gray-200 text-left flex items-center gap-5">
                  <input type="checkbox" className="form-checkbox h-4 w-4" />
                  <p>Product</p>
                </th>
                <th className="px-6 py-3 border border-gray-200 text-left">
                  <p className="flex justify-between items-center">
                    Price
                    <img
                      src="/assets/images/sort-amount-down_svgrepo.com.png"
                      alt=""
                      className="w-6 h-6 cursor-pointer"
                    />
                  </p>
                </th>
                <th className="px-6 py-3 border border-gray-200 text-left">
                  <p className="flex justify-between items-center">
                    Discount Rate
                    <img
                      src="/assets/images/sort-amount-down_svgrepo.com.png"
                      alt=""
                      className="w-6 h-6 cursor-pointer"
                    />
                  </p>
                </th>
                <th className="px-6 py-3 border border-gray-200 text-left">
                  <p className="flex justify-between items-center">
                    End Date
                    <img
                      src="/assets/images/sort-amount-down_svgrepo.com.png"
                      alt=""
                      className="w-6 h-6 cursor-pointer"
                    />
                  </p>
                </th>
                <th className="px-6 py-3 border border-gray-200 text-left">
                  <p className="flex justify-between items-center">
                    Colors
                    <img
                      src="/assets/images/style=stroke.png"
                      alt=""
                      className="w-4 h-4 cursor-pointer "
                    />
                  </p>
                </th>
                <th className="px-6 py-3 border border-gray-200 text-left w-5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product) => (
                <tr key={product.id}>
                  <td className="px-3 py-3 border border-gray-200">
                    <p className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                      />
                      <span></span>
                      <img
                        src={
                          product.images[0].src || "/assets/images/product.png"
                        }
                        alt={product.name}
                        className="w-6 h-6 object-cover rounded-full"
                      />
                      {product.name}
                    </p>
                  </td>
                  <td className="flex gap-3 px-6 py-3 border border-gray-200 cursor-pointer">
                    {product.price}
                  </td>
                  <td className="px-6 py-3 border border-gray-200">
                    {product.discount_percentage}
                  </td>
                  <td className="px-6 py-3 border border-gray-200">
                    {product.discount_expire_at}
                  </td>
                  <td className="px-6 py-3 border border-gray-200">
                    {product.colors.map((color) => (
                      <div key={color.id} className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: color.code }}
                        />
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-3 border border-gray-200 w-10">
                    <div className="flex items-center gap-1">
                      <EditDiscount />
                      <DeleteDiscount onDelete={handleDeleteDiscount} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <ReactPaginate
            pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
            onPageChange={({ selected }) => paginate(selected + 1)}
            containerClassName="flex items-center justify-end mt-5 text-gray-500"
            pageClassName="mx-1 px-3 py-1 rounded "
            activeClassName="bg-customOrange-lightOrange text-primary"
            previousLabel={<ChevronLeft className="w-4 h-4 text-center" />}
            nextLabel={<ChevronRight className="w-4 h-4" />}
            previousClassName="mx-1 px-3 py-1 rounded bg-gray-100"
            nextClassName="mx-1 px-3 py-1 rounded bg-gray-100"
          />
        </>
      )}
    </div>
  );
}
export default AllDiscounts;
