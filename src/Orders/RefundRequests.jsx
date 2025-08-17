import { useEffect, useState, useRef, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Search } from "lucide-react";
import AcceptRefundRequests from "./Accept Refund Requests";
import RejectRefundRequests from "./Reject Refund Requests";
import { refundrequests } from "../ApiServices/refund-requests";
import { ClipLoader } from "react-spinners";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { BsSortDown } from "react-icons/bs";
import CustomCalendar from "../Coupons/CustomCalendar";
import Header from "../Components/Header/Header";
import Pagination from "../Components/Pagination/Pagination";
import DeleteMutipleRefundOrders from "./DeleteMutipleRefundOrders";

function RefundRequests() {
  const [allRefundOrders, setAllRefundOrders] = useState([]); // Store all orders
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const datePickerRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 5,
    total: 0,
    last_page: 1,
  });

  // Fetch all refund requests
  useEffect(() => {
    const fetchRefundRequest = async () => {
      setIsLoading(true);
      try {
        const response = await refundrequests();
        setAllRefundOrders(response || []);
        setPagination((prev) => ({
          ...prev,
          total: response?.length || 0,
          last_page: Math.ceil((response?.length || 0) / prev.per_page),
        }));
        setIsLoading(false);
      } catch (error) {
        setError(true);
        console.error("Failed to fetch refund requests:", error);
        setAllRefundOrders([]);
        setIsLoading(false);
      }
    };
    fetchRefundRequest();
  }, [i18n.language]);

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter orders based on search and date filter
  const filteredOrders = useMemo(() => {
    return allRefundOrders.filter((order) => {
      const matchesSearch =
        order.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.refund_reason?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDate = dateFilter
        ? new Date(order.request_refund_date).toDateString() ===
          dateFilter.toDateString()
        : true;

      return matchesSearch && matchesDate;
    });
  }, [allRefundOrders, searchQuery, dateFilter]);

  // Update pagination when filters change
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      current_page: 1, // Reset to first page when filters change
      total: filteredOrders.length,
      last_page: Math.ceil(filteredOrders.length / prev.per_page) || 1,
    }));
  }, [filteredOrders]);

  // Get paginated orders
  const paginatedOrders = useMemo(() => {
    const startIndex = (pagination.current_page - 1) * pagination.per_page;
    const endIndex = startIndex + pagination.per_page;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, pagination.current_page, pagination.per_page]);

  const handleDateChange = (date) => {
    setDateFilter(date);
    setShowDatePicker(false);
  };

  const clearDateFilter = () => {
    setDateFilter(null);
  };

  const handlePageClick = ({ selected }) => {
    setPagination((prev) => ({
      ...prev,
      current_page: selected + 1,
    }));
    setSelectAll(false);
    setSelectedOrders([]);
  };

  // Select all orders on current page
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allOrderIds = paginatedOrders.map((order) => order.id);
      setSelectedOrders(allOrderIds);
    } else {
      setSelectedOrders([]);
    }
  };

  // Select individual order
  const handleSelectOrder = (orderId, isChecked) => {
    if (isChecked) {
      setSelectedOrders((prev) => [...prev, orderId]);
    } else {
      setSelectedOrders((prev) => prev.filter((id) => id !== orderId));
      setSelectAll(false);
    }
  };

  // Handle delete multiple orders
  const handleDeleteMultiple = async () => {
    try {
      setAllRefundOrders((prev) =>
        prev.filter((order) => !selectedOrders.includes(order.id))
      );

      setSelectedOrders([]);
      setSelectAll(false);
      setShowDeleteAllModal(false);
    } catch (error) {
      console.error("Failed to delete orders:", error);
    }
  };

  const RefundSearch = ({ searchQuery, setSearchQuery }) => {
    return (
      <div className="relative w-full mt-3">
        <Search
          className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
          color="#E0A75E"
        />
        <input
          type="text"
          placeholder={t("search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-10 rtl:pr-10 pr-4 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-2 border-gray-200 bg-gray-50 placeholder:text-15 focus:border-primary"
        />
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-[89vh] mx-5 pt-5">
      <Helmet>
        <title>
          {t("refundrequests")} | {t("vertex")}
        </title>
      </Helmet>

      <Header
        subtitle={t("refundrequestsHead")}
        title={t("refundrequests")}
        className="mb-3"
      />

      <div className="bg-white p-4 rounded-md">
        <RefundSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {selectedOrders.length > 0 && (
          <div className="mt-3 flex justify-between items-center bg-gray-50 p-3 rounded">
            <span>
              {t("selecting")} <span className="text-primary font-bold">{selectedOrders.length}</span> {t("items")}
            </span>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setShowDeleteAllModal(true)}
            >
              {t("deleteAll")}
            </button>
          </div>
        )}

        <h2 className="font-bold text-17 mt-4">{t("refundrequests")}</h2>

        {isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-10">{t("error")}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">
            {searchQuery || dateFilter ? t("noMatchResults") : t("noData")}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg mt-4 overflow-x-auto">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-b text-left cursor-pointer">
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="hidden peer"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            aria-label="Select all orders"
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
                        {t("order")}
                      </div>
                    </th>
                    <th className="px-3 py-3 text-left border-b border-l border-r rtl:text-right">
                      <div className="flex items-center justify-between gap-2">
                        <p>{t("date")}</p>
                        <div className="flex items-center gap-2">
                          {dateFilter && (
                            <button
                              onClick={clearDateFilter}
                              className="text-primary text-13 flex items-center"
                              aria-label="Clear date filter"
                            >
                              {t("clear")}
                            </button>
                          )}
                          <div ref={datePickerRef}>
                            <button
                              className={`rounded-md p-2 ${
                                dateFilter
                                  ? "bg-customOrange-lightOrange text-primary"
                                  : "bg-customOrange-lightOrange text-primary"
                              }`}
                              onClick={() => setShowDatePicker(!showDatePicker)}
                              aria-label="Filter by date"
                            >
                              <BsSortDown />
                            </button>
                            {showDatePicker && (
                              <div className="absolute ltr:right-40 rtl:left-[520px] mt-0.5 z-10">
                                <CustomCalendar
                                  selectedDate={dateFilter}
                                  onChange={handleDateChange}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </th>
                    <th className="px-3 py-3 text-left border-b border-r rtl:text-right">
                      {t("price")}
                    </th>
                    <th className="px-3 py-3 text-left border-b border-r rtl:text-right">
                      {t("reason")}
                    </th>
                    <th className="px-3 py-3 text-center border-b rtl:border-r">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 border">
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="hidden peer"
                              checked={selectedOrders.includes(order.id)}
                              onChange={(e) =>
                                handleSelectOrder(order.id, e.target.checked)
                              }
                              aria-label={`Select ${order.order_number}`}
                            />
                            <span
                              className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                                selectedOrders.includes(order.id)
                                  ? "border-primary bg-primary"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedOrders.includes(order.id) && (
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
                          <span className="text-14 text-gray-600">
                            {order.order_number}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 mt-2 text-13 text-gray-600 border">
                        <p className="flex items-center gap-2">
                          <IoCalendarNumberOutline color="#69ABB5" size={17} />
                          {order.request_refund_date}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t border-l text-gray-600 text-14 rtl:border-r">
                        {order.total} $
                      </td>
                      <td className="px-2 py-3 border-t border-l text-gray-600">
                        <p className="bg-customOrange-mediumOrange text-primary rounded-md p-2 text-14">
                          {order.refund_reason || t("notProvided")}
                        </p>
                      </td>
                      <td className="px-6 py-3 w-10 border-t border-l">
                        <div className="flex items-center gap-3">
                          <AcceptRefundRequests
                            order_id={order.id}
                            status={order.status}
                            amount={order.items_count}
                          />
                          <RejectRefundRequests
                            orderId={order.id}
                            status={order.status}
                            amount={order.items_count}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length > pagination.per_page && (
              <Pagination
                pageCount={pagination.last_page}
                onPageChange={handlePageClick}
                forcePage={pagination.current_page - 1}
                isRTL={isRTL}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
              />
            )}
          </>
        )}
      </div>

      <DeleteMutipleRefundOrders
        isOpen={showDeleteAllModal}
        onClose={() => setShowDeleteAllModal(false)}
        onConfirm={handleDeleteMultiple}
        count={selectedOrders.length}
      />
    </div>
  );
}

export default RefundRequests;
