import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
          url: "https://demo.vrtex.duckdns.org/api/products?stock=out_of_stock&per_page=3&page=2",
          method: "GET",
          headers: {
            Accept: "application/json",
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
    // fetchProducts();
  }, []);

  return (
    <div className="bg-lightgray p-10">
      <h1 className="font-bold text-2xl mb-3 p-2">Products</h1>
      <div className="flex justify-between items-center gap-5 bg-white p-4 rounded">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="font-bold w-full pl-10 pr-4 py-3 bg-gray-100 rounded text-sm focus:outline-none border border-gray-200"
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
          Loading...
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
                Category
              </th>
              <th className="px-6 py-3 border border-gray-200 text-left">
                Price
              </th>
              <th className="px-6 py-3 border border-gray-200 text-left">
                Stock
              </th>
              <th className="px-6 py-3 border border-gray-200 text-left">
                Colors
              </th>
              <th className="px-6 py-3 border border-gray-200 text-left w-5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-3 py-3 border border-gray-200 w-5">
                  <input type="checkbox" className="form-checkbox h-4 w-4" />
                </td>
                <td
                  className="flex gap-3 px-6 py-3 border border-gray-200"
                  onClick={() => navigate("/ViewProduct")}
                >
                  <img
                    src={product.image}
                    alt="product-image"
                    className="w-6 h-6 object-cover"
                  />
                  {product.name}
                </td>
                <td className="px-6 py-3 border border-gray-200">
                  {product.category}
                </td>
                <td className="px-6 py-3 border border-gray-200">
                  {product.price}
                </td>
                <td className="px-6 py-3 border border-gray-200">
                  {product.stock}
                </td>
                <td className="px-6 py-3 border border-gray-200">
                  {product.colors?.join(", ") || "N/A"}
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
