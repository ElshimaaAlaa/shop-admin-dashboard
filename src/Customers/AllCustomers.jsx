import { useEffect, useState, useMemo, useRef } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { IoHelpCircleOutline } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getCustomers } from "../ApiServices/AllCustomers";
import { ClipLoader } from "react-spinners";
import DeleteCustomer from "./DeleteCustomer";
import { IoCalendarNumberOutline } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { RiUser3Fill } from "react-icons/ri";
import StatisticsCard from "../Pages/Dashboard/ReportItems";
import { IoCopyOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { BsSortDown } from "react-icons/bs";
import CustomCalendar from "../Coupons/CustomCalendar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllCustomers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const [statistics, setStatistics] = useState({
    customers: {},
    contacts: {},
    payments: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  
  // Date filter states
  const [showStartDateFilter, setShowStartDateFilter] = useState(false);
  const [showEndDateFilter, setShowEndDateFilter] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  
  const startDateFilterRef = useRef(null);
  const endDateFilterRef = useRef(null);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await getCustomers(searchQuery);
      const data = response?.data || response;

      setCustomers(data?.orders || []);
      setStatistics(
        data?.statistics || {
          customers: {},
          contacts: {},
          payments: {},
        }
      );
      setIsLoading(false);
    } catch (error) {
      console.error("API call failed: ", error);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
    setIsRTL(i18n.language === "ar");
  }, [searchQuery, i18n.language]);

  // Close date pickers when clicking outside
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

  // Filter customers based on search and date filters
  const filteredCustomers = useMemo(() => {
    let result = customers.filter((customer) =>
      customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone?.includes(searchQuery)
    );

    // Apply start date filter if selected
    if (selectedStartDate) {
      const startDate = new Date(selectedStartDate);
      result = result.filter((customer) => {
        if (!customer.joining_date) return false;
        const customerDate = new Date(customer.joining_date);
        return customerDate >= startDate;
      });
    }

    // Apply end date filter if selected
    if (selectedEndDate) {
      const endDate = new Date(selectedEndDate);
      result = result.filter((customer) => {
        if (!customer.joining_date) return false;
        const customerDate = new Date(customer.joining_date);
        return customerDate <= endDate;
      });
    }

    return result;
  }, [customers, searchQuery, selectedStartDate, selectedEndDate]);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = currentPage * itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  // New variables to handle different empty states
  const hasSearchResults = searchQuery && filteredCustomers.length === 0;
  const hasDateFilter = selectedStartDate || selectedEndDate;
  const hasFilterResults = hasDateFilter && filteredCustomers.length === 0;
  const noData = filteredCustomers.length === 0 && !hasDateFilter && !searchQuery;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeleteSuccess = (deletedId) => {
    const updatedData = customers.filter((item) => item.id !== deletedId);
    setCustomers(updatedData);
    if (currentItems.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    fetchCustomers();
  };

  const copyPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      navigator.clipboard.writeText(phoneNumber)
        .then(() => {
          toast.success(t("copied"), {
            position: isRTL ? "top-left" : "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          console.error("Failed to copy phone number: ", err);
          toast.error(t("copyFailed"), {
            position: isRTL ? "top-left" : "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const clearStartDateFilter = () => {
    setSelectedStartDate(null);
  };

  const clearEndDateFilter = () => {
    setSelectedEndDate(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10 mx-5 pt-5">
      <Helmet>
        <title>
          {t("customers")} | {t("vertex")}
        </title>
      </Helmet>
      <ToastContainer rtl={isRTL} />
      
      <section className="bg-white mb-3 p-4 rounded-md flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-13">{t("customerHead")}</p>
          <h1 className="font-bold text-17 mt-2">{t("customers")}</h1>
        </div>
        <button
          className="flex items-center gap-1 font-bold text-white bg-primary rounded-md p-4 rtl:flex-row-reverse"
          onClick={() => navigate("/Dashboard/SupportQuestion")}
        >
          {t("customerSupport")}
          <IoHelpCircleOutline size={27} />
        </button>
      </section>
      
      <section className="bg-white rounded-md p-4 mb-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <StatisticsCard
          icon={RiUser3Fill}
          title={t("allCustomers")}
          totalNumber={statistics.customers?.change_rate || 0}
          percentage={`${
            statistics.customers?.current_month_count || 0
          }% vs. ${t("previousMonth")}`}
          duration={`${t("lastMonth")} ${
            statistics.customers?.previous_month_count || 0
          }`}
        />
        <StatisticsCard
          icon={BiSupport}
          title={t("supportRequest")}
          totalNumber={statistics.contacts?.change_rate || 0}
          percentage={`${
            statistics.contacts?.current_month_count || 0
          }% vs. ${t("previousMonth")}`}
          duration={`${t("lastMonth")} ${
            statistics.contacts?.previous_month_count || 0
          }`}
        />
        <StatisticsCard
          icon={FaSackDollar}
          title={t("payment")}
          totalNumber={statistics.payments?.change_rate || 0}
          percentage={`${
            statistics.payments?.current_month_count || 0
          }% vs. ${t("previousMonth")}`}
          duration={`${t("lastMonth")} ${
            statistics.payments?.previous_month_count || 0
          }`}
        />
      </section>
      
      <section className="bg-white rounded-md p-4">
        <div className="relative w-full mt-3">
          <Search
            className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
            color="#E0A75E"
          />
          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
            className="w-full h-12 pl-10 rtl:pr-10 pr-4 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-2 border-gray-200 bg-gray-50 placeholder:text-15 focus:border-primary"
          />
        </div>

        {error ? (
          <div className="text-red-500 text-center mt-10">{t("error")}</div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : hasSearchResults ? (
          // Search with no results - hide table completely
          <div className="text-gray-400 text-center text-14 mt-10">
            {t("noMatchResults")}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg mt-4">
              <table className="bg-white min-w-full table relative">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-t border-b text-left cursor-pointer">
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all categories"
                        />
                        {t("customer")}
                      </p>
                    </th>
                    <th className="px-3 py-3 text-left border rtl:text-right">
                      {t("phone")}
                    </th>
                    <th className="px-6 py-3 text-left border text-15">
                      <div className="flex justify-between items-center">
                        <p>{t("joinDate")}</p>
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
                            onClick={() => setShowStartDateFilter(!showStartDateFilter)}
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
                          className="absolute ltr:right-40 rtl:left-36 mt-1 z-10"
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
                    <th className="px-6 py-3 text-left border text-15">
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
                            onClick={() => setShowEndDateFilter(!showEndDateFilter)}
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
                    <th className="px-3 py-3 border text-center w-20">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hasFilterResults ? (
                    // Date filter with no results - show header but empty body
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-400">
                        {t("noData")}
                      </td>
                    </tr>
                  ) : noData ? (
                    // No data at all (initial state)
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-400">
                        {t("noData")}
                      </td>
                    </tr>
                  ) : (
                    // Normal data display
                    currentItems.map((customer) => (
                      <tr key={customer.id} className="border-t hover:bg-gray-50">
                        <td
                          className="px-3 py-3 border-t text-15 border-r w-250 cursor-pointer"
                          onClick={() =>
                            navigate(`/Dashboard/AllCustomers/${customer.id}`)
                          }
                        >
                          <p className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4"
                              aria-label="Select all categories"
                            />
                            {customer.name}
                          </p>
                          <p className="text-gray-600 ms-7 text-13">
                            {customer.email}
                          </p>
                        </td>
                        <td className="px-3 py-3 border-t text-gray-600 border-r text-14 w-180">
                          <div className="flex items-center gap-2">
                            {customer.phone || "N/A"}
                            {customer.phone && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyPhoneNumber(customer.phone);
                                }}
                                className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                                title={t("copyPhone")}
                              >
                                <IoCopyOutline color="#E0A75E" size={15} />
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-3 border-t text-gray-500 border-r text-13 w-36">
                          <p className="flex items-center gap-2">
                            <IoCalendarNumberOutline color="#69ABB5" size={17} />
                            {customer.joining_date || "N/A"}
                          </p>
                        </td>
                        <td className="px-3 py-3 border-t text-gray-600 border-r text-15 w-36">
                          {customer.spent || 0} $
                        </td>
                        <td className="text-center px-3 py-3 rtl:border-r">
                          <DeleteCustomer
                            id={customer.id}
                            onDelete={handleDeleteSuccess}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination - only show if we have results and not in filter empty state */}
            {!hasFilterResults && filteredCustomers.length > 0 && (
              <ReactPaginate
                pageCount={Math.ceil(filteredCustomers.length / itemsPerPage)}
                onPageChange={handlePageClick}
                forcePage={currentPage}
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
                previousClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
                nextClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default AllCustomers;