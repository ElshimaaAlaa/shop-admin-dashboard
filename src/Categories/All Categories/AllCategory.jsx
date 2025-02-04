import axios from "axios";
import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteCategory from "../Delete Category/DeleteCategory";
import { ClipLoader } from "react-spinners";

function AllCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://demo.vrtex.duckdns.org/api/shop/categories",
          {
            headers: {
              Authorization:
                "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990",
            },
          }
        );

        if (response.status === 200) {
          setCategories(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories(); // Call function to fetch categories
  }, []);

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
    window.location.reload();
  };

  return (
    <div className="bg-lightgray p-10 min-h-screen">
      <h1 className="font-bold mb-3 p-2" style={{ fontSize: "20px" }}>
        Categories
      </h1>
      <div className="flex justify-between items-center gap-5 bg-white p-4 rounded-3xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="font-bold w-full pl-10 pr-4 py-3 bg-muted/50 rounded text-sm focus:outline-none border border-gray-200 bg-lightgray"
          />
        </div>
        <div
          className="flex gap-3 bg-primary text-white font-bold p-3 rounded w-52 cursor-pointer"
          onClick={() => navigate("/addCategory")}
        >
          <div className="bg-white text-primary font-bold rounded ">
            <Plus className="p-1 font-bold" />
          </div>
          <p>Add Category</p>
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
              <th className="px-3 py-3 border border-gray-200 text-left w-12">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
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
              <th className="px-6 py-3 border border-gray-200 text-left">
                <p className="flex justify-between items-center">
                  Stock
                  <img
                    src="/assets/images/sort-amount-down_svgrepo.com.png"
                    alt=""
                    className="w-6 h-6 cursor-pointer"
                  />
                </p>
              </th>
              <th className="px-6 py-3 border border-gray-200 text-left w-5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-3 py-3 border border-gray-200">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
                </td>
                <td
                  className="flex gap-3 px-6 py-3 border border-gray-200"
                  // onClick={() => navigate("/ViewCategory")}
                >
                  <img
                    src={category.image}
                    alt="category-image"
                    className="w-7 h-7 object-cover rounded-full"
                  />
                  {category.name}
                </td>
                <td className="px-6 py-3 border border-gray-200">
                  {category.stock || 0}
                </td>
                <td className="px-6 py-3 border border-gray-200 w-10">
                  <div className="flex items-center gap-1">
                    <button
                      className="h-6 w-6 p-1 me-2"
                      onClick={() => navigate("/EditCategory")}
                    >
                      <Pencil className="h-4 w-4 text-[#E6A86C]" />
                    </button>
                    <DeleteCategory
                      categoryId={category.id}
                      id={category.id}
                      onDelete={handleDeleteCategory}
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

export default AllCategory;