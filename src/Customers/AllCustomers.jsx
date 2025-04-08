import React, { useEffect, useState } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { IoHelpCircleOutline } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getCustomers } from "../ApiServices/AllCustomers";
import { ClipLoader } from "react-spinners";
import DeleteCustomer from "./DeleteCustomer";
const CustomerItem = ({
  icon: Icon,
  title,
  totalNumber,
  percentage,
  duration,
}) => (
  <div className="bg-white rounded-md border border-gray-200 flex-1 min-w-[200px]">
    <div className="flex items-center gap-3 bg-gray-100 rounded-tl-md rounded-tr-md p-4 mb-5">
      <Icon className="text-2xl text-primary" />
      <h3 className="text-gray-500 text-15">{title}</h3>
    </div>
    <div className="flex items-center gap-4 ps-4">
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
    <p className="text-xs text-gray-400 mt-3 mb-3 ps-4">{duration}</p>
  </div>
);

function AllCustomers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        const data = await getCustomers();
        setCustomers(data.orders);
        setStatistics(data.statistics);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.error("API call failed: ", error);
        setError(true);
      }
    };
    fetchCustomers();
  }, []);
  const handleDeleteCustomer = (customerId) => {
    setCustomers((prevCustomer) =>
      prevCustomer.filter((customer) => customer.id !== customerId)
    );
  };
  return (
    <div className="bg-gray-100 min-h-[150vh] pb-10 mx-10 pt-5">
      <Helmet>
        <title>Customers | VERTEX</title>
      </Helmet>

      <div className="bg-white mb-3 p-4 rounded-md flex justify-between items-center">
        <h1 className="font-bold text-17">Customers</h1>
        <button
          className="flex items-center gap-2 text-white bg-primary rounded-md p-4"
          onClick={() => navigate("/Dashboard/Support")}
        >
          <IoHelpCircleOutline size={22} />
          Customers Support Questions
        </button>
      </div>

      <div className="bg-white rounded-md p-4 mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CustomerItem
          icon={BsPeopleFill}
          title="All Customers"
          totalNumber={statistics?.customers?.change_rate}
          percentage={`${statistics.customers?.current_month_count} % vs. previous month`}
          duration={`last month: ${statistics?.customers?.previous_month_count}`}
        />
        <CustomerItem
          icon={BiSupport}
          title="Support Requests"
          totalNumber={statistics?.contacts?.change_rate}
          percentage={`${statistics.contacts?.current_month_count} % vs. previous month`}
          duration={`last month: ${statistics?.contacts?.previous_month_count}`}
        />
        <CustomerItem
          icon={FaSackDollar}
          title="Payments"
          totalNumber={statistics?.payments?.change_rate}
          percentage={`${statistics.payments?.current_month_count} % vs. previous month`}
          duration={`last month: ${statistics?.payments?.previous_month_count}`}
        />
      </div>
      <div className="bg-white rounded-md p-4">
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
            <p className="mt-2">Loading Customers Data...</p>
          </div>
        ) : customers?.length === 0 ? (
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
                      Customer
                    </p>
                  </th>
                  <th className="px-6 py-3 text-left border">Phone Number</th>
                  <th className="px-6 py-3 text-left border">Joining Date</th>
                  <th className="px-6 py-3 text-left border">Spent</th>
                  <th className="px-6 py-3 border text-center w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={customer.id} className="border-t hover:bg-gray-50">
                    <td className=" px-3 py-3 border-t text-14 border-r w-250 cursor-pointer" onClick={()=>navigate(`/Dashboard/AllCustomers/${customer.id}`)}>
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all categories"
                        />
                        {customer.name}
                      </p>
                      <p className="text-gray-600 ms-6 text-13">
                        {customer.email}
                      </p>
                    </td>
                    <td className="px-3 py-3 border-t text-gray-600 border-r text-15 w-250">
                      {customer.phone}
                    </td>
                    <td className="px-3 py-3 border-t text-gray-600 border-r text-15 w-250">
                      {customer.joining_date}
                    </td>
                    <td className="px-3 py-3 border-t text-gray-600 border-r text-15 w-250">
                      ${customer.spent}
                    </td>
                    <td className="text-center px-3 py-3">
                      <DeleteCustomer
                        id={customer.id}
                        onDelete={handleDeleteCustomer}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
export default AllCustomers;
