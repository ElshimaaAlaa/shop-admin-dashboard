import axios from "axios";
import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddDiscounts() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  
  // Fetch data from API
  useEffect(() => {
    const fetchDiscounts = async () => {
      setLoading(true);
      try {
        const response = await axios({
          url: "",
          method: "GET",
          headers: {
            Authorization: "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990",
          },
        });
        if (response.status === 200) {
          setDiscounts(response.data.data); // Ensure you set data correctly
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts(); // Call function to fetch discounts
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div className="bg-lightgray p-10 min-h-screen relative">
      <h1 className="font-bold mb-3 p-2" style={{ fontSize: "20px" }}>
        Add Discount
      </h1>
      <div className="flex justify-between items-center gap-5 bg-white p-4 rounded">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="font-bold w-full pl-10 pr-4 py-3 bg-muted/50 rounded text-sm focus:outline-none border border-gray-200 bg-lightgray"
          />
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
        <table className="bg-white min-w-full table-auto rounded border border-gray-100 border-collapse mt-8">
          <thead>
            <tr>
              <th className="px-3 py-3 border border-gray-200 text-left w-60">
                <div className="flex items-center gap-5">
                  <input type="checkbox" className="form-checkbox h-4 w-4" />
                  <p>Product</p>
                </div>
              </th>
              <th className="px-6 py-3 border border-gray-200 text-left">
                <p className="flex justify-between items-center">
                  Category
                  <img
                    src="/assets/images/style=stroke.png"
                    alt=""
                    className="w-4 h-4 cursor-pointer"
                  />
                </p>
              </th>
              <th className="px-6 py-3 border border-gray-200 text-left w-60">
                <p className="flex justify-between items-center">
                  Price
                  <img
                    src="/assets/images/sort-amount-down_svgrepo.com.png"
                    alt=""
                    className="w-6 h-6 cursor-pointer"
                  />
                </p>
              </th>
              <th className="px-6 py-3 border border-gray-200 text-left w-60">
                <p className="flex justify-between items-center">
                  Stock
                  <img
                    src="/assets/images/sort-amount-down_svgrepo.com.png"
                    alt=""
                    className="w-6 h-6 cursor-pointer"
                  />
                </p>
              </th>
              <th className="px-6 py-3 border border-gray-200 text-left w-60">
                <p className="flex justify-between items-center">
                  Colors
                  <img
                    src="/assets/images/style=stroke.png"
                    alt=""
                    className="w-4 h-4 cursor-pointer"
                  />
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((category) => (
              <tr key={category.id}>
                <td className="px-3 py-3 border border-gray-200">
                  <input type="checkbox" className="form-checkbox h-4 w-4" />
                </td>
                <td
                  className="flex gap-3 px-6 py-3 border border-gray-200 cursor-pointer"
                  onClick={() => navigate("/ViewCategory")}
                >
                  <img
                    src={category.image}
                    alt="category-image"
                    className="w-6 h-6 object-cover"
                  />
                  {category.name}
                </td>
                <td className="px-6 py-3 border border-gray-200">{category.stock}</td>
                <td className="px-6 py-3 border border-gray-200 w-10">
                  <div className="flex items-center gap-1">
                    <button
                      className="h-6 w-6 p-1"
                      onClick={() => navigate("/EditCategory")}
                    >
                      <Pencil className="h-4 w-4 text-[#E6A86C]" />
                    </button>
                    <button
                      className="h-6 w-6 p-1"
                      onClick={() => navigate("/deleteCategory")}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Footer buttons */}
      <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full absolute bottom-0 left-0">
        <button className="bg-gray-200 text-gray-500 font-bold p-3 w-32 rounded">
          Cancel
        </button>
        <button className="bg-primary text-white font-bold rounded p-3">
          Add Discount
        </button>
      </div>
    </div>
  );
}

export default AddDiscounts;
