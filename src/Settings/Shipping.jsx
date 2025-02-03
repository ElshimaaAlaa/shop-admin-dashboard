import axios from "axios";
import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Shipping() {
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
            Authorization:
              "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990",
          },
        });
        if (response.status === 200) {
          console.log("success", discounts);
          setDiscounts(discounts.data.data);
          console.log(discounts.data.data);
        } else {
          console.error("Failed to fetch data: ");
        }
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error);
      } finally {
        setLoading(false);
      }
    };

    //fetchDiscounts(); //call function to fetch categories
  }, [discounts]);

  return (
    <div className="bg-lightgray p-10 min-h-screen">
      <h1 className="font-bold mb-3 p-2" style={{ fontSize: "20px" }}>
        Shipping Providers
      </h1>
      <div className="bg-white p-4 rounded mb-5">
        <h1>5</h1>
        <img src="/assets/images/shipping-fast-solid_svgrepo.com.png" alt=""/>
        <p>Shipping Providers</p>
      </div>
      <div className="flex justify-between items-center gap-5 bg-white p-4 rounded">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="font-bold w-full pl-10 pr-4 py-3 bg-muted/50 rounded text-sm focus:outline-none border border-gray-200 bg-lightgray"
          />
        </div>
        <div className="flex items-center gap-5 w-80">
          {/* <div className="bg-customOrange-mediumOrange rounded p-3 font-bold cursor-pointer flex items-center gap-3">
            <img
              src="/assets/images/date-range_svgrepo.com.png"
              alt=""
              className="w-5 h-5"
            />
            <p className="text-primary">Select Date</p>
          </div> */}
          <div
            className="flex gap-3 bg-primary text-white font-bold p-3 rounded  cursor-pointer"
            onClick={() => navigate("/AddDiscounts")}
          >
            <div className="bg-white text-primary font-bold  rounded ">
              <Plus className="p-1 font-bold" />
            </div>
            <p>Add Shipping Provider</p>
          </div>
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
              <th className="px-3 py-3 border border-gray-200 text-left w-5">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
                {/* <p>Product</p> */}
              </th>
              <th className="px-6 py-3 border border-gray-200 text-left">
                <p className="flex justify-between items-center">
                Shipping Providers
                  <img
                    src="/assets/images/sort-amount-down_svgrepo.com.png"
                    alt=""
                    className="w-6 h-6 cursor-pointer"
                  />
                </p>
              </th>
              {/* <th className="px-6 py-3 border border-gray-200 text-left">
                <p className="flex justify-between items-center">
                  Discount Rate
                  <img
                    src="/assets/images/sort-amount-down_svgrepo.com.png"
                    alt=""
                    className="w-6 h-6 cursor-pointer"
                  />
                </p>
              </th> */}
              {/* <th className="px-6 py-3 border border-gray-200 text-left">
                <p className="flex justify-between items-center">
                  End Date
                  <img
                    src="/assets/images/sort-amount-down_svgrepo.com.png"
                    alt=""
                    className="w-6 h-6 cursor-pointer"
                  />
                </p>
              </th> */}
              {/* <th className="px-6 py-3 border border-gray-200 text-left">
                <p className="flex justify-between items-center">
                  Colors
                  <img
                    src="/assets/images/style=stroke.png"
                    alt=""
                    className="w-4 h-4 cursor-pointer "
                  />
                </p>
              </th> */}
              <th className="px-6 py-3 border border-gray-200 text-left w-5">
                Actions
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
                <td className="px-6 py-3 border border-gray-200">
                  {category.stock}
                </td>
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
    </div>
  );
}
export default Shipping;
