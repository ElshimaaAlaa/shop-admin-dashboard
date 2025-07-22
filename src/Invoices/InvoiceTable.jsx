import { IoCalendarNumberOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
export const InvoiceTable = ({
  isLoading,
  error,
  currentItems,
  navigate,
  searchQuery,
}) => {
  const { t } = useTranslation();

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

  if (currentItems.length === 0) {
    return (
      <div className="text-gray-400 text-center mt-10">
        {searchQuery ? "No invoices match your search." : "No invoices found."}
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
      <table className="bg-white min-w-full table">
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
            <th className="px-3 py-3 text-left rtl:text-right border">
              {t("date")}
            </th>
            <th className="px-3 py-3 text-left rtl:text-right border">
              {t("price")}
            </th>
            <th className="px-3 py-3 border text-left rtl:text-right">
              {t("payMethod")}
            </th>
            <th className="px-3 py-3 border text-left rtl:text-right ">
              {t("status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((invoice) => (
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
              <td className="px-3 py-3 border-t text-gray-600 border-r rtl:text-right text-14 w-28">
                {invoice.total || 0} $
              </td>
              <td className="text-left rtl:text-right border-r px-3 py-3 text-gray-600 text-14">
                {t("notProvided")}
              </td>
              <td className="text-left px-3 py-3 rtl:border-r rtl:text-right">
                <span
                  className={`px-2 rtl:py-0 py-2  rounded-md text-14 ${
                    invoice.payment_status === "unpaid"
                      ? "bg-gray-100 text-gray-400"
                      : invoice.payment_status === "paid"
                      ? "text-[#28A513] bg-[#E7F6E5]"
                      : invoice.payment_status === "refund"
                      ? "text-red-600 bg-red-50"
                      : ""
                  }`}
                >
                  {invoice.payment_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
