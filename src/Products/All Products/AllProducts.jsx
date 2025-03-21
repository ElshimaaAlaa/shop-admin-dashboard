import React, { useEffect, useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteProduct from "../Delete Product/DeleteProduct";
import { ClipLoader } from "react-spinners";
import { fetchProducts } from "../../ApiServices/AllProuctsApi";
import { Helmet } from "react-helmet";
import SearchBar from "../../Components/Search Bar/SearchBar";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== productId
      );

      // Check if the current page becomes empty after deletion
      const newTotalPages = Math.ceil(updatedProducts.length / itemsPerPage);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages); // Move to the last page
      }

      return updatedProducts;
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProducts, indexOfFirstItem, indexOfLastItem]);

  return (
    <div className="bg-gray-100 h-150vh mx-10 pt-5 ">
      <Helmet>
        <title>All Products | VERTEX</title>
      </Helmet>
      <h1 className="font-bold text-17 bg-white mb-3 p-4 rounded-md">
        Products
      </h1>
      <div className="bg-white p-5 rounded-md">
        <SearchBar
          onclick={() => navigate("/Home/addProduct")}
          value={searchQuery}
          onchange={(e) => setSearchQuery(e.target.value)}
          text={"Add New Product"}
        />
        {error ? (
          <div className="text-red-500 text-center mt-10 ">
            Failed to fetch data. Please try again.
          </div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center  mt-10">
            <ClipLoader color="#E0A75E" />
            <p className="mt-2">Loading Products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">No data found.</div>
        ) : (
          <div className="border overflow-hidden rounded-md mt-5">
            <table className="bg-white min-w-full table ">
              <thead>
                <tr>
                  <th className="flex items-center gap-4 px-3 py-3 text-left border-r w-300">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 me-3"
                    />
                    <p>Product</p>
                  </th>
                  <th className="px-6 py-3  text-left w-250">Category</th>
                  <th className="px-6 py-3  text-left border-r border-l w-250 ">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left border-r w-250">Stock</th>
                  <th className="px-6 py-3  text-left border-r w-32">Colors</th>
                  <th className="px-6 py-3  border-gray-200 text-left w-5">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product) => (
                  <tr key={product.id}>
                    <td
                      className="px-3 py-3 cursor-pointer border-t border-r w-250 text-customGray-grayText"
                      onClick={() => navigate(`/Home/products/${product.id}`)}
                    >
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-4 me-3"
                        />
                        <img
                          src={
                            product.images.length > 0
                              ? product.images[0].src
                              : "fallback-image-url"
                          }
                          alt={product.name}
                          className="w-7 h-7 object-cover rounded-full"
                        />

                        {product.name}
                      </p>
                    </td>
                    <td className="flex gap-3 px-6 py-3 border-gray-200 border-t border-r w-250 text-customGray-grayText">
                      <img
                        src={product.category.image}
                        alt="category-image"
                        className="w-7 h-7 object-cover rounded-full"
                      />
                      {product.category.name}
                    </td>
                    <td className="px-6 py-3 border-t border-r w-250 text-customGray-grayText">
                      {product.price}
                    </td>
                    <td className="px-6 py-3 border-t border-r w-250 text-customGray-grayText">
                      {product.stock}
                    </td>
                    <td
                      className="px-6 py-3 border-t border-r w-250 cursor-pointer"
                      onClick={() => navigate(`/Home/products/${product.id}`)}
                    >
                      <div className="flex items-center gap-1">
                        {product.colors.slice(0, 4).map((color) => (
                          <div
                            key={color.id}
                            className="w-8 h-8 rounded-full -ms-4"
                            style={{ backgroundColor: color.code }}
                          />
                        ))}
                        {product.colors.length > 4 && (
                          <div className="w-8 h-8 font-bold flex items-center justify-center rounded-full bg-gray-200 text-13 -ms-4">
                            +{product.colors.length - 4}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-3 border-t ">
                      <div className="flex items-center">
                        <button
                          className="p-1"
                          onClick={() =>
                            navigate(`/Home/EditProduct/${product.id}`, {
                              state: product,
                            })
                          }
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
        )}
        {/* Pagination */}
        <ReactPaginate
          pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1} // Force the current page to stay in sync
          containerClassName="flex items-center justify-end mt-5 text-gray-500"
          pageClassName="mx-1 px-3 py-1 rounded"
          activeClassName="bg-customOrange-lightOrange text-primary"
          previousLabel={<ChevronLeft className="w-4 h-4 text-center" />}
          nextLabel={<ChevronRight className="w-4 h-4" />}
          previousClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
          nextClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
        />
      </div>
    </div>
  );
}

export default AllProducts;