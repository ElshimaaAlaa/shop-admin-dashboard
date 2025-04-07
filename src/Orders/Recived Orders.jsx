import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MdOutlinePayment } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import { MdDone } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { PiClockCountdownLight } from "react-icons/pi";
import { TbReceiptRefund } from "react-icons/tb";
import { Search } from "lucide-react";
import { receivedOrders } from "../ApiServices/received-orders";
import { ClipLoader } from "react-spinners";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
function RecivedOrders() {
  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    total: 0,
    count: 0,
    per_page: 10,
    current_page: 1,
    total_pages: 1,
    next_page_url: null,
    prev_page_url: null,
  });
  const OrderItem = ({
    icon: Icon,
    title,
    totalNumber,
    percentage,
    duration,
  }) => (
    <div className="bg-white rounded-md border border-gray-200 flex-1 min-w-[200px]">
      <div className="flex items-center gap-3 bg-gray-100 rounded-tl-md rounded-tr-md  p-4 mb-5">
        <Icon className="text-2xl text-primary" />
        <h3 className="text-gray-500 text-15">{title}</h3>
      </div>
      <div className="flex items-center gap-4 ps-4 ">
        <h1 className="text-3xl font-bold">{totalNumber}</h1>
        <p
          className={`text-13 font-bold rounded-md p-1 ${
            percentage.includes("+")
              ? "text-[#34B41E] bg-[#E7F6E5]"
              : "text-red-600 bg-red-50"
          }`}
        >
          {percentage}
        </p>
      </div>
      <p className="text-xs text-gray-400 mt-3 mb-3 ps-4 ">{duration}</p>
    </div>
  );
  const filteredOrders = Array.isArray(orders)
    ? orders.filter(
        (order) =>
          String(order.order_number || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          String(order.status_name || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const fetchRecivedOrder = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await receivedOrders(pagination.current_page);
        setOrders(response.orders || []);
        setStatistics(response.statistics || []);
        console.log(response.statistics);
        setPagination(
          response.pagination || {
            total: response.orders?.length || 0,
            count: response.orders?.length || 0,
            per_page: 10,
            current_page: 1,
            total_pages: 1,
            next_page_url: null,
            prev_page_url: null,
          }
        );
      } catch (error) {
        console.error("API call failed: ", error);
        setError(true);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecivedOrder();
  }, [pagination.current_page]);

  const handlePageClick = ({ selected }) => {
    setPagination((prev) => ({
      ...prev,
      current_page: selected + 1,
    }));
  };
  return (
    <div className="bg-gray-100 min-h-[150vh] mx-10 pt-5">
      <Helmet>
        <title>Orders | VERTEX</title>
      </Helmet>
      <h1 className="font-bold text-17 bg-white mb-3 px-8 py-4 rounded-md">
        Received Orders
      </h1>

      <div className="bg-white rounded-md p-8 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <OrderItem
            icon={GoClockFill}
            title="Pending Orders"
            totalNumber={statistics.pending_payment?.change_rate}
            percentage={`${statistics.pending_payment?.current} % vs. previous month`}
            duration={`Last month: ${statistics.pending_payment?.previous}`}
          />
          <OrderItem
            icon={PiClockCountdownLight}
            title="Processing Orders"
            totalNumber={statistics.ongoing_orders?.change_rate}
            percentage={`${statistics.ongoing_orders?.current} % vs. previous month`}
            duration={`Last month: ${statistics.ongoing_orders?.previous}`}
          />
          <OrderItem
            icon={MdDone}
            title="Completed Orders"
            totalNumber={statistics.completed_orders?.change_rate}
            percentage={`${statistics.completed_orders?.current} % vs. previous month`}
            duration={`Last month: ${statistics.completed_orders?.previous}`}
          />
          <OrderItem
            icon={TbCancel}
            title="Cancelled Orders"
            totalNumber={statistics.cancelled_orders?.change_rate}
            percentage={`${statistics.cancelled_orders?.current} % vs. previous month`}
            duration={`Last month: ${statistics.cancelled_orders?.previous}`}
          />
          <OrderItem
            icon={MdOutlinePayment}
            title="Paid Orders"
            totalNumber={statistics.payment_refund?.change_rate}
            percentage={`${statistics.payment_refund?.current} % vs. previous month`}
            duration={`Last month: ${statistics.payment_refund?.previous}`}
          />
          <OrderItem
            icon={TbReceiptRefund}
            title="Refunded Orders"
            totalNumber={statistics.refund_orders?.change_rate}
            percentage={`${statistics.refund_orders?.current} % vs. previous month`}
            duration={`Last month: ${statistics.refund_orders?.previous}`}
          />
        </div>
        <h2 className="text-[18px] font-bold mt-5">Orders</h2>
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
        {error ? (
          <div className="text-red-500 text-center mt-10">
            Failed to fetch data. Please try again.
          </div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
            <p className="mt-2">Loading Received Orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery ? "No orders match your search." : "No orders found."}
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
                        aria-label="Select all categories"
                      />
                      Order
                    </p>
                  </th>
                  <th className="px-6 py-3 text-left border">Date</th>
                  <th className="px-6 py-3 text-left border">Price</th>
                  <th className="px-6 py-3 text-left border">Items</th>
                  <th className="px-6 py-3 text-left border">Payment</th>
                  <th className="px-6 py-3 text-left border">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={()=>navigate(`/Dashboard/RecivedOrders/${order.id}`)}
                  >
                    <td className="px-3 py-3 border-t border-r border-b text-gray-600 text-14">
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                        />
                        {order.order_number}
                      </p>
                    </td>
                    <td className="flex items-center gap-2 px-6 py-3 border-t border-r text-gray-600 text-14">
                      <IoCalendarNumberOutline color="#69ABB5" />
                      {order.date}
                    </td>
                    <td className="px-6 py-3 border-t border-r text-gray-600 text-14">
                      {order.total || "0.00"} $
                    </td>
                    <td className="px-6 py-3 border-t border-r text-gray-600 text-14">
                      {order.items_count || "0"}
                    </td>
                    <td className="px-6 py-3 border-t border-r">
                      <span
                        className={`px-2 py-2 rounded-md text-14 ${
                          order.payment_status === "unpaid"
                            ? "bg-gray-100 text-gray-400"
                            : order.payment_status === "paid"
                            ? "text-[#28A513] bg-[#E7F6E5]"
                            : order.payment_status === "refund"
                            ? "text-red-600 bg-red-50"
                            : ""
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-3 border-t">
                      <span
                        className={`px-2 py-2 rounded-md text-14 ${
                          order.status === 8
                            ? "bg-red-50 text-red-600"
                            : order.status === 2
                            ? "bg-customOrange-mediumOrange text-primary"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status_name || "Unknown"}
                      </span>
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
export default RecivedOrders;