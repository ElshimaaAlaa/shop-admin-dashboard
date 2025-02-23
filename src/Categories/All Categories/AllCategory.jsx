import React, { useEffect, useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteCategory from "../Delete Category/DeleteCategory";
import { ClipLoader } from "react-spinners";
import { fetchCategories } from "../../ApiServices/AllCategoriesApi";
import { Helmet } from "react-helmet";
import { AiFillEdit } from "react-icons/ai";
import SearchBar from "../../Components/Search Bar/SearchBar";

function AllCategory() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCategories();
  }, []);

  const handleDeleteCategory = (categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredCategories, indexOfFirstItem, indexOfLastItem]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getTypeStyles = (typeName) => {
    let bgColor = "";
    let textColor = "";
    let dotColor = "";

    if (typeName === "Main") {
      bgColor = "bg-lightGreen";
      textColor = "text-green";
      dotColor = "bg-green";
    } else if (typeName === "Both") {
      bgColor = "bg-lightBurgandy";
      textColor = "text-burgandy";
      dotColor = "bg-burgandy";
    }
    return { bgColor, textColor, dotColor };
  };

  return (
    <div className="bg-gray-100 p-4 md:p-10">
      <Helmet>
        <title>All Categories - VERTEX</title>
      </Helmet>
      <div className="bg-white p-5 rounded-md mb-5">
        <h1 className="font-bold text-xl">Categories</h1>
      </div>
      <div className="bg-white p-5 rounded-md">
        <SearchBar
          onclick={() => navigate("/Home/addCategory")}
          value={searchQuery}
          onchange={(e) => setSearchQuery(e.target.value)}
          text="Add New Category"
        />
        {error ? (
          <div className="text-red-500 text-center mt-10">
            Failed to fetch data. Please try again.
          </div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center  mt-10">
            <ClipLoader color="#E0A75E" />
            <p className="mt-2">Loading categories...</p>
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-t border-b text-left w-12">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                        aria-label="Select all categories"
                      />
                    </th>
                    <th className="px-6 py-3 text-left border w-500px">
                      <p className="flex justify-between items-center">
                        Category
                      </p>
                    </th>
                    <th className="px-6 py-3 text-left border w-500px">
                      <p className="flex justify-between items-center">Type</p>
                    </th>
                    <th className="px-6 py-3 text-left w-5 border-t border-b">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((category) => {
                    const { bgColor, textColor, dotColor } = getTypeStyles(
                      category.type_name
                    );
                    return (
                      <tr key={category.id}>
                        <td className="px-3 py-3 border">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label={`Select ${category.name}`}
                          />
                        </td>
                        <td className="flex gap-3 px-6 py-3 border-t text-customGray-grayText">
                          <img
                            src={category.image || "/path/to/default-image.png"}
                            alt={category.name}
                            className="w-7 h-7 object-cover rounded-full"
                          />
                          {category.name}
                        </td>
                        <td className="px-6 py-3 border-t border-l">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${bgColor}`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${dotColor}`}
                            ></span>
                            <span
                              className={`text-sm font-medium ${textColor}`}
                            >
                              {category.type_name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-3 w-10 border-t border-l">
                          <div className="flex items-center gap-1">
                            <button
                              className="h-6 w-6 p-1 me-2"
                              aria-label={`Edit ${category.name}`}
                              onClick={() =>
                                navigate(`/Home/editCategory/${category.id}`, {
                                  state: category,
                                })
                              }
                            >
                              <AiFillEdit
                                size={23}
                                className="text-[#E6A86C]"
                              />
                            </button>
                            <DeleteCategory
                              categoryId={category.id}
                              id={category.id}
                              onDelete={handleDeleteCategory}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <ReactPaginate
              pageCount={Math.ceil(filteredCategories.length / itemsPerPage)}
              onPageChange={({ selected }) => paginate(selected + 1)}
              containerClassName="flex items-center justify-end mt-5 text-gray-500"
              pageClassName="mx-1 px-3 py-1 rounded"
              activeClassName="bg-customOrange-lightOrange text-primary"
              previousLabel={<ChevronLeft className="w-4 h-4 text-center" />}
              nextLabel={<ChevronRight className="w-4 h-4" />}
              previousClassName="mx-1 px-3 py-1 font-bold text-primary text-18 "
              nextClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
            />
          </>
        )}
      </div>
    </div>
  );
}
export default AllCategory;