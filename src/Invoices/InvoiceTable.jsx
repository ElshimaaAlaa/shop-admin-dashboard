import { useState, useRef, useEffect } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { BsSortDown } from "react-icons/bs";
import CustomCalendar from "../Coupons/CustomCalendar";

export const InvoiceTable = ({
  isLoading,
  error,
  currentItems,
  navigate,
  searchQuery,
}) => {
  const { t } = useTranslation();
  const [dateFilter, setDateFilter] = useState(null);
  const [paymentMethodFilter, setPaymentMethodFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPaymentMethodDropdown, setShowPaymentMethodDropdown] =
    useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const datePickerRef = useRef(null);
  const paymentMethodDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
      if (
        paymentMethodDropdownRef.current &&
        !paymentMethodDropdownRef.current.contains(event.target)
      ) {
        setShowPaymentMethodDropdown(false);
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

  // Get unique values for filters
  const uniquePaymentMethods = [
    "Cash",
    "Credit Card",
    "Bank Transfer",
    "PayPal",
  ];
  const uniqueStatuses = ["paid", "unpaid"];

  // Apply filters
  const filteredInvoices = currentItems.filter((invoice) => {
    const matchesDate = dateFilter
      ? new Date(invoice.date).toDateString() === dateFilter.toDateString()
      : true;

    const matchesPaymentMethod = paymentMethodFilter
      ? invoice.payment_method === paymentMethodFilter
      : true;

    const matchesStatus = statusFilter
      ? invoice.payment_status === statusFilter
      : true;

    return matchesDate && matchesPaymentMethod && matchesStatus;
  });

  // Clear filter functions
  const clearDateFilter = () => setDateFilter(null);
  const clearPaymentMethodFilter = () => setPaymentMethodFilter(null);
  const clearStatusFilter = () => setStatusFilter(null);

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

  // if (filteredInvoices.length === 0) {
  //   return (
  //     <div className="text-gray-400 text-center mt-10">
  //       {searchQuery ? t("noMatchResults") : t("noMatchResults")}
  //     </div>
  //   );
  // }

  return (
    <div className="border border-gray-200 rounded-lg mt-4 ">
      <table className="bg-white min-w-full table  relative">
        <thead>
          <tr>
            <th className="px-3 py-3 border-t border-b text-left cursor-pointer">
              <p className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4"
                  aria-label="Select all invoices"
                />
                {t("invoiceId")}
              </p>
            </th>
            <th className="px-3 py-3 text-left rtl:text-right border">
              {t("customer")}
            </th>
            <th className="px-3 py-3 text-left rtl:text-right border relative">
              <div className="flex items-center justify-between">
                <p>
                  {t("date")}
                  {dateFilter && `: ${dateFilter.toLocaleDateString()}`}
                </p>
                <div className="flex items-center gap-2">
                  {dateFilter && (
                    <button
                      onClick={clearDateFilter}
                      className="text-primary text-14 flex items-center"
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
            <th className="px-3 py-3 border text-left rtl:text-right relative">
              <div className="flex items-center justify-between">
                <p>
                  {t("payMethod")}
                </p>
                <div className="flex items-center gap-2">
                  {paymentMethodFilter && (
                    <button
                      onClick={clearPaymentMethodFilter}
                      className="text-primary text-14 flex items-center"
                      aria-label="Clear payment method filter"
                    >
                      {t(("clear"))}
                    </button>
                  )}
                  <div ref={paymentMethodDropdownRef} className="relative">
                    <button
                      className={`rounded-md p-2 ${
                        paymentMethodFilter
                          ? "bg-customOrange-lightOrange text-primary"
                          : "bg-customOrange-lightOrange text-primary"
                      }`}
                      onClick={() =>
                        setShowPaymentMethodDropdown(!showPaymentMethodDropdown)
                      }
                      aria-label="Filter by payment method"
                    >
                      <BsSortDown />
                    </button>
                    {showPaymentMethodDropdown && (
                      <div className="absolute rtl:left-1 mt-0.5 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        {uniquePaymentMethods.map((method) => (
                          <div
                            key={method}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-14 font-light"
                            onClick={() => {
                              setPaymentMethodFilter(method);
                              setShowPaymentMethodDropdown(false);
                            }}
                          >
                            {method}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </th>
            <th className="px-3 py-3 border text-left rtl:text-right ">
              <div className="flex items-center justify-between">
                <p>
                  {t("status")}
                  {statusFilter && `: ${statusFilter}`}
                </p>
                <div className="flex items-center gap-2">
                  {statusFilter && (
                    <button
                      onClick={clearStatusFilter}
                      className="text-primary text-14 flex items-center"
                      aria-label="Clear status filter"
                    >
                      {t("clear")}
                    </button>
                  )}
                  <div ref={statusDropdownRef}>
                    <button
                      className={`rounded-md p-2 ${
                        statusFilter
                          ? "bg-customOrange-lightOrange text-primary"
                          : "bg-customOrange-lightOrange text-primary"
                      }`}
                      onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                      aria-label="Filter by status"
                    >
                      <BsSortDown />
                    </button>
                    {showStatusDropdown && (
                      <div className="absolute rtl:left-3 mt-0.5 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        {uniqueStatuses.map((status) => (
                          <div
                            key={status}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-light text-14"
                            onClick={() => {
                              setStatusFilter(status);
                              setShowStatusDropdown(false);
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
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.id} className="border-t hover:bg-gray-50">
              <td
                className="px-3 py-3 border-t text-14 text-gray-600 border-r w-250 cursor-pointer"
                onClick={() => navigate(`/Dashboard/AllInvoices/${invoice.id}`)}
              >
                <p className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4"
                    aria-label="Select invoice"
                  />
                  {invoice.invoice_number || t("notProvided")}
                </p>
              </td>
              <td className="px-3 py-3 border-t text-gray-600 border-r text-14 w-250">
                {invoice.customer_name || t("notProvided")}
              </td>
              <td className="px-3 py-3 border-t text-gray-600 border-r text-13 w-250">
                <p className="flex items-center gap-2">
                  <IoCalendarNumberOutline size={17} color="#69ABB5" />
                  {invoice.date || t("notProvided")}
                </p>
              </td>
              <td className="px-3 py-3 border-t text-gray-600 border-r rtl:text-right text-14 w-36">
                {invoice.total || 0} $
              </td>
              <td className="text-left rtl:text-right border-r px-3 py-3 text-gray-600 text-14 w-60">
                {invoice.payment_method || t("notProvided")}
              </td>
              <td className="text-left text-14 px-3 py-3 rtl:border-r rtl:text-right w-60">
                <span
                  className={`${
                    invoice.payment_status === "paid"
                      ? "text-[#28A513] bg-[#E7F6E5] rounded-md p-2 rtl:py-0 "
                      : "bg-gray-100 text-gray-400 rounded-md p-2 rtl:py-0 "
                  }`}
                >
                  {invoice.payment_status === "paid"
                    ? t("paid")
                    : invoice.payment_status === "unpaid"
                    ? t("unpaid")
                    : t("notProvided")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
