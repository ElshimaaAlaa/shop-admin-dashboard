import React, { useEffect, useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteProduct from "../Delete Product/DeleteProduct";
import { ClipLoader } from "react-spinners";
import { fetchProducts } from "../../ApiServices/AllProuctsApi";
import { Helmet } from "react-helmet";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    count: 0,
    per_page: 10,
    current_page: 1,
    total_pages: 1,
    next_page_url: null,
    prev_page_url: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetchProducts(currentPage);
        if (Array.isArray(response)) {
          setProducts(response);
          setPagination({
            total: response.length,
            count: response.length,
            per_page: 10,
            current_page: 1,
            total_pages: Math.ceil(response.length / 10),
            next_page_url: null,
            prev_page_url: null
          });
        } else if (response?.data) {
          setProducts(response.data);
          setPagination(response.pagination || {
            total: response.data.length,
            count: response.data.length,
            per_page: 10,
            current_page: 1,
            total_pages: Math.ceil(response.data.length / 10),
            next_page_url: null,
            prev_page_url: null
          });
        } else {
          console.warn("Unexpected API response structure:", response);
          setProducts([]);
          setPagination({
            total: 0,
            count: 0,
            per_page: 10,
            current_page: 1,
            total_pages: 1,
            next_page_url: null,
            prev_page_url: null
          });
        }
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error);
        setProducts([]);
        setPagination({
          total: 0,
          count: 0,
          per_page: 10,
          current_page: 1,
          total_pages: 1,
          next_page_url: null,
          prev_page_url: null
        });
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [currentPage]);

  const handleDeleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    setPagination(prev => ({
      ...prev,
      total: prev.total - 1,
      count: prev.count - 1
    }));
  };

  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    return products.filter(product => 
      product?.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (pagination.current_page - 1) * pagination.per_page;
    const endIndex = startIndex + pagination.per_page;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, pagination]);

  return (
    <div className="bg-gray-100 min-h-screen mx-10 pt-5">
      <Helmet>
        <title>All Products | VERTEX</title>
      </Helmet>
      <h1 className="font-bold text-17 bg-white mb-3 p-4 rounded-md">
        Products
      </h1>
      <div className="bg-white p-5 rounded-md">
        <SearchBar
          onclick={() => navigate("/Dashboard/addProduct")}
          value={searchQuery}
          onchange={(e) => setSearchQuery(e.target.value)}
          text={"Add New Product"}
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
        />
        
        {error ? (
          <div className="text-red-500 text-center mt-10">
            Failed to fetch data. Please try again.
          </div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
            <p className="mt-2">Loading Products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery ? "No products match your search." : "No products found."}
          </div>
        ) : (
          <>
            <div className="border overflow-hidden rounded-md mt-5">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="flex items-center gap-4 px-3 py-3 text-left border-r w-300">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 me-3"
                      />
                      <p>Product</p>
                    </th>
                    <th className="px-6 py-3 text-left w-250">Category</th>
                    <th className="px-6 py-3 text-left border-r border-l w-250">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left border-r w-250">Stock</th>
                    <th className="px-6 py-3 text-left border-r w-32">Colors</th>
                    <th className="px-6 py-3 border-gray-200 text-left w-5">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product) => (
                    <tr key={product.id}>
                      <td
                        className="px-3 py-3 text-15 cursor-pointer border-t border-r w-250 text-gray-600"
                        onClick={() => navigate(`/Dashboard/products/${product.id}`)}
                      >
                        <p className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-4 me-3"
                          />
                          <img
                            src={
                              product.images?.[0]?.src || "/assets/images/default-product.png"
                            }
                            alt={product.name}
                            className="w-7 h-7 object-cover rounded-full"
                          />
                          {product.name}
                        </p>
                      </td>
                      <td className="flex gap-3 px-6 py-3 text-15 border-gray-200 border-t border-r w-250 text-gray-600">
                        <img
                          src={product.category?.image || "/assets/images/default-category.png"}
                          alt="category-image"
                          className="w-7 h-7 object-cover rounded-full"
                        />
                        {product.category?.name}
                      </td>
                      <td className="px-6 py-3 text-15 border-t border-r w-250 text-gray-600">
                        {product.price?.toFixed(2) || "0.00"} $
                      </td>
                      <td className="px-6 py-3 text-15 border-t border-r w-250 text-gray-600">
                        {product.stock}
                      </td>
                      <td
                        className="px-6 py-3 border-t border-r w-250 cursor-pointer"
                        onClick={() => navigate(`/Dashboard/products/${product.id}`)}
                      >
                        <div className="flex items-center gap-1">
                          {product.colors?.slice(0, 4).map((color) => (
                            <div
                              key={color.id || color.code}
                              className="w-8 h-8 rounded-full -ms-4"
                              style={{ backgroundColor: color.code }}
                            />
                          ))}
                          {product.colors?.length > 4 && (
                            <div className="w-8 h-8 font-bold flex items-center justify-center rounded-full bg-gray-200 text-13 -ms-4">
                              +{product.colors.length - 4}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3 border-t">
                        <div className="flex items-center">
                          <button
                            className="p-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/Dashboard/EditProduct/${product.id}`, {
                                state: { product },
                              });
                            }}
                          >
                            <img
                              src="/assets/svgs/editIcon.svg"
                              alt="edit product"
                              className="w-7"
                            />
                          </button>
                          <DeleteProduct
                            id={product.id}
                            onDelete={handleDeleteProduct}
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
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              forcePage={pagination.current_page - 1}
              containerClassName="flex items-center justify-end mt-5 text-gray-500"
              pageClassName="mx-1 px-3 py-1 rounded"
              activeClassName="bg-customOrange-lightOrange text-primary"
              previousLabel={<ChevronLeft className="w-4 h-4 text-center" />}
              nextLabel={<ChevronRight className="w-4 h-4" />}
              previousClassName={`mx-1 px-3 py-1 font-bold text-primary text-18 ${
                !pagination.prev_page_url ? "opacity-50 cursor-not-allowed" : ""
              }`}
              nextClassName={`mx-1 px-3 py-1 font-bold text-primary text-18 ${
                !pagination.next_page_url ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </>
        )}
      </div>
    </div>
  );
}
export default AllProducts;