import { useState, useRef, useEffect, useMemo } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { BsSortDown } from "react-icons/bs";

export const OrdersTable = ({
  filteredOrders,
  isLoading,
  error,
  searchQuery,
  debouncedSearchQuery,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [paymentFilter, setPaymentFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Refs for dropdowns
  const paymentDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        paymentDropdownRef.current &&
        !paymentDropdownRef.current.contains(event.target)
      ) {
        setShowPaymentDropdown(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setShowStatusDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get unique payment and status values for dropdowns
  const uniquePaymentStatuses = useMemo(() => {
    const payments = new Set(
      filteredOrders.map((order) => order.payment_status)
    );
    return Array.from(payments);
  }, [filteredOrders]);

  const uniqueOrderStatuses = useMemo(() => {
    const statuses = new Set(filteredOrders.map((order) => order.status_name));
    return Array.from(statuses);
  }, [filteredOrders]);

  // Apply filters to orders
  const filteredAndSortedOrders = useMemo(() => {
    return filteredOrders.filter((order) => {
      const matchesPayment = paymentFilter
        ? order.payment_status === paymentFilter
        : true;
      const matchesStatus = statusFilter
        ? order.status_name === statusFilter
        : true;
      return matchesPayment && matchesStatus;
    });
  }, [filteredOrders, paymentFilter, statusFilter]);

  // Clear filter functions
  const clearPaymentFilter = () => {
    setPaymentFilter(null);
  };

  const clearStatusFilter = () => {
    setStatusFilter(null);
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">{t("error")}</div>;
  }

  if (isLoading) {
    return (
      <div className="text-gray-400 text-center mt-10">
        <ClipLoader color="#E0A75E" />
      </div>
    );
  }

  if (filteredAndSortedOrders.length === 0) {
    return (
      <div className="text-gray-400 text-center mt-10">
        {debouncedSearchQuery ? t("noMatchResults") : t("noMatchResults")}
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
      <table className="bg-white min-w-full table">
        <thead>
          <tr>
            <th className="px-3 py-3 border-b text-left cursor-pointer">
              <p className="flex items-center gap-3">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
                {t("order")}
              </p>
            </th>
            <th className="px-3 py-3 text-left rtl:text-right border-l rtl:border-r">
              {t("date")}
            </th>
            <th className="px-3 py-3 text-left rtl:text-right border-l">
              {t("price")}
            </th>
            <th className="px-3 py-3 text-left rtl:text-right border-l">
              {t("items")}
            </th>
            <th className="px-3 py-3 text-left rtl:text-right border-l">
              <div className="flex items-center justify-between">
                <p>{t("payment")}</p>
                <div className="flex items-center gap-2">
                  {paymentFilter && (
                    <button
                      onClick={clearPaymentFilter}
                      className="text-primary text-13 flex items-center"
                      aria-label="Clear payment filter"
                    >
                      {t("clear")}
                    </button>
                  )}
                  <div ref={paymentDropdownRef} className="">
                    <button
                      className={`rounded-md p-2 ${
                        paymentFilter
                          ? "bg-customOrange-lightOrange text-primary rounded-md"
                          : "bg-customOrange-lightOrange text-primary"
                      }`}
                      onClick={() =>
                        setShowPaymentDropdown(!showPaymentDropdown)
                      }
                      aria-label="Filter by payment status"
                    >
                      <BsSortDown />
                    </button>
                    {showPaymentDropdown && (
                      <div className="absolute rtl:left-72 mt-0.5 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        {uniquePaymentStatuses.map((status) => (
                          <div
                            key={status}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-14 font-light"
                            onClick={() => {
                              setPaymentFilter(status);
                              setShowPaymentDropdown(false);
                            }}
                          >
                            {status === "paid"
                              ? t("paid")
                              : status === "unpaid"
                              ? t("unpaid")
                              : status}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </th>
            <th className="px-3 py-3 text-left rtl:text-right border-l">
              <div className="flex items-center justify-between">
                <p>{t("status")}</p>
                <div className="flex items-center gap-2">
                  {statusFilter && (
                    <button
                      onClick={clearStatusFilter}
                      className="text-primary text-13 flex items-center"
                      aria-label="Clear status filter"
                    >
                      {t("clear")}
                    </button>
                  )}
                  <div ref={statusDropdownRef}>
                    <button
                      className={`rounded-md p-2 ${
                        statusFilter
                          ? "bg-customOrange-lightOrange text-primary rounded-md"
                          : "bg-customOrange-lightOrange text-primary"
                      }`}
                      onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                      aria-label="Filter by order status"
                    >
                      <BsSortDown />
                    </button>
                    {showStatusDropdown && (
                      <div className="absolute left-14 mt-0.5 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        {uniqueOrderStatuses.map((status) => (
                          <div
                            key={status}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-14 font-light"
                            onClick={() => {
                              setStatusFilter(status);
                              setShowStatusDropdown(false);
                            }}
                          >
                            {status === "Preparing"
                              ? t("Preparing")
                              : status === "Refunded"
                              ? t("refund")
                              : status === "Pending"
                              ? t("pending")
                              : ""}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedOrders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() =>
                navigate(`/Dashboard/RecivedOrders/${order.id}`, {
                  state: {
                    status: order.status,
                    status_name: order.status_name,
                  },
                })
              }
            >
              <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                <p className="flex items-center gap-3">
                  <input type="checkbox" className="form-checkbox h-4 w-4" />
                  {order.order_number}
                </p>
              </td>
              <td className="flex items-center gap-2 px-3 py-3 border-t border-r rtl:border-r text-gray-600 text-13">
                <IoCalendarNumberOutline color="#69ABB5" size={15} />
                {order.date}
              </td>
              <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                {order.total} $
              </td>
              <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                {order.items_count}
              </td>
              <td className="px-3 py-3 border-t border-r w-56 text-14">
                <span
                  className={`${
                    order.payment_status === "paid"
                      ? "text-[#28A513] bg-[#E7F6E5] rounded-md p-2 rtl:py-0 "
                      : "bg-gray-100 text-gray-400 rounded-md p-2 rtl:py-0 "
                  }`}
                >
                  {order.payment_status === "paid"
                    ? t("paid")
                    : order.payment_status === "unpaid"
                    ? t("unpaid")
                    : t("notProvided")}
                </span>
              </td>
              <td className="px-3 py-3 rtl:border-r border-t w-56 text-14">
                <span
                  className={`${
                    order.status === 1
                      ? "bg-customOrange-lightOrange text-primary p-2 rtl:py-0 rounded-md"
                      : order.status === 8
                      ? "bg-red-50 text-red-600 rounded-md p-2 rtl:py-0"
                      : order.status === 2
                      ? "bg-orange-50 text-orange-400 rounded-md p-2 rtl:py-0"
                      : ""
                  }`}
                >
                  {order.status_name === "Preparing"
                    ? t("Preparing")
                    : order.status_name === "Refunded"
                    ? t("refund")
                    : order.status_name === "Pending"
                    ? t("pending")
                    : ""}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
