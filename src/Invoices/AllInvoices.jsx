import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { fetchInovices } from "../ApiServices/AllInovices";
import { BsClockFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import { ClipLoader } from "react-spinners";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { IoCalendarNumberOutline } from "react-icons/io5";

function AllInvoices() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState({
    paid_orders: { current: 0, previous: 0, change_rate: 0, increased: false },
    cancelled_orders: {
      current: 0,
      previous: 0,
      change_rate: 0,
      increased: false,
    },
    pending_payment: {
      current: 0,
      previous: 0,
      change_rate: 0,
      increased: false,
    },
  });
  const [invoicesData, setInvoicesData] = useState([]);

  const Statistics = ({
    icon: Icon,
    title,
    totalNumber,
    percentage,
    duration,
  }) => (
    <div className="bg-white rounded-md border border-gray-200 flex-1 min-w-[200px]">
      <div className="flex items-center gap-3 bg-gray-100 rounded-tl-md rounded-tr-md p-4 mb-5">
        <Icon className="text-2xl text-primary" />
        <h3 className="text-gray-600 text-14">{title}</h3>
      </div>
      <div className="flex items-center gap-4 ps-4">
        <h1 className="text-2xl font-bold">{totalNumber}</h1>
        <p
          className={`text-13 font-bold rounded-md p-1 ${
            percentage?.includes("+") || percentage?.includes("زيادة")
              ? "text-[#34B41E] bg-[#E7F6E5]"
              : "text-red-600 bg-red-50"
          }`}
        >
          {percentage}
        </p>
      </div>
      <p className="text-xs text-gray-400 mt-3 mb-3 ps-4">{duration}</p>
    </div>
  );

  useEffect(() => {
    const getInvoicesData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchInovices();
        setStatistics(
          response.statistics || {
            paid_orders: {
              current: 0,
              previous: 0,
              change_rate: 0,
              increased: false,
            },
            cancelled_orders: {
              current: 0,
              previous: 0,
              change_rate: 0,
              increased: false,
            },
            pending_payment: {
              current: 0,
              previous: 0,
              change_rate: 0,
              increased: false,
            },
          }
        );
        setInvoicesData(response.orders || []);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
        console.error(error);
      }
    };
    getInvoicesData();
  }, []);

  const filteredInvoices = useMemo(() => {
    if (!invoicesData || !Array.isArray(invoicesData)) return [];

    return invoicesData.filter(
      (invoice) =>
        invoice.payment_status
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        invoice.customer_name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        invoice.status_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [invoicesData, searchQuery]);

  const pageCount = Math.ceil(filteredInvoices.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return filteredInvoices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredInvoices, currentPage, itemsPerPage]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="bg-gray-100 pb-10 pt-3 flex flex-col min-h-[89vh] mx-3">
      <Helmet>
        <title>Invoices | vertex</title>
      </Helmet>
      <div className="rounded-md p-5 bg-white">
        <p className="text-gray-400 text-12">Menu / Invoices</p>
        <h1 className="mt-2 text-17 font-bold">Invoices</h1>
      </div>
      <div className="bg-white rounded-md p-4 mt-3">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Statistics
            icon={MdPayment}
            title="Paid Invoices"
            totalNumber={statistics.paid_orders.current || 0}
            percentage={`${statistics.paid_orders.change_rate || 0}% ${
              statistics.paid_orders.increased ? "+" : ""
            } vs. previous month`}
            duration={`Last month: ${statistics.paid_orders.previous || 0}`}
          />
          <Statistics
            icon={BsClockFill}
            title="Pending Invoices"
            totalNumber={statistics.pending_payment.current || 0}
            percentage={`${statistics.pending_payment.change_rate || 0}% ${
              statistics.pending_payment.increased ? "+" : ""
            } vs. previous month`}
            duration={`Last month: ${statistics.pending_payment.previous || 0}`}
          />
          <Statistics
            icon={TbCancel}
            title="Cancelled Invoices"
            totalNumber={statistics.cancelled_orders.current || 0}
            percentage={`${statistics.cancelled_orders.change_rate || 0}% ${
              statistics.cancelled_orders.increased ? "+" : ""
            } vs. previous month`}
            duration={`Last month: ${
              statistics.cancelled_orders.previous || 0
            }`}
          />
        </section>
        <section>
          <h3 className="text-16 font-bold my-3">Invoices</h3>
          <div className="relative w-full mt-3">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
              color="#E0A75E"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full pl-10 pr-4 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-2 border-gray-200 bg-gray-50 placeholder:text-15 focus:border-primary"
            />
          </div>
          {error ? (
            <div className="text-red-500 text-center mt-10">
              Failed to fetch data. Please try again.
            </div>
          ) : isLoading ? (
            <div className="text-gray-400 text-center mt-10">
              <ClipLoader color="#E0A75E" />
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="text-gray-400 text-center mt-10">
              {searchQuery
                ? "No invoices match your search."
                : "No invoices found."}
            </div>
          ) : (
            <>
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
                      <th className="px-3 py-3 border text-left">
                        Payment Method
                      </th>
                      <th className="px-3 py-3 border text-left ">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td
                          className="px-3 py-3 border-t text-14 text-gray-600 border-r w-250 cursor-pointer"
                          onClick={() =>
                            navigate(`/Dashboard/AllInvoices/${invoice.id}`)
                          }
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
                            <IoCalendarNumberOutline size={16} color="#69ABB5" />
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
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageClick}
                forcePage={currentPage}
                containerClassName="flex items-center justify-end mt-5 text-gray-500"
                pageClassName="mx-1 px-3 py-1 rounded"
                activeClassName="bg-customOrange-lightOrange text-primary"
                previousLabel={<ChevronLeft className="w-4 h-4 text-center" />}
                nextLabel={<ChevronRight className="w-4 h-4" />}
                previousClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
                nextClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
export default AllInvoices;