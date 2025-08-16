import { useEffect, useState, useRef, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { fetchPromotions } from "../../ApiServices/Promotions";
import DeleteDiscount from "./DeleteDiscount";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BsSortDown } from "react-icons/bs";
import CustomCalendar from "../../Coupons/CustomCalendar";
import DeleteMultipleDiscounts from "./DeleteMultipleDiscounts";
import Pagination from "../../Components/Pagination/Pagination";
import Header from "../../Components/Header/Header";

function AllDiscounts() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar"
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  // Date filter states
  const [showStartDateFilter, setShowStartDateFilter] = useState(false);
  const [showEndDateFilter, setShowEndDateFilter] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const startDateFilterRef = useRef(null);
  const endDateFilterRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetchPromotions();
      setDiscounts(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [i18n.language]);

  // Close date pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        startDateFilterRef.current &&
        !startDateFilterRef.current.contains(event.target) &&
        !event.target.closest(".start-date-filter-button")
      ) {
        setShowStartDateFilter(false);
      }

      if (
        endDateFilterRef.current &&
        !endDateFilterRef.current.contains(event.target) &&
        !event.target.closest(".end-date-filter-button")
      ) {
        setShowEndDateFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteSuccess = (deletedId) => {
    setDiscounts((prev) =>
      prev.filter((discount) => discount.id !== deletedId)
    );
    setSelectedDiscounts((prev) => prev.filter((id) => id !== deletedId));
    fetchData();
  };

  const handleDeleteMultiple = () => {
    setDiscounts((prev) =>
      prev.filter((discount) => !selectedDiscounts.includes(discount.id))
    );
    setSelectedDiscounts([]);
    setSelectAll(false);
    setShowDeleteAllModal(false);
    fetchData();
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allDiscountIds = currentItems.map((discount) => discount.id);
      setSelectedDiscounts(allDiscountIds);
    } else {
      setSelectedDiscounts([]);
    }
  };

  const handleSelectDiscount = (discountId, isChecked) => {
    if (isChecked) {
      setSelectedDiscounts((prev) => [...prev, discountId]);
    } else {
      setSelectedDiscounts((prev) => prev.filter((id) => id !== discountId));
      setSelectAll(false);
    }
  };

  // Filter discounts based on search and date filters
  const filteredDiscounts = useMemo(() => {
    let result = discounts.filter((discount) =>
      discount.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply start date filter if selected
    if (selectedStartDate) {
      const startDate = new Date(selectedStartDate);
      result = result.filter((discount) => {
        if (!discount.start_date) return false;
        const discountStartDate = new Date(discount.start_date);
        return discountStartDate >= startDate;
      });
    }

    // Apply end date filter if selected
    if (selectedEndDate) {
      const endDate = new Date(selectedEndDate);
      result = result.filter((discount) => {
        if (!discount.end_date) return false;
        const discountEndDate = new Date(discount.end_date);
        return discountEndDate <= endDate;
      });
    }

    return result;
  }, [discounts, searchQuery, selectedStartDate, selectedEndDate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDiscounts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // New variables to handle different empty states
  const hasSearchResults = searchQuery && filteredDiscounts.length === 0;
  const hasDateFilter = selectedStartDate || selectedEndDate;
  const hasFilterResults = hasDateFilter && filteredDiscounts.length === 0;
  const noData =
    filteredDiscounts.length === 0 && !hasDateFilter && !searchQuery;

  const toggleStartDateFilter = () => {
    setShowStartDateFilter(!showStartDateFilter);
    setShowEndDateFilter(false);
  };

  const toggleEndDateFilter = () => {
    setShowEndDateFilter(!showEndDateFilter);
    setShowStartDateFilter(false);
  };

  const clearStartDateFilter = () => {
    setSelectedStartDate(null);
  };

  const clearEndDateFilter = () => {
    setSelectedEndDate(null);
  };

  return (
    <div className="bg-gray-100 flex flex-col h-[89vh] mx-5">
      <Helmet>
        <title>
          {t("promo")} | {t("vertex")}
        </title>
      </Helmet>
      <Header subtitle={t("promoMenu")} title={t("promo")} />
      <div className="bg-white rounded-md p-5 my-2">
        <SearchBar
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
          text={t("addNewPromo")}
          onclick={() => navigate("/Dashboard/AddDiscounts")}
          value={searchQuery}
          onchange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />

        {selectedDiscounts.length > 0 && (
          <div className="mt-3 flex justify-between items-center bg-gray-50 p-3 rounded">
            <span className="text-gray-600">
              {t("selecting")} {selectedDiscounts.length} {t("items")}
            </span>
            <button
              onClick={() => setShowDeleteAllModal(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              {t("deleteAll")}
            </button>
          </div>
        )}

        {error ? (
          <div className="text-red-500 text-center mt-10">{t("error")}</div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : hasSearchResults ? (
          <div className="text-gray-400 text-center mt-10">
            {t("noMatchResults")}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg mt-4">
              <table className="bg-white min-w-full table relative">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-t border-b text-15 text-left w-200">
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="hidden peer"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            aria-label="Select all discounts"
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
                        {t("promo")}
                      </div>
                    </th>
                    <th className="px-3 py-3 text-left text-15 border w-200 rtl:text-right">
                      {t("productNum")}
                    </th>
                    <th className="px-6 py-3 text-left border text-15 w-200">
                      <div className="flex justify-between items-center">
                        <p>{t("startDate")}</p>
                        <div className="flex items-center gap-2">
                          {selectedStartDate && (
                            <span
                              className="text-xs text-primary cursor-pointer"
                              onClick={clearStartDateFilter}
                            >
                              {t("clear")}
                            </span>
                          )}
                          <button
                            onClick={toggleStartDateFilter}
                            className={`p-1 rounded start-date-filter-button ${
                              selectedStartDate
                                ? "bg-primary text-white"
                                : "bg-customOrange-lightOrange text-primary"
                            }`}
                          >
                            <BsSortDown size={16} />
                          </button>
                        </div>
                      </div>
                      {showStartDateFilter && (
                        <div
                          ref={startDateFilterRef}
                          className="absolute ltr:right-96 rtl:left-96 mt-1 z-10"
                        >
                          <CustomCalendar
                            selectedDate={selectedStartDate}
                            onChange={(date) => {
                              setSelectedStartDate(date);
                              setShowStartDateFilter(false);
                            }}
                          />
                        </div>
                      )}
                    </th>
                    <th className="px-6 py-3 text-left border text-15 w-200">
                      <div className="flex justify-between items-center">
                        <p>{t("endDate")}</p>
                        <div className="flex items-center gap-2">
                          {selectedEndDate && (
                            <span
                              className="text-xs text-primary cursor-pointer"
                              onClick={clearEndDateFilter}
                            >
                              {t("clear")}
                            </span>
                          )}
                          <button
                            onClick={toggleEndDateFilter}
                            className={`p-1 rounded end-date-filter-button ${
                              selectedEndDate
                                ? "bg-primary text-white"
                                : "bg-customOrange-lightOrange text-primary"
                            }`}
                          >
                            <BsSortDown size={16} />
                          </button>
                        </div>
                      </div>
                      {showEndDateFilter && (
                        <div
                          ref={endDateFilterRef}
                          className="absolute ltr:right-40 rtl:left-36 mt-1 z-10"
                        >
                          <CustomCalendar
                            selectedDate={selectedEndDate}
                            onChange={(date) => {
                              setSelectedEndDate(date);
                              setShowEndDateFilter(false);
                            }}
                          />
                        </div>
                      )}
                    </th>
                    <th className="px-6 py-3 border text-center text-15 w-12">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hasFilterResults ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-400"
                      >
                        {t("noData")}
                      </td>
                    </tr>
                  ) : noData ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-400"
                      >
                        {t("noData")}
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((discount) => (
                      <tr
                        key={discount.id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="px-3 py-3 border-t text-gray-600 text-15 border-r w-250">
                          <div className="flex items-center gap-3">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="hidden peer"
                                checked={selectedDiscounts.includes(
                                  discount.id
                                )}
                                onChange={(e) =>
                                  handleSelectDiscount(
                                    discount.id,
                                    e.target.checked
                                  )
                                }
                                aria-label={`Select ${discount.name}`}
                              />
                              <span
                                className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                                  selectedDiscounts.includes(discount.id)
                                    ? "border-primary bg-primary"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedDiscounts.includes(discount.id) && (
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
                            {discount.name}
                          </div>
                        </td>
                        <td className="px-3 py-2 border-t text-gray-600 border-r text-14 w-250">
                          <p className="flex items-center justify-between bg-customOrange-mediumOrange rounded-md p-2 w-20">
                            <HiOutlineShoppingCart color="#E0A75E" size={22} />
                            {discount.quantity}
                          </p>
                        </td>
                        <td className="px-3 py-3 border-t text-gray-600 border-r text-13 w-250">
                          <p className="flex items-center gap-2">
                            <IoCalendarNumberOutline
                              color="#69ABB5"
                              size={16}
                            />
                            {discount.start_date || "N/A"}
                          </p>
                        </td>
                        <td className="px-3 py-3 border-t text-gray-600 border-r text-13 w-250">
                          <p className="flex items-center gap-2">
                            <IoCalendarNumberOutline
                              color="#69ABB5"
                              size={16}
                            />
                            {discount.end_date || "N/A"}
                          </p>
                        </td>
                        <td className="text-center px- py-3 rtl:border-r">
                          <div className="flex justify-center items-center">
                            <DeleteDiscount
                              id={discount.id}
                              onDelete={handleDeleteSuccess}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              pageCount={Math.ceil(filteredDiscounts.length / itemsPerPage)}
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              currentPage={currentPage}
              isRTL={isRTL}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
            />
          </>
        )}
      </div>
      <DeleteMultipleDiscounts
        isOpen={showDeleteAllModal}
        onClose={() => setShowDeleteAllModal(false)}
        onConfirm={handleDeleteMultiple}
        count={selectedDiscounts.length}
      />
    </div>
  );
}
export default AllDiscounts;