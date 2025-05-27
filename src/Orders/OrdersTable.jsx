import { IoCalendarNumberOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { StatusDisplay } from "./StatusDisplay";

export const OrdersTable = ({
  filteredOrders,
  isLoading,
  error,
  searchQuery,
  debouncedSearchQuery,
}) => {
  const navigate = useNavigate();

  if (error) {
    return <div className="text-red-500 text-center mt-10">Failed to fetch data. Please try again.</div>;
  }

  if (isLoading) {
    return <div className="text-gray-400 text-center mt-10"><ClipLoader color="#E0A75E" /></div>;
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="text-gray-400 text-center mt-10">
        {debouncedSearchQuery ? "No orders match your search." : "No orders found."}
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
      <table className="bg-white min-w-full table">
        <thead>
          <tr>
            <th className="px-3 py-3  border-b text-left cursor-pointer">
              <p className="flex items-center gap-3">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
                Order
              </p>
            </th>
            <th className="px-3 py-3 text-left border-l">Date</th>
            <th className="px-3 py-3 text-left border-l">Price</th>
            <th className="px-3 py-3 text-left border-l">Items</th>
            <th className="px-3 py-3 text-left border-l">Payment</th>
            <th className="px-3 py-3 text-left border-l">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/Dashboard/RecivedOrders/${order.id}`, {
                state: { status: order.status, status_name: order.status_name }
              })}
            >
              <td className="px-3 py-3 border-t border-r  text-gray-600 text-14">
                {order.order_number}
              </td>
              <td className="flex items-center gap-2 px-3 py-3 border-t border-r text-gray-600 text-13">
                <IoCalendarNumberOutline color="#69ABB5" size={15} />
                {order.date}
              </td>
              <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                {order.total} $
              </td>
              <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                {order.items_count}
              </td>
              <td className="px-3 py-3 border-t border-r w-36">
                <StatusDisplay 
                  statusName={order.payment_status} 
                  status={order.payment_status === "paid" ? 2 : 1}
                />
              </td>
              <td className="px-3 py-3 border-t w-36">
                <StatusDisplay status={order.status} statusName={order.status_name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};