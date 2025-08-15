import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Search } from "lucide-react";
import AcceptRefundRequests from "./Accept Refund Requests";
import RejectRefundRequests from "./Reject Refund Requests";
import { refundrequests } from "../ApiServices/refund-requests";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { BsSortDown } from "react-icons/bs";
import CustomCalendar from "../Coupons/CustomCalendar"; 

function RefundRequests() {
  const [refundOrders, setRefundOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);

  const [pagination, setPagination] = useState({
    total: 0,
    count: 0,
    per_page: 5,
    current_page: 1,
    total_pages: 1,
    next_page_url: null,
    prev_page_url: null,
  });

  useEffect(() => {
    const fetchRefundRequest = async () => {
      setIsLoading(true);
      try {
        const response = await refundrequests();
        setRefundOrders(response || []);
        if (response.pagination) {
          setPagination(response.pagination);
        }
        setIsLoading(false);
      } catch (error) {
        setError(true);
        console.error("Failed to fetch refund requests:", error);
        setRefundOrders([]);
        setIsLoading(false);
      }
    };
    fetchRefundRequest();
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOrders = refundOrders.filter((order) => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.refund_reason.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = dateFilter
      ? new Date(order.request_refund_date).toDateString() ===
        dateFilter.toDateString()
      : true;
    
    return matchesSearch && matchesDate;
  });

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
  };

  return (
    <div className="bg-gray-100 min-h-[89vh] mx-5 pt-5">
      <Helmet>
        <title>
          {t("refundrequests")} | {t("vertex")}
        </title>
      </Helmet>

      <div className="bg-white mb-3 p-4 rounded-md">
        <p className="text-13 text-gray-400">{t("refundrequestsHead")}</p>
        <h1 className="font-bold text-17 mt-2">{t("refundrequests")}</h1>
      </div>

      <div className="bg-white p-4 rounded-md">
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

        <h2 className="font-bold text-17 mt-4">{t("refundrequests")}</h2>

        {isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-10">{t("error")}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">{t("noData")}</div>
        ) : (
          <div className="border border-gray-200 rounded-lg mt-4 overflow-x-auto">
            <table className="bg-white min-w-full table">
              <thead>
                <tr>
                  <th className="px-3 py-3 border-b text-left cursor-pointer">
                    <p className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                        aria-label="Select all orders"
                      />
                      {t("order")}
                    </p>
                  </th>
                  <th className="px-3 py-3 text-left border-b border-l border-r rtl:text-right">
                    <div className="flex items-center justify-between gap-2">
                      <p>
                        {t("date")}
                      </p>
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
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 border">
                      <p className="flex items-center gap-3 text-14 text-gray-600">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label={`Select ${order.order_number}`}
                        />
                        {order.order_number}
                      </p>
                    </td>
                    <td className="px-3 py-3 mt-2 text-13  text-gray-600 border">
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
        )}
        <ReactPaginate
          pageCount={pagination.total_pages}
          onPageChange={handlePageClick}
          forcePage={pagination.current_page - 1}
          containerClassName="flex items-center justify-end mt-5 text-gray-400 text-14"
          pageClassName="px-3 py-1 rounded"
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
          previousClassName={`px-3 py-1 rounded ${
            !pagination.prev_page_url
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
          nextClassName={`px-3 py-1 rounded ${
            !pagination.next_page_url
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
}

export default RefundRequests;