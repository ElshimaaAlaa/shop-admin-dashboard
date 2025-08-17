import { useState, useRef, useEffect, useMemo } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { BsSortDown } from "react-icons/bs";
import DeleteMultipleRecivedOrders from "./DeleteMultipleRecivedOrders";
import CustomCalendar from "../Coupons/CustomCalendar";

export const OrdersTable = ({
  filteredOrders,
  isLoading,
  error,
  searchQuery,
  debouncedSearchQuery,
  onDeleteMultiple,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [paymentFilter, setPaymentFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const paymentDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const datePickerRef = useRef(null);

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
  useEffect(() => {
    if (showDeleteModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showDeleteModal]);
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
      const matchesDate = dateFilter
        ? new Date(order.date).toDateString() === dateFilter.toDateString()
        : true;
      return matchesPayment && matchesStatus && matchesDate;
    });
  }, [filteredOrders, paymentFilter, statusFilter, dateFilter]);

  // Check if only date filter is active
  const isOnlyDateFilterActive = useMemo(() => {
    return (
      dateFilter && !paymentFilter && !statusFilter && !debouncedSearchQuery
    );
  }, [dateFilter, paymentFilter, statusFilter, debouncedSearchQuery]);

  // Clear filter functions
  const clearPaymentFilter = () => {
    setPaymentFilter(null);
  };

  const clearStatusFilter = () => {
    setStatusFilter(null);
  };

  const clearDateFilter = () => {
    setDateFilter(null);
  };

  // Select all orders
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allOrderIds = filteredAndSortedOrders.map((order) => order.id);
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
  const handleDeleteMultiple = () => {
    onDeleteMultiple(selectedOrders);
    setSelectedOrders([]);
    setSelectAll(false);
    setShowDeleteModal(false);
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

  // Hide entire table if search has no results and it's not just date filter
  if (filteredAndSortedOrders.length === 0 && !isOnlyDateFilterActive) {
    return (
      <div className="text-gray-400 text-center mt-5 text-15">
        {t("noMatchResults")}
      </div>
    );
  }

  return (
    <>
      {selectedOrders.length > 0 && (
        <div className="mt-3 flex justify-between items-center bg-gray-50 p-3 rounded">
          <span>
            {t("selecting")}{" "}
            <span className="font-bold text-primary">
              {selectedOrders.length}{" "}
            </span>{" "}
            {t("items")}
          </span>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            {t("deleteAll")}
          </button>
        </div>
      )}

      <div className="border border-gray-200 rounded-lg mt-4">
        <table className="bg-white min-w-full table relative">
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
              <th className="px-3 py-3 text-left rtl:text-right border relative">
                <div className="flex items-center justify-between">
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
                    <div ref={datePickerRef} className="relative">
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
                        <div className="absolute rtl:left-1 mt-0.5 z-10">
                          <CustomCalendar
                            selectedDate={dateFilter}
                            onChange={(date) => {
                              setDateFilter(date);
                              setShowDatePicker(false);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </th>
              <th className="px-3 py-3 text-left rtl:text-right border">
                {t("price")}
              </th>
              <th className="px-3 py-3 text-left rtl:text-right border">
                {t("items")}
              </th>
              <th className="px-3 py-3 text-left rtl:text-right border">
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
              <th className="px-3 py-3 text-left rtl:text-right border">
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
                        onClick={() =>
                          setShowStatusDropdown(!showStatusDropdown)
                        }
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
            {filteredAndSortedOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-400 text-15 "
                >
                  {t("noMatchResults")}
                </td>
              </tr>
            ) : (
              filteredAndSortedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 cursor-pointer">
                  <td
                    className="px-3 py-3 border-t border-r text-gray-600 text-14"
                    onClick={() =>
                      navigate(`/Dashboard/RecivedOrders/${order.id}`, {
                        state: {
                          status: order.status,
                          status_name: order.status_name,
                        },
                      })
                    }
                  >
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="hidden peer"
                          checked={selectedOrders.includes(order.id)}
                          onChange={(e) => {
                            handleSelectOrder(order.id, e.target.checked);
                            e.stopPropagation();
                          }}
                          aria-label={`Select order ${order.order_number}`}
                          onClick={(e) => e.stopPropagation()}
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
                      {order.order_number}
                    </div>
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
              ))
            )}
          </tbody>
        </table>
      </div>
      <DeleteMultipleRecivedOrders
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteMultiple}
        count={selectedOrders.length}
      />
    </>
  );
};
