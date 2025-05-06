import React, { useEffect, useState, useMemo } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { IoHelpCircleOutline } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getCustomers } from "../ApiServices/AllCustomers";
import { ClipLoader } from "react-spinners";
import DeleteCustomer from "./DeleteCustomer";
import { IoCalendarNumberOutline } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { RiUser3Fill } from "react-icons/ri";
import StatisticsCard from "../Pages/Dashboard/ReportItems";
import { IoCopyOutline } from "react-icons/io5";

function AllCustomers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const [statistics, setStatistics] = useState({
    customers: {},
    contacts: {},
    payments: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await getCustomers(searchQuery);
      const data = response?.data || response;

      setCustomers(data?.orders || []);
      setStatistics(
        data?.statistics || {
          customers: {},
          contacts: {},
          payments: {},
        }
      );
      setIsLoading(false);
    } catch (error) {
      console.error("API call failed: ", error);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchQuery]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (customer) =>
        customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone?.includes(searchQuery)
    );
  }, [customers, searchQuery]);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = currentPage * itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredCustomers, indexOfFirstItem, indexOfLastItem]);

  const pageCount = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeleteSuccess = (deletedId) => {
    const updatedData = customers.filter((item) => item.id !== deletedId);
    setCustomers(updatedData);
    if (currentItems.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    fetchCustomers();
  };
  const copyPhoneNumber = () => {
    if (customers.phone) {
      navigator.clipboard
        .writeText(customers.phone)
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
    <div className="bg-gray-100 min-h-screen pb-10 mx-5 pt-5">
      <Helmet>
        <title>Customers | VERTEX</title>
      </Helmet>
      <section className="bg-white mb-3 p-4 rounded-md flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-12">Menu / Customers </p>
          <h1 className="font-bold text-17 mt-2">Customers</h1>
        </div>
        <button
          className="flex items-center gap-1 font-bold text-white bg-primary rounded-md p-4"
          onClick={() => navigate("/Dashboard/SupportQuestion")}
        >
          <IoHelpCircleOutline size={27} />
          Customers Support Questions
        </button>
      </section>
      <section className="bg-white rounded-md p-4 mb-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <StatisticsCard
          icon={RiUser3Fill}
          title="All Customers"
          totalNumber={statistics.customers?.change_rate || 0}
          percentage={`${
            statistics.customers?.current_month_count || 0
          }% vs. previous month`}
          duration={`Last month: ${
            statistics.customers?.previous_month_count || 0
          }`}
        />
        <StatisticsCard
          icon={BiSupport}
          title="Support Requests"
          totalNumber={statistics.contacts?.change_rate || 0}
          percentage={`${
            statistics.contacts?.current_month_count || 0
          }% vs. previous month`}
          duration={`Last month: ${
            statistics.contacts?.previous_month_count || 0
          }`}
        />
        <StatisticsCard
          icon={FaSackDollar}
          title="Payments"
          totalNumber={statistics.payments?.change_rate || 0}
          percentage={`${
            statistics.payments?.current_month_count || 0
          }% vs. previous month`}
          duration={`Last month: ${
            statistics.payments?.previous_month_count || 0
          }`}
        />
      </section>
      <section className="bg-white rounded-md p-4">
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
        ) : filteredCustomers.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery
              ? "No customers match your search."
              : "No customers found."}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-15 border-t border-b text-left cursor-pointer">
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all categories"
                        />
                        Customer
                      </p>
                    </th>
                    <th className="px-3 py-3 text-15 text-left border ">
                      Phone Number
                    </th>
                    <th className="px-3 py-3 text-15 text-left border">
                      Joining Date
                    </th>
                    <th className="px-3 py-3 text-15 text-left border">
                      Spent
                    </th>
                    <th className="px-3 py-3 text-15border text-center w-20">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((customer) => (
                    <tr key={customer.id} className="border-t hover:bg-gray-50">
                      <td
                        className="px-3 py-3 border-t text-15 border-r w-250 cursor-pointer"
                        onClick={() =>
                          navigate(`/Dashboard/AllCustomers/${customer.id}`)
                        }
                      >
                        <p className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label="Select all categories"
                          />
                          {customer.name}
                        </p>
                        <p className="text-gray-600 ms-7 text-13">
                          {customer.email}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t text-gray-600 border-r text-14 w-250">
                        <p className="flex items-center gap-2">
                          {customer.phone || "N/A"}
                          {customer?.phone && (
                            <button
                              onClick={copyPhoneNumber}
                              className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                              title="Copy phone number"
                            >
                              <IoCopyOutline color="#E0A75E" size={15} />
                            </button>
                          )}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t text-gray-500 border-r text-13 w-250">
                        <p className="flex items-center gap-2">
                          <IoCalendarNumberOutline color="#69ABB5" size={17} />
                          {customer.joining_date || "N/A"}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t text-gray-600 border-r text-15 w-250">
                        {customer.spent || 0} $
                      </td>
                      <td className="text-center px-3 py-3">
                        <DeleteCustomer
                          id={customer.id}
                          onDelete={handleDeleteSuccess}
                        />
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
  );
}
export default AllCustomers;