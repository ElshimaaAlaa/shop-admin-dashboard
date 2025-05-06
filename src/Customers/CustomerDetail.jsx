import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaShippingFast } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { TbInvoice } from "react-icons/tb";
import { IoCopyOutline } from "react-icons/io5";

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
      <div className="flex items-center gap-2 bg-gray-100 rounded-tl-md rounded-tr-md p-3">
        <Icon className="text-xl text-primary" />
        <h3 className="text-gray-600 text-14">{title}</h3>
      </div>
      <h1 className="text-xl font-bold px-4 py-4">$ {totalNumber}</h1>
    </div>
  );
  const copyPhoneNumber = () => {
    if (customerData.personal_info?.phone) {
      navigator.clipboard
        .writeText(customerData.personal_info?.phone)
        .then(() => {
          alert("Phone number copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy phone number: ", err);
          alert("Failed to copy phone number");
        });
    }
  };
  return (
    <div className="bg-gray-100 mx-5 py-5">
      <Helmet>
        <title>Customers Details | VERTEX</title>
      </Helmet>
      <section className="bg-white mb-3 p-5 rounded-md w-full">
        <p className="text-gray-400 text-12">
          Menu / Customers / Customer Details
        </p>
        <h1 className="font-bold text-17 mt-2">Customers Details</h1>
      </section>
      <section className="flex items-center justify-between rounded-md border-1 border-primary bg-customOrange-mediumOrange p-3 ">
        <h3 className="text-gray-600 text-15 flex items-center gap-1">
          <HiCurrencyDollar color="#E0A75E" size={30} />
          Current Balance
        </h3>
        <p className="font-bold text-xl">
          $ {customerData.personal_info?.balance}
        </p>
      </section>
      {/* end of balance */}
      <div className="mt-3 flex gap-4">
        {/* personal info section */}
        <div>
          <section className="rounded-md bg-white p-3 border border-gray-200 ">
            <h3 className="font-bold text-17">Personal Info</h3>
            <img
              src={customerData.personal_info?.image}
              alt="customer pic"
              className="rounded-md mt-4 w-300 h-52"
            />
            <div className="mt-4">
              <h4 className="text-gray-400 text-14">Name</h4>
              <p className="text-14">{customerData.personal_info?.name}</p>
            </div>
            <div className="mt-4">
              <h4 className="text-gray-400 text-14">Email</h4>
              <p className="text-14">{customerData.personal_info?.email}</p>
            </div>
            <div className="mt-4">
              <h4 className="text-gray-400 text-14">Phone</h4>
              <p className="text-14 flex items-center gap-2">
                {customerData.personal_info?.phone}
                {customerData.personal_info?.phone && (
                  <button
                    onClick={copyPhoneNumber}
                    className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                    title="Copy phone number"
                  >
                    <IoCopyOutline color="#E0A75E" size={15} />
                  </button>
                )}
              </p>
            </div>
          </section>
          <section className="rounded-md bg-white p-4 border-1 border-gray-200 mt-3">
            <h3 className="font-bold text-16">Shipping Address</h3>
            <p className="text-13 mt-3">
              {customerData.personal_info?.address || "No provided address"}
            </p>
          </section>
        </div>
        {/* end of personal info */}
        <div className="w-full">
          <section className="bg-white rounded-md border border-gray-200 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
            <Statistics
              icon={TbInvoice}
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
          <section className="bg-white border-gray-200 border rounded-md p-4 mt-3 w-full">
            <h3 className="font-bold text-16">Transaction History</h3>
            {error ? (
              <div className="text-red-500 text-center mt-10">
                Failed to fetch data. Please try again.
              </div>
            ) : isLoading ? (
              <div className="text-gray-400 text-center mt-10">
                <ClipLoader color="#E0A75E" />
              </div>
            ) : orders.length === 0 ? (
              <p className="text-center mt-10 text-gray-400">
                No Transaction data founded.
              </p>
            ) : (
              <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
                <table className="bg-white min-w-full table">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 border-t border-b text-left">
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
                        <td className=" px-3 py-3 border-t text-gray-600 text-14 border-r w-250">
                          {order.order_number}
                        </td>
                        <td className="px-3 py-3 border-t text-gray-500 border-r text-13 w-250">
                          <p className="flex items-center gap-2">
                            <IoCalendarNumberOutline
                              color="#69ABB5"
                              size={15}
                            />
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
