import { useEffect, useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteCategory from "../Delete Category/DeleteCategory";
import { ClipLoader } from "react-spinners";
import { fetchCategories } from "../../ApiServices/AllCategoriesApi";
import { Helmet } from "react-helmet";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
function AllCategory() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
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
  return (
    <div className="bg-gray-100 p-4 h-[89vh] pt-5">
      <Helmet>
        <title>
          {t("cats")} | {t("vertex")}
        </title>
      </Helmet>
      <section className="bg-white p-5 rounded-md mb-3">
        <p className="text-gray-400 text-13">{t("catHead")}</p>
        <h1 className="font-bold text-17 mt-2">{t("cats")}</h1>
      </section>
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
        {error ? (
          <div className="text-red-500 text-center mt-10">{t("error")}</div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">{t("noData")}</div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-t border-b text-left rtl:text-right w-12">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                        aria-label="Select all categories"
                      />
                    </th>
                    <th className="px-6 py-3 text-left border w-500px">
                      <p className="flex justify-between items-center">
                        {t("category")}
                      </p>
                    </th>
                    <th className="px-6 py-3 text-left border w-500px">
                      <p className="flex justify-between items-center">
                        {t("type")}
                      </p>
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
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label={`Select ${category.name}`}
                          />
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
            {/* Pagination */}
            <ReactPaginate
              pageCount={Math.ceil(filteredCategories.length / itemsPerPage)}
              onPageChange={({ selected }) => paginate(selected + 1)}
              containerClassName="flex items-center justify-end mt-5 text-gray-400 text-14"
              pageClassName="mx-1 px-3 py-1 rounded"
              activeClassName="bg-customOrange-lightOrange text-primary"
              previousLabel={
                isRTL ? (
                  <ChevronRight className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-center text-primary" />
                )
              }
              nextLabel={
                isRTL ? (
                  <ChevronLeft className="w-5 h-5 text-center text-primary" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-primary" />
                )
              }
              previousClassName="mx-1 px-1 py-1 font-bold text-primary text-18 "
              nextClassName="mx-1 px-1 py-1 font-bold text-primary text-18"
            />
          </>
        )}
      </section>
    </div>
  );
}
export default AllCategory;