/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo, useRef } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { IoHelpCircleOutline } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getCustomers } from "../ApiServices/AllCustomers";
import { ClipLoader } from "react-spinners";
import DeleteCustomer from "./DeleteCustomer";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiUser3Fill } from "react-icons/ri";
import StatisticsCard from "../Pages/Dashboard/ReportItems";
import { IoCopyOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { BsSortDown } from "react-icons/bs";
import CustomCalendar from "../Coupons/CustomCalendar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteMultipleUsers from "./DeleteMultipleUsers";
import Pagination from "../Components/Pagination/Pagination";
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
  const isRTL = i18n.language === "ar";
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  // Date filter states
  const [showStartDateFilter, setShowStartDateFilter] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);

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
  }, [searchQuery, i18n.language]);

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
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allCustomerIds = currentItems.map((customer) => customer.id);
      setSelectedCustomers(allCustomerIds);
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId, isChecked) => {
    if (isChecked) {
      setSelectedCustomers((prev) => [...prev, customerId]);
    } else {
      setSelectedCustomers((prev) => prev.filter((id) => id !== customerId));
      setSelectAll(false);
    }
  };

  const handleDeleteMultiple = () => {
    setCustomers((prev) =>
      prev.filter((customer) => !selectedCustomers.includes(customer.id))
    );
    setSelectedCustomers([]);
    setSelectAll(false);
    setShowDeleteAllModal(false);
    fetchCustomers();
  };
  useEffect(() => {
    if (showDeleteAllModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showDeleteAllModal]);
  const handleDeleteSuccess = (deletedId) => {
    setCustomers((prev) =>
      prev.filter((customer) => customer.id !== deletedId)
    );
    setSelectedCustomers((prev) => prev.filter((id) => id !== deletedId));
    if (currentItems.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    fetchCustomers();
  };

  // Filter customers based on search and date filters
  const filteredCustomers = useMemo(() => {
    let result = customers.filter(
      (customer) =>
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

    return result;
  }, [customers, searchQuery, selectedStartDate]);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = currentPage * itemsPerPage;
  const currentItems = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // New variables to handle different empty states
  const hasSearchResults = searchQuery && filteredCustomers.length === 0;
  const hasDateFilter = selectedStartDate;
  const hasFilterResults = hasDateFilter && filteredCustomers.length === 0;
  const noData =
    filteredCustomers.length === 0 && !hasDateFilter && !searchQuery;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const copyPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      navigator.clipboard
        .writeText(phoneNumber)
        .then(() => {
          toast.success(t("successCopy"), {
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

  const toggleStartDateFilter = () => {
    setShowStartDateFilter(!showStartDateFilter);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10 px-5 pt-5">
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
          percentage={`${statistics.customers?.current_month_count || 0}% ${t(
            "vs"
          )} ${t("previousMonth")}`}
          duration={`${t("lastMonth")} ${
            statistics.customers?.previous_month_count || 0
          }`}
        />
        <StatisticsCard
          icon={BiSupport}
          title={t("supportRequest")}
          totalNumber={statistics.contacts?.change_rate || 0}
          percentage={`${statistics.contacts?.current_month_count || 0}% ${t(
            "vs"
          )} ${t("previousMonth")}`}
          duration={`${t("lastMonth")} ${
            statistics.contacts?.previous_month_count || 0
          }`}
        />
        <StatisticsCard
          icon={FaSackDollar}
          title={t("payment")}
          totalNumber={statistics.payments?.change_rate || 0}
          percentage={`${statistics.payments?.current_month_count || 0}% ${t(
            "vs"
          )} ${t("previousMonth")}`}
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

        {selectedCustomers.length > 0 && (
          <div className="mt-3 flex justify-between items-center bg-gray-50 p-3 rounded">
            <span>
              {t("selecting")}{" "}
              <span className="font-bold text-primary">
                {selectedCustomers.length}
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
        ) : hasSearchResults ? (
          <div className="text-gray-400 text-center text-15 mt-5">
            {t("noMatchResults")}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg mt-4">
              <table className="bg-white min-w-full table relative">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-t border-b text-left cursor-pointer">
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="hidden peer"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            aria-label="Select all customers"
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
                        {t("customer")}
                      </div>
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
                    <th className="px-6 py-3 text-left rtl:text-right border text-15">
                      {t("spent")}
                    </th>
                    <th className="px-3 py-3 border text-center w-20">
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
                    currentItems.map((customer) => (
                      <tr
                        key={customer.id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td
                          className="px-3 py-3 border-t text-15 border-r w-250 cursor-pointer"
                          onClick={() =>
                            navigate(`/Dashboard/AllCustomers/${customer.id}`)
                          }
                        >
                          <div className="flex items-center gap-3">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="hidden peer"
                                checked={selectedCustomers.includes(
                                  customer.id
                                )}
                                onChange={(e) =>
                                  handleSelectCustomer(
                                    customer.id,
                                    e.target.checked
                                  )
                                }
                                aria-label={`Select ${customer.name}`}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span
                                className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                                  selectedCustomers.includes(customer.id)
                                    ? "border-primary bg-primary"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedCustomers.includes(customer.id) && (
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
                            {customer.name}
                          </div>
                          <p className="text-gray-600 ms-7 text-13">
                            {customer.email}
                          </p>
                        </td>
                        <td className="px-3 py-3 border-t text-gray-600 border-r text-14 w-180">
                          <div className="flex items-center gap-2">
                            {customer.phone || t("notProvided")}
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
                            <IoCalendarNumberOutline
                              color="#69ABB5"
                              size={17}
                            />
                            {customer.joining_date || t("notProvided")}
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
            <Pagination
              pageCount={Math.ceil(filteredCustomers.length / itemsPerPage)}
              onPageChange={handlePageClick}
              currentPage={currentPage}
              isRTL={isRTL}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
            />
          </>
        )}
      </section>
      <DeleteMultipleUsers
        isOpen={showDeleteAllModal}
        onClose={() => setShowDeleteAllModal(false)}
        onConfirm={handleDeleteMultiple}
        count={selectedCustomers.length}
      />
    </div>
  );
}
export default AllCustomers;
