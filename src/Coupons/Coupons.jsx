import { useEffect, useState, useMemo, useRef } from "react";
import DeleteCoupons from "./DeleteCoupons";
import { ClipLoader } from "react-spinners";
import { fetchCoupons } from "../ApiServices/Coupons";
import { Helmet } from "react-helmet";
import SearchBar from "../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IoCalendarNumberOutline } from "react-icons/io5";
import AddNewCoupon from "./AddNewCoupons";
import { BsSortDown } from "react-icons/bs";
import CustomCalendar from "./CustomCalendar";
import DeleteMultipleCoupons from "./DeleteMultipleCoupons";
import Header from "../Components/Header/Header";
import Pagination from "../Components/Pagination/Pagination";
import "./style.scss";
function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [showModal, setShowModal] = useState(false);
  const [showStartDateFilter, setShowStartDateFilter] = useState(false);
  const [showEndDateFilter, setShowEndDateFilter] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const startDateFilterRef = useRef(null);
  const endDateFilterRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCoupons();
      setCoupons(data);
    } catch (error) {
      setError(true);
      console.error("API call failed: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleDeleteCoupons = (couponId) => {
    setCoupons((prevCoupons) => {
      const updatedCoupons = prevCoupons.filter(
        (coupon) => coupon.id !== couponId
      );
      if (
        updatedCoupons.length <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
      return updatedCoupons;
    });
    setSelectedCoupons((prev) => prev.filter((id) => id !== couponId));
    fetchData();
  };

  const normalizeDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const filteredCoupons = useMemo(() => {
    let result = coupons.filter((coupon) =>
      coupon.coupon.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedStartDate) {
      const startDate = normalizeDate(selectedStartDate);
      result = result.filter((coupon) => {
        const couponStartDate = normalizeDate(coupon.start_date);
        return couponStartDate && couponStartDate >= startDate;
      });
    }

    if (selectedEndDate) {
      const endDate = normalizeDate(selectedEndDate);
      result = result.filter((coupon) => {
        const couponEndDate = normalizeDate(coupon.end_date);
        return couponEndDate && couponEndDate <= endDate;
      });
    }

    return result;
  }, [coupons, searchQuery, selectedStartDate, selectedEndDate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredCoupons.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredCoupons, indexOfFirstItem, indexOfLastItem]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const togglePublishedStatus = async (couponId) => {
    try {
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === couponId
            ? { ...coupon, published: !coupon.is_active }
            : coupon
        )
      );
    } catch (error) {
      console.error("Failed to update published status:", error);
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === couponId
            ? { ...coupon, published: !coupon.is_active }
            : coupon
        )
      );
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allCouponIds = currentItems.map((coupon) => coupon.id);
      setSelectedCoupons(allCouponIds);
    } else {
      setSelectedCoupons([]);
    }
  };

  const handleSelectCoupon = (couponId, isChecked) => {
    if (isChecked) {
      setSelectedCoupons((prev) => [...prev, couponId]);
    } else {
      setSelectedCoupons((prev) => prev.filter((id) => id !== couponId));
      setSelectAll(false);
    }
  };

  const handleDeleteMultiple = () => {
    setCoupons((prevCoupons) =>
      prevCoupons.filter((coupon) => !selectedCoupons.includes(coupon.id))
    );
    setSelectedCoupons([]);
    setSelectAll(false);
    setShowDeleteAllModal(false);

    if (selectedCoupons.length === currentItems.length && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    fetchData();
  };
  useEffect(() => {
    if (showDeleteAllModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showDeleteAllModal]);
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

  const hasSearchResults = searchQuery && filteredCoupons.length === 0;
  const hasDateFilter = selectedStartDate || selectedEndDate;
  const hasFilterResults = hasDateFilter && filteredCoupons.length === 0;
  const noData = filteredCoupons.length === 0 && !hasDateFilter && !searchQuery;

  return (
    <div className="bg-gray-100 p-4 min-h-[90vh]">
      <Helmet>
        <title>
          {t("coupons")} | {t("vertex")}
        </title>
      </Helmet>
      <Header
        subtitle={t("couponsHead")}
        title={t("coupons")}
        className="mb-3 mt-5"
      />
      <section className="bg-white p-5 rounded-md">
        <SearchBar
          value={searchQuery}
          onclick={() => setShowModal(true)}
          onchange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          text={t("addNewCoupon")}
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
        />
        <AddNewCoupon
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            fetchData();
          }}
        />

        {selectedCoupons.length > 0 && (
          <div className="mt-3 flex justify-between items-center bg-gray-50 p-3 rounded">
            <span>
              {t("selecting")}{" "}
              <span className="font-bold text-primary">
                {selectedCoupons.length}
              </span>{" "}
              {t("items")}
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
        ) : coupons.length === 0 ? (
          <p className="text-center mt-10 text-gray-400 text-15">
            {t("noData")}
          </p>
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
                    <th className="px-3 py-3 border-t border-b text-left rtl:text-right w-12">
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="hidden peer"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            aria-label="Select all coupons"
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
                        {t("codes")}
                      </div>
                    </th>
                    {coupons.length > 0 && (
                      <>
                        <th className="px-6 py-3 text-left border">
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
                              className="absolute ltr:left-80 rtl:right-80 mt-0.5 z-10"
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
                        <th className="px-6 py-3 text-left border">
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
                              className="absolute rtl:left-96 mt-1 z-10"
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
                      </>
                    )}
                    <th className="px-6 py-3 text-left border">
                      <p className="flex justify-between items-center">
                        {t("amount")}
                      </p>
                    </th>
                    <th className="px-6 py-3 text-left border">
                      <p className="flex justify-between items-center">
                        {t("publish")}
                      </p>
                    </th>
                    <th className="px-6 py-3 text-left w-5 border-t border-b">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hasFilterResults ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-4 text-gray-400"
                      >
                        {t("noMatchResults")}
                      </td>
                    </tr>
                  ) : noData ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-4 text-gray-400"
                      >
                        {t("noMatchResults")}
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((coupon) => (
                      <tr key={coupon.id}>
                        <td className="px-3 py-3 border w-350 text-gray-600 text-14">
                          <div className="flex items-center gap-3">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="hidden peer"
                                checked={selectedCoupons.includes(coupon.id)}
                                onChange={(e) =>
                                  handleSelectCoupon(
                                    coupon.id,
                                    e.target.checked
                                  )
                                }
                                aria-label={`Select ${coupon.coupon}`}
                              />
                              <span
                                className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                                  selectedCoupons.includes(coupon.id)
                                    ? "border-primary bg-primary"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedCoupons.includes(coupon.id) && (
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
                            {coupon.coupon}
                          </div>
                        </td>
                        <td className="flex gap-3 px-6 py-3 border-t text-gray-600 text-14">
                          <p className="flex items-center gap-2">
                            <IoCalendarNumberOutline
                              color="#69ABB5"
                              size={16}
                            />
                            {coupon.start_date || t("notProvided")}
                          </p>
                        </td>
                        <td className="px-6 py-3 border-t border-l rtl:border-r text-gray-600 text-14">
                          <p className="flex items-center gap-2">
                            <IoCalendarNumberOutline
                              color="#69ABB5"
                              size={16}
                            />
                            {coupon.end_date || t("notProvided")}
                          </p>
                        </td>
                        <td className="px-6 py-3 border-t border-l rtl:border-r text-gray-600 text-14">
                          <p className="flex items-center gap-2">
                            {coupon.discount_value || t("notProvided")}
                          </p>
                        </td>
                        <td className="px-6 py-3 border-t border-l rtl:border-r">
                          <button
                            onClick={() => togglePublishedStatus(coupon.id)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                              coupon.is_active ? "bg-primary" : "bg-gray-300"
                            }`}
                            aria-label={`Toggle publish status for ${coupon.name}`}
                          >
                            <div
                              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                                coupon.is_active
                                  ? "translate-x-6 rtl:-translate-x-6"
                                  : "translate-x-0 rtl:-translate-x-0"
                              }`}
                            />
                          </button>
                        </td>
                        <td className="px-6 py-3 w-10 border-t border-l rtl:border-r">
                          <div className="flex items-center justify-center gap-2">
                            <DeleteCoupons
                              couponId={coupon.id}
                              id={coupon.id}
                              onDelete={handleDeleteCoupons}
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
              pageCount={Math.ceil(filteredCoupons.length / itemsPerPage)}
              onPageChange={({ selected }) => paginate(selected + 1)}
              currentPage={currentPage}
              isRTL={isRTL}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
            />
          </>
        )}
      </section>
      <DeleteMultipleCoupons
        isOpen={showDeleteAllModal}
        onClose={() => setShowDeleteAllModal(false)}
        onConfirm={handleDeleteMultiple}
        count={selectedCoupons.length}
      />
    </div>
  );
}
export default Coupons;
