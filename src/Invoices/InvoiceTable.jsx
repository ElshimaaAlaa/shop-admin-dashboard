import { IoCalendarNumberOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export const InvoiceTable = ({
  isLoading,
  error,
  currentItems,
  navigate,
  searchQuery,
}) => {
  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to fetch data. Please try again.
      </div>
    );
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
                Invoice ID
              </p>
            </th>
            <th className="px-3 py-3 text-left border">Customer</th>
            <th className="px-3 py-3 text-left border">Date</th>
            <th className="px-3 py-3 text-left border">Price</th>
            <th className="px-3 py-3 border text-left">Payment Method</th>
            <th className="px-3 py-3 border text-left ">Status</th>
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
                  {invoice.invoice_number || "N/A"}
                </p>
              </td>
              <td className="px-3 py-3 border-t text-gray-600 border-r text-15 w-250">
                {invoice.customer_name || "N/A"}
              </td>
              <td className="px-3 py-3 border-t text-gray-600 border-r text-13 w-250">
                <p className="flex items-center gap-2">
                  <IoCalendarNumberOutline size={17} color="#69ABB5" />
                  {invoice.date || "N/A"}
                </p>
              </td>
              <td className="px-3 py-3 border-t text-gray-600 border-r text-15 w-28">
                {invoice.total || 0} $
              </td>
              <td className="text-left border-r px-3 py-3 text-gray-600 text-15">
                {"N/A"}
              </td>
              <td className="text-left px-3 py-3">
                <span
                  className={`px-2 py-2 rounded-md text-14 ${
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
