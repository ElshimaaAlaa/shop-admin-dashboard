import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Search } from "lucide-react";
import AcceptRefundRequests from "./Accept Refund Requests";
import RejectRefundRequests from "./Reject Refund Requests";
import { refundrequests } from "../ApiServices/refund-requests";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoCalendarNumberOutline } from "react-icons/io5";

function RefundRequests() {
  const [refundOrders, setRefundOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    count: 0,
    per_page: 10,
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
        setRefundOrders(response.data || []);
        if (response.data && response.data.length > 0) {
          localStorage.setItem("refundId", response.data[0].id);
          localStorage.setItem("refundStatus", response.data[0].status);
          localStorage.setItem("refundAmount", response.data[0].amount);
          console.log("refundId", response.data[0].id);
          console.log("refund status", response.data[0].status);
        }
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
  }, []);

  const filteredOrders = refundOrders.filter(
    (order) =>
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.refund_reason.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handlePageClick = ({ selected }) => {
    setPagination((prev) => ({
      ...prev,
      current_page: selected + 1,
    }));
  };
  return (
    <div className="bg-gray-100 min-h-[150vh] mx-10 pt-5">
      <Helmet>
        <title>Refund Requests | VERTEX</title>
      </Helmet>

      <h1 className="font-bold text-17 bg-white mb-3 p-4 rounded-md flex justify-between items-center">
        Refund Requests
      </h1>

      <div className="bg-white p-4 rounded-md">
        <div className="relative w-full mt-3">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
            color="#E0A75E"
          />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-2 border-gray-200 bg-lightgray placeholder:text-15 focus:border-primary"
          />
        </div>

        <h2 className="font-bold text-17 mt-4">Refund Requests</h2>

        {isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
            <p className="mt-2">Loading Refunded Requests...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-10">
            Failed to fetch data. Please try again.
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">
            No refund requests found.
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
            <table className="bg-white min-w-full table">
              <thead>
                <tr>
                  <th className="px-3 py-3 border-t border-b text-left cursor-pointer">
                    <p className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                        aria-label="Select all orders"
                      />
                      Order
                    </p>
                  </th>
                  <th className="px-6 py-3 text-left border">Date</th>
                  <th className="px-6 py-3 text-left border">Price</th>
                  <th className="px-6 py-3 text-left border">Reason</th>
                  <th className="px-6 py-3 text-left border w-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
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
                    <td className="px-6 py-3 border-t text-14 text-gray-600 flex items-center gap-2">
                      <IoCalendarNumberOutline color="#69ABB5" />
                      {order.request_refund_date}
                    </td>
                    <td className="px-6 py-3 border-t border-l text-gray-600 text-14">
                      {order.total} $
                    </td>
                    <td className="px-2 py-3 border-t border-l text-gray-600">
                      <p className="bg-customOrange-mediumOrange text-primary rounded-md p-2 text-14">
                        {order.refund_reason || "Not specified"}
                      </p>
                    </td>
                    <td className="px-6 py-3 w-10 border-t border-l">
                      <div className="flex items-center gap-3">
                        <AcceptRefundRequests
                          orderId={order.id}
                          currentStatus={order.status}
                          amount={order.total}
                        />
                        <RejectRefundRequests
                          orderId={order.id}
                          orderStatus={order.status}
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
          containerClassName="flex items-center justify-end mt-5 space-x-1"
          pageClassName="px-3 py-1 rounded hover:bg-gray-200"
          activeClassName="bg-customOrange-lightOrange text-primary"
          previousLabel={<ChevronLeft className="w-4 h-4" />}
          nextLabel={<ChevronRight className="w-4 h-4" />}
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
