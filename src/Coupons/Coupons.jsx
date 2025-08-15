import { useEffect, useState, useMemo, useRef } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showStartDateFilter, setShowStartDateFilter] = useState(false);
  const [showEndDateFilter, setShowEndDateFilter] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

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
        !event.target.closest('.start-date-filter-button')
      ) {
        setShowStartDateFilter(false);
      }
      
      if (
        endDateFilterRef.current &&
        !endDateFilterRef.current.contains(event.target) &&
        !event.target.closest('.end-date-filter-button')
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
    fetchData();
  };

  const filteredCoupons = useMemo(() => {
    let result = coupons.filter((coupon) =>
      coupon.coupon.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedStartDate) {
      const startDate = new Date(selectedStartDate);
      result = result.filter((coupon) => {
        const couponStartDate = new Date(coupon.start_date);
        return couponStartDate >= startDate;
      });
    }

    if (selectedEndDate) {
      const endDate = new Date(selectedEndDate);
      result = result.filter((coupon) => {
        const couponEndDate = new Date(coupon.end_date);
        return couponEndDate <= endDate;
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

  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

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

  // New variables to handle different empty states
  const hasSearchResults = searchQuery && filteredCoupons.length === 0;
  const hasDateFilter = selectedStartDate || selectedEndDate;
  const hasFilterResults = hasDateFilter && filteredCoupons.length === 0;
  const noData = filteredCoupons.length === 0 && !hasDateFilter && !searchQuery;

  return (
    <div className="bg-gray-100 p-4 h-[89vh] pt-5">
      <Helmet>
        <title>
          {t("coupons")} | {t("vertex")}
        </title>
      </Helmet>
      <section className="bg-white p-5 rounded-md mb-3">
        <p className="text-gray-400 text-13">{t("couponsHead")}</p>
        <h1 className="font-bold text-17 mt-2">{t("coupons")}</h1>
      </section>
      <section className="bg-white p-5 rounded-md">
        <SearchBar
          value={searchQuery}
          onclick={() => setShowModal(true)}
          onchange={(e) => setSearchQuery(e.target.value)}
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
        {error ? (
          <div className="text-red-500 text-center mt-10">{t("error")}</div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : hasSearchResults ? (
          <div className="text-gray-400 text-center mt-10">{t("noData")}</div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg">
              <table className="bg-white min-w-full table relative">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-t border-b text-left rtl:text-right w-12">
                      <p className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all categories"
                        />
                        {t("codes")}
                      </p>
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
                      <td colSpan="6" className="text-center py-4 text-gray-400">
                        {t("noData")}
                      </td>
                    </tr>
                  ) : noData ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-400">
                        {t("noData")}
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((coupon) => (
                      <tr key={coupon.id}>
                        <td className="px-3 py-3 border w-350 text-gray-600 text-14">
                          <p className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4"
                              aria-label={`Select ${coupon.coupon}`}
                            />
                            {coupon.coupon}
                          </p>
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
                                  ? "translate-x-6 rtl:-translate-x-0"
                                  : "translate-x-0 rtl:-translate-x-6"
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
            {!hasFilterResults && filteredCoupons.length > 0 && (
              <ReactPaginate
                pageCount={Math.ceil(filteredCoupons.length / itemsPerPage)}
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
                previousClassName="mx-1 px-1 py-1 font-bold text-primary text-18"
                nextClassName="mx-1 px-1 py-1 font-bold text-primary text-18"
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Coupons;