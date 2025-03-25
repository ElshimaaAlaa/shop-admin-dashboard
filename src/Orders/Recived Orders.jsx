import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { HiCalendarDateRange } from "react-icons/hi2";
import { CiImport } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import { MdDone } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { PiClockCountdownLight } from "react-icons/pi";
import { TbReceiptRefund } from "react-icons/tb";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
function RecivedOrders() {
  const [searchQuery, setSeaechQuery] = useState(null);
  const navigate = useNavigate();
  const OrderItem = ({
    icon: Icon,
    title,
    totalNumber,
    percentage,
    duration,
  }) => (
    <div className="bg-white rounded-md border border-gray-200 flex-1 min-w-[200px]">
      <div className="flex items-center gap-3 bg-gray-100 rounded-tl-md rounded-tr-md mb-3 p-4">
        <Icon className="text-2xl text-primary" />
        <h3 className="text-gray-600 text-16">{title}</h3>
      </div>
      <div className="flex items-center gap-4 ps-4 ">
        <h1 className="text-3xl font-bold mt-3">{totalNumber}</h1>
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
  return (
    <div className="bg-gray-100 min-h-[150vh] mx-10 pt-5">
      <Helmet>
        <title>Orders | VERTEX</title>
      </Helmet>
      <h1 className="font-bold text-17 bg-white mb-3 p-4 rounded-md">
        Received Orders
      </h1>

      <div className="bg-white rounded-md p-4 mb-5">
        <div className="flex items-center justify-end gap-4 mb-5">
          <button className="flex items-center gap-2 border-1 border-primary text-primary p-3 rounded-md">
            <HiCalendarDateRange size={22} />
            Select Date
          </button>
          <button className="flex items-center gap-2 bg-primary text-white p-3 rounded-md">
            <CiImport size={22} />
            Import Orders
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <OrderItem
            icon={GoClockFill}
            title="Pending Orders"
            totalNumber="142"
            percentage="+5% vs. previous month"
            duration="Last month: 200
"
          />
          <OrderItem
            icon={PiClockCountdownLight}
            title="Processing Orders"
            totalNumber="45"
            percentage="+5% vs. previous month"
            duration="Last month: 200
"
          />
          <OrderItem
            icon={MdDone}
            title="Completed Orders"
            totalNumber="287"
            percentage="-5% vs. previous month"
            duration="Last month: 200
"
          />
          <OrderItem
            icon={TbCancel}
            title="Cancelled Orders"
            totalNumber="24"
            percentage="-5% vs. previous month"
            duration="Last month: 200
"
          />
          <OrderItem
            icon={MdOutlinePayment}
            title="Paid Orders"
            totalNumber="312"
            percentage="+5% vs. previous month"
            duration="Last month: 200
"
          />
          <OrderItem
            icon={TbReceiptRefund}
            title="Refunded Orders"
            totalNumber="18"
            percentage="+5% vs. previous month"
            duration="Last month: 200
"
          />
        </div>
        <h1 className="font-bold text-17 mt-5">Orders</h1>
        <div className="relative w-full mt-3">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
            color="#E0A75E"
          />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSeaechQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-2 border-gray-200 bg-lightgray placeholder:text-15 focus:border-primary"
          />
        </div>
        <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
          <table className="bg-white min-w-full table">
            <thead>
              <tr>
                <th className="px-3 py-3 border-t border-b text-left cursor-pointer" onClick={()=>navigate(`/Home/RecivedOrders/OrderDetails`)}>
                  <p className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4"
                      aria-label="Select all categories"
                    />
                    Order
                  </p>
                </th>
                <th className="px-6 py-3 text-left border ">
                  <p className="flex justify-between items-center">Date</p>
                </th>
                <th className="px-6 py-3 text-left border">
                  <p className="flex justify-between items-center">Price</p>
                </th>
                <th className="px-6 py-3 text-left border">Items</th>
                <th className="px-6 py-3 text-left border">Payment</th>
                <th className="px-6 py-3 text-left border">Status</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}
export default RecivedOrders;