import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaShippingFast } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { ClipLoader } from "react-spinners";
import { IoCalendarNumberOutline } from "react-icons/io5";

function CustomerDetail() {
  const [customerData, setCustomerData] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const { customerId } = useParams();
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  useEffect(() => {
    const CustomerDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios({
          url: `${API_BASE_URL}${live_shop_domain}/api/${role}/customers/${customerId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setIsLoading(false);
          setCustomerData(response.data.data);
          setStatistics(response.data.data.statistics);
          setOrders(response.data.data.orders);
          console.log("Customer Data:", response.data.data);
        } else {
          console.error("Failed to fetch data");
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to fetch Customer", error);
      }
    };
    CustomerDetails();
  }, [customerId, live_shop_domain, role]);

  const Statistics = ({ icon: Icon, title, totalNumber }) => (
    <div className="bg-white rounded-md border border-gray-200 flex-1 min-w-[200px]">
      <div className="flex items-center gap-3 bg-gray-100 rounded-tl-md rounded-tr-md p-4">
        <Icon className="text-2xl text-primary" />
        <h3 className="text-gray-500 text-15">{title}</h3>
      </div>
      <h1 className="text-2xl font-bold px-4 py-4">$ {totalNumber}</h1>
    </div>
  );
  return (
    <div className="bg-gray-100 pb-5 mx-10 pt-5">
      <Helmet>
        <title>Customers Details | VERTEX</title>
      </Helmet>

      <div className="bg-white mb-3 p-4 rounded-md  w-full">
        <p className="text-gray-400 text-12">Menu / Customers / Customer Details </p>
        <h1 className="font-bold text-17 mt-2">Customers Details</h1>
      </div>
      <div className="flex items-center justify-between rounded-lg border-primary bg-customOrange-mediumOrange p-4 ">
        <h3 className="text-gray-600 text-15 flex items-center gap-2">
          <HiCurrencyDollar color="#E0A75E" size={30} />
          Current Balance
        </h3>
        <p className="font-bold text-xl">
          $ {customerData.personal_info?.balance}
        </p>
      </div>
      {/* end of balance */}
      <div className="mt-5 flex  gap-4">
        {/* personal info section */}
        <div>
          <section className="rounded-md bg-white p-4 border-2 border-gray-100 ">
            <h3 className="font-bold text-17">Personal Info</h3>
            <img
              src={customerData.personal_info?.image}
              alt="customer pic"
              className="rounded-md mt-4 w-72 h-52"
            />
            <div className="mt-4">
              <h4 className="text-gray-400">Name</h4>
              <p className="text-14">{customerData.personal_info?.name}</p>
            </div>
            <div className="mt-4">
              <h4 className="text-gray-400">Email</h4>
              <p className="text-14">{customerData.personal_info?.email}</p>
            </div>
            <div className="mt-4">
              <h4 className="text-gray-400">Phone</h4>
              <p className="text-14">{customerData.personal_info?.phone}</p>
            </div>
          </section>
          <section className="rounded-md bg-white p-4 border-2 border-gray-100 mt-3">
            <h3 className="font-bold text-17">Shipping Address</h3>
            <p className="text-13 mt-3">
              {customerData.personal_info?.address || "No provided address"}
            </p>
          </section>
        </div>
        {/* end of personal info */}
        <div>
          <section className="bg-white rounded-md p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
            <Statistics
              icon={LiaFileInvoiceSolid}
              title="Total Invoices"
              totalNumber={statistics?.orders_count}
            />
            <Statistics
              icon={FaShippingFast}
              title="Total Orders"
              totalNumber={statistics?.invoices_count}
            />
            <Statistics
              icon={FaSackDollar}
              title="Total Expense"
              totalNumber={statistics?.total_spent}
            />
          </section>
          {/* Transaction History */}
          <section className="bg-white rounded-md p-4 mt-4 w-full">
            <h3 className="font-bold text-17">Transaction History</h3>
            {error ? (
              <div className="text-red-500 text-center mt-10">
                Failed to fetch data. Please try again.
              </div>
            ) : isLoading ? (
              <div className="text-gray-400 text-center mt-10">
                <ClipLoader color="#E0A75E" />
              </div>
            ) : orders.length === 0 ? (
              <p className="text-center mt-10 text-gray-400">No Transaction data founded.</p>
            ) : (
              <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
                <table className="bg-white min-w-full table">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 border-t border-b text-left cursor-pointer">
                        Invoice ID
                      </th>
                      <th className="px-3 py-3 text-left border">Date</th>
                      <th className="px-3 py-3 text-left border">Price</th>
                      <th className="px-3 py-3 border text-left w-20">Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.id} className="border-t hover:bg-gray-50">
                        <td className=" px-3 py-3 border-t text-gray-600 text-14 border-r w-250 cursor-pointer">
                          {order.order_number}
                        </td>
                        <td className="px-3 py-3 border-t text-gray-600 border-r text-14 w-250">
                          <p className="flex items-center gap-2">
                            <IoCalendarNumberOutline color="#69ABB5" />
                            {order.date}
                          </p>
                        </td>
                        <td className="px-3 py-3 border-t text-gray-600 border-r text-15 w-250">
                          {order.total} $
                        </td>
                        <td className="px-3 py-3 border-t text-gray-600 border-r text-15 w-250">
                          {order.payment_method || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
export default CustomerDetail;
