import React, { useEffect, useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { Search, Plus, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteProduct from "../Delete Product/DeleteProduct";
import { ClipLoader } from "react-spinners";
import { fetchProducts } from "../../ApiServices/AllProuctsApi";
import { Helmet } from "react-helmet";
function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
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
    getProducts(); // Call function to fetch categories
  }, []);

  const handleDeleteProduct = (productId) => {
    setProducts((prevCategories) =>
      prevCategories.filter((product) => product.id !== productId)
    );
  };
  // Filter categories based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        <title>All Products | VERTEX</title>
      </Helmet>
      <h1 className="font-bold mb-3 p-2 text-xl">Products</h1>
      <div className="flex justify-between items-center gap-5 bg-white p-4 rounded-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="font-bold w-full pl-10 pr-4 py-3 bg-muted/50 rounded-md text-sm focus:outline-none border border-gray-200 bg-lightgray"
          />
        </div>
        <div
          className="flex gap-3 bg-primary text-white font-bold p-3 rounded-md w-52 cursor-pointer"
          onClick={() => navigate("/Home/addProduct")}
        >
          <div className="bg-white text-primary font-bold rounded ">
            <Plus className="p-1 font-bold" />
          </div>
          <p>Add Product</p>
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
          <table className="bg-white min-w-full table border-collapse border-1 mt-8 rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="flex items-center gap-4 px-3 py-3 border-gray-200 text-left">
                  <input type="checkbox" className="form-checkbox h-4 w-4 me-3" />
                  <p>Product</p>
                </th>
                <th className="px-6 py-3 border border-gray-200 text-left">
                  <p className="flex items-center justify-between">
                    Category
                    <img
                      src="/assets/images/style=stroke.png"
                      alt=""
                      className="w-4 h-4 cursor-pointer"
                    />
                  </p>
                </th>
                <th className="px-6 py-3 border border-gray-200 text-left">
                  <p className="flex items-center justify-between">
                    Price
                    <img
                      src="/assets/images/sort-amount-down_svgrepo.com.png"
                      alt=""
                      className="w-5 h-5 cursor-pointer"
                    />
                  </p>
                </th>
                <th className="px-6 py-3 border border-gray-200 text-left">
                  <p className="flex items-center justify-between">
                    Stock
                    <img
                      src="/assets/images/sort-amount-down_svgrepo.com.png"
                      alt=""
                      className="w-5 h-5 cursor-pointer"
                    />
                  </p>
                </th>
                <th className="px-6 py-3 border border-gray-200 text-left">
                  <p className="flex items-center justify-between">
                    Colors
                    <img
                      src="/assets/images/style=stroke.png"
                      alt=""
                      className="w-4 h-4 cursor-pointer"
                    />
                  </p>
                </th>
                <th className="px-6 py-3  border-gray-200 text-left w-5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product) => (
                <tr key={product.id}>
                  <td className="px-3 py-3 border border-gray-200 cursor-pointer" onClick={()=>navigate(`/Home/products/${product.id}`)}>
                    <p className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-4 me-3"
                      />
                      <img
                        src={product.images[0].src}
                        alt={product.name}
                        className="w-7 h-7 object-cover rounded-full"
                      />
                      {product.name}
                    </p>
                  </td>
                  <td className="flex gap-3 px-6 py-3 border-t border-gray-200">
                    <img
                      src={product.category.image}
                      alt="category-image"
                      className="w-7 h-7 object-cover rounded-full"
                    />
                    {product.category.name}
                  </td>
                  <td className="px-6 py-3 border border-gray-200">
                    {product.price}
                  </td>
                  <td className="px-6 py-3 border border-gray-200">
                    {product.stock}
                  </td>
                  <td className="px-6 py-3 border border-gray-200">
                    {product.colors.map((color) => (
                      <div key={color.id} className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: color.code }}
                        />
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-3 border border-gray-200 ">
                    <div className="flex gap-4">
                      <button
                        className="h-6 w-6 p-1"
                        // onClick={() => navigate(`/EditProduct/${product.id}`)}
                      >
                        <Pencil className="h-4 w-4 text-[#E6A86C]" />
                      </button>
                      <DeleteProduct
                        productId={product.id}
                        id={product.id}
                        onDelete={handleDeleteProduct}
                      />
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
export default AllProducts;