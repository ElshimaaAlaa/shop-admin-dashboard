import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DeleteCategory from "../Delete Category/DeleteCategory";
import { ClipLoader } from "react-spinners";
import { fetchCategories } from "../../ApiServices/AllCategoriesApi";
import { Helmet } from "react-helmet";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BsSortDown } from "react-icons/bs";
import Pagination from "../../Components/Pagination/Pagination";
import DeleteMultipleCategories from "./DeleteMultipleCategories";
import Header from "../../Components/Header/Header";
function AllCategory() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState(null);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTypeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.filter(
        (category) => category.id !== categoryId
      );
      if (
        updatedCategories.length <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
      return updatedCategories;
    });
    setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
  };
  const handleTypeFilterSelect = (type) => {
    setTypeFilter(type);
    setShowTypeDropdown(false);
    setCurrentPage(1);
  };

  const clearTypeFilter = () => {
    setTypeFilter(null);
    setCurrentPage(1);
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch = category.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType = typeFilter ? category.type_name === typeFilter : true;
      return matchesSearch && matchesType;
    });
  }, [categories, searchQuery, typeFilter]);

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
    } else if (typeName === "Size") {
      bgColor = "bg-lightBlue";
      textColor = "text-blue";
      dotColor = "bg-blue";
    } else if (typeName === "Color") {
      bgColor = "bg-lightBurble";
      textColor = "text-purble";
      dotColor = "bg-purble";
    }
    return { bgColor, textColor, dotColor };
  };

  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  // Get unique category types for the dropdown
  const uniqueTypes = useMemo(() => {
    const types = new Set(categories.map((category) => category.type_name));
    return Array.from(types).sort();
  }, [categories]);

  // Handle select all categories
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allCategoryIds = currentItems.map((category) => category.id);
      setSelectedCategories(allCategoryIds);
    } else {
      setSelectedCategories([]);
    }
  };

  // Handle select individual category
  const handleSelectCategory = (categoryId, isChecked) => {
    if (isChecked) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
      setSelectAll(false);
    }
  };

  // Handle delete selected categories
  const handleDeleteSelected = () => {
    setShowDeleteAllModal(true);
  };
  useEffect(() => {
    if (showDeleteAllModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showDeleteAllModal]);
  return (
    <div className="bg-gray-100 min-h-[90vh] p-4 pt-5">
      <Helmet>
        <title>
          {t("cats")} | {t("vertex")}
        </title>
      </Helmet>
      <Header subtitle={t("catHead")} title={t("cats")} className="mb-3" />
      <section className="bg-white p-5 rounded-md">
        <SearchBar
          onclick={() => navigate("/Dashboard/addCategory")}
          value={searchQuery}
          onchange={(e) => setSearchQuery(e.target.value)}
          text={t("addNewCat")}
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
        />

        {selectedCategories.length > 0 && (
          <div className="flex justify-between items-center bg-gray-50 p-3 mb-3 rounded">
            <span>
              {t("selecting")}{" "}
              <span className="font-bold text-primary">
                {selectedCategories.length}
              </span>{" "}
              {t("items")}
            </span>
            <button
              onClick={handleDeleteSelected}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : (
                t("deleteAll")
              )}
            </button>
          </div>
        )}

        {error ? (
          <div className="text-red-500 text-center mt-10">{t("error")}</div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : categories.length === 0 ? (
          <p className="text-gray-400 text-16 text-center mt-10">
            {t("noData")}
          </p>
        ) : filteredCategories.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {t("noMatchResults")}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg ">
              <table className="bg-white min-w-full table relative">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-t border-b text-left rtl:text-right w-12">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="hidden peer"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          aria-label="Select all categories"
                        />
                        <span
                          className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                            selectAll
                              ? "border-primary bg-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {selectAll && (
                            <svg
                              className="w-3 h-3 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                            </svg>
                          )}
                        </span>
                      </label>
                    </th>
                    <th className="px-6 py-3 text-left border w-500px">
                      <p className="flex justify-between items-center">
                        {t("category")}
                      </p>
                    </th>
                    <th className="px-6 py-3 text-left border w-500px">
                      <div className="flex items-center justify-between">
                        <p>{t("type")}</p>
                        <div className="flex items-center gap-2">
                          {typeFilter && (
                            <button
                              onClick={clearTypeFilter}
                              className="text-primary text-13 flex items-center"
                              aria-label="Clear filter"
                            >
                              {t("clear")}
                            </button>
                          )}
                          <div ref={dropdownRef} className="">
                            <button
                              className={`rounded-md p-2 ${
                                typeFilter
                                  ? "bg-customOrange-lightOrange text-primary rounded-md"
                                  : "bg-customOrange-lightOrange text-primary"
                              }`}
                              onClick={() =>
                                setShowTypeDropdown(!showTypeDropdown)
                              }
                              aria-label="Filter by type"
                            >
                              <BsSortDown />
                            </button>
                            {showTypeDropdown && (
                              <div className="absolute ltr:right-36 rtl:left-36 mt-0.5 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                {uniqueTypes.map((type) => (
                                  <div
                                    key={type}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-light text-14 rtl:text-right"
                                    onClick={() => handleTypeFilterSelect(type)}
                                  >
                                    {type}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left w-5 border-t border-b">
                      {t("actions")}
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
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="hidden peer"
                              checked={selectedCategories.includes(category.id)}
                              onChange={(e) =>
                                handleSelectCategory(
                                  category.id,
                                  e.target.checked
                                )
                              }
                              aria-label={`Select ${category.name}`}
                            />
                            <span
                              className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                                selectedCategories.includes(category.id)
                                  ? "border-primary bg-primary"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedCategories.includes(category.id) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                </svg>
                              )}
                            </span>
                          </label>
                        </td>
                        <td className="flex gap-3 px-6 py-3 border-t text-gray-600">
                          <img
                            src={category.image || "/path/to/default-image.png"}
                            alt={category.name}
                            className="w-7 h-7 object-cover rounded-full"
                          />
                          {category.name}
                        </td>
                        <td className="px-6 py-3 border-t border-l rtl:border-r">
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
                        <td className="px-6 py-3 w-10 border-t border-l rtl:border-r">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              aria-label={`Edit ${category.name}`}
                              onClick={() =>
                                navigate(
                                  `/Dashboard/editCategory/${category.id}`,
                                  {
                                    state: category,
                                  }
                                )
                              }
                            >
                              <img
                                src="/assets/svgs/editIcon.svg"
                                alt="edit category"
                                className="w-6"
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
            <Pagination
              pageCount={Math.ceil(filteredCategories.length / itemsPerPage)}
              onPageChange={({ selected }) => paginate(selected + 1)}
              currentPage={currentPage}
              isRTL={isRTL}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
            />
          </>
        )}
        <DeleteMultipleCategories
          isOpen={showDeleteAllModal}
          onClose={() => setShowDeleteAllModal(false)}
          count={selectedCategories.length}
        />
      </section>
    </div>
  );
}
export default AllCategory;
