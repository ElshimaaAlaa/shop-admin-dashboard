import React, { useEffect, useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteCategory from "../Delete Category/DeleteCategory";
import { ClipLoader } from "react-spinners";
import { fetchCategories } from "../../ApiServices/AllCategoriesApi";
import { Helmet } from "react-helmet";
import { AiFillEdit } from "react-icons/ai";

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

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredCategories, indexOfFirstItem, indexOfLastItem]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="bg-lightgray p-10 h-115vh">
      <Helmet>
        <title>All Categories - VERTEX</title>
      </Helmet>
      <div className="bg-white p-5 rounded-md mb-5">
        <h1 className="font-bold text-xl">Categories</h1>
      </div>
      <div className="bg-white p-5 rounded-md">
        <div className="flex justify-between items-center gap-5 bg-white mb-10 rounded-md">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
              color="#E0A75E"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted/50 rounded-md text-sm focus:outline-none border border-gray-200 bg-lightgray"
            />
          </div>
          <div
            className="flex gap-3 bg-primary text-white font-bold p-3 rounded-md w-60 cursor-pointer"
            onClick={() => navigate("/Home/addCategory")}
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
        ) : isLoading ? (
          <div className="text-gray-600 text-center font-bold mt-10">
            <ClipLoader color="#E0A75E" />
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
                        aria-label="Select category"
                      />
                    </th>
                    <th className="px-6 py-3 text-left border">
                      <p className="flex justify-between items-center">
                        Category
                        <img
                          src="/assets/images/style=stroke.png"
                          alt=""
                          className="w-4 h-4 cursor-pointer"
                        />
                      </p>
                    </th>
                    <th className="px-6 py-3 text-left w-5 border-t border-b">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((category) => (
                    <tr key={category.id}>
                      <td className="px-3 py-3 border">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select category"
                        />
                      </td>
                      <td className="flex gap-3 px-6 py-3 border-t">
                        <img
                          src={category.image || "/path/to/default-image.png"}
                          alt="category"
                          className="w-7 h-7 object-cover rounded-full"
                          onError={(e) => {
                            e.target.src = "/path/to/default-image.png";
                          }}
                        />
                        {category.name}
                      </td>
                      <td className="px-6 py-3 w-10 border-t border-l">
                        <div className="flex items-center gap-1">
                          <button
                            className="h-6 w-6 p-1 me-2"
                            aria-label="Edit category"
                            onClick={() =>
                              navigate(`/Home/editCategory/${category.id}`, {
                                state: category,
                              })
                            }
                          >
                            <AiFillEdit size={20} className="text-[#E6A86C]" />
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
            </div>
            {/* Pagination */}
            <ReactPaginate
              pageCount={Math.ceil(filteredCategories.length / itemsPerPage)}
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
    </div>
  );
}
export default AllCategory;