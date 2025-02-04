import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import DeleteProduct from "../Delete Product/DeleteProduct";

function AllProducts() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios({
          url: `https://demo.vrtex.duckdns.org/api/shop/products`,
          method: "GET",
          headers: {
            "Accept-Language": "ar",
            Authorization:
              "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990",
          },
        });

        console.log("API Response:", response.data);
        if (response.status === 200) {
          setProducts(response.data.data);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    window.location.reload();
  };

  return (
    <div className="bg-lightgray p-10 min-h-screen">
      <h1 className="font-bold mb-3 p-2" style={{ fontSize: "20px" }}>
        Products
      </h1>
      <div className="flex justify-between items-center gap-5 bg-white p-4 rounded">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="font-bold w-full pl-10 pr-4 py-3 bg-gray-50 rounded text-sm focus:outline-none border border-gray-200"
          />
        </div>
        <div
          className="flex gap-3 bg-primary text-white font-bold p-3 rounded w-52 cursor-pointer"
          onClick={() => navigate("/AddProduct")}
        >
          <div className="bg-white text-primary font-bold rounded">
            <Plus className="p-1 font-bold" />
          </div>
          <p>Add Product</p>
        </div>
      </div>
      {error ? (
        <div className="text-red-500 text-center mt-10 font-bold">
          Failed to fetch data. Please try again.
        </div>
      ) : loading ? (
        <div className="text-gray-600 text-center font-bold mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : (
        <table className="bg-white min-w-full table border-collapse mt-8">
          <thead>
            <tr>
              <th className="flex items-center gap-4 px-3 py-3 border border-gray-200 text-left">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
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
              <th className="px-6 py-3 border border-gray-200 text-left w-5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-3 py-3 border border-gray-200">
                  <p className="flex items-center gap-3">
                    <input type="checkbox" className="form-checkbox h-5 w-4" />
                    <img
                      src={product.images[0].src}
                      alt={product.name}
                      className="w-7 h-7 object-cover rounded-full"
                    />
                    {product.name}
                  </p>
                </td>
                <td className="flex gap-3 px-6 py-3 border border-gray-200">
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
                    onClick={() => navigate(`/EditProduct/${product.id}`)}
                  >
                    <Pencil className="h-4 w-4 text-[#E6A86C]" />
                  </button>
                  <DeleteProduct
                    categoryId={product.id}
                    id={product.id}
                    onDelete={handleDeleteProduct}
                  />
                  </div>
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default AllProducts;