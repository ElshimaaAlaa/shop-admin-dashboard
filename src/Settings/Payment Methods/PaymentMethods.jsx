import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchPaymentMethods } from "../../ApiServices/PaymentMethods";
import { MdPayment } from "react-icons/md";
import DeletePayment from "./DletePayment";
import AddShippingProvider from "./AddPaymentMethods";

function PaymentMethods() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchPaymentMethods(searchQuery);
      setPaymentData(response.data || []);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      setError(true);
      setPaymentData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const filteredPaymentData = useMemo(() => {
    return paymentData.filter((payment) =>
      payment.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [paymentData, searchQuery]);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = currentPage * itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredPaymentData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredPaymentData, indexOfFirstItem, indexOfLastItem]);

  const pageCount = Math.ceil(filteredPaymentData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeleteSuccess = (deletedId) => {
    const updatedData = paymentData.filter((item) => item.id !== deletedId);
    setPaymentData(updatedData);
    
    if (currentItems.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    fetchData();
  };

  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  return (
    <div className="bg-gray-100 flex flex-col h-[89vh] ">
      <Helmet>
        <title>Payment Methods | vertex</title>
      </Helmet>
      <div className="rounded-md p-5 mx-7 bg-white mt-5">
        <p className="text-12 text-gray-400">Menu / Payment Methods</p>
        <h1 className="mt-3 text-17 font-bold">Payment Methods</h1>
      </div>
      <div className="rounded-md bg-customOrange-mediumOrange border mt-3 border-primary p-4 mx-7 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MdPayment color="#E0A75E" size={24} />
          <p className="text-gray-500 text-15">Payment Methods</p>
        </div>
        <p className="font-bold text-16">{filteredPaymentData.length}</p>
      </div>
      <div className="bg-white rounded-md p-5 mx-7 my-3">
        <SearchBar
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
          text={"Add Payment Method"}
          onclick={() => setShowModal(true)}
          value={searchQuery}
          onchange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(0); 
          }}
        />
        <AddShippingProvider
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            fetchData(); 
          }}
        />
        {error ? (
          <div className="text-red-500 text-center mt-10">
            Failed to fetch data. Please try again.
          </div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : filteredPaymentData.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery
              ? "No payment methods match your search."
              : "No payment methods found."}
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
                          aria-label="Select all categories"
                        />
                        Payment Methods
                      </p>
                    </th>
                    <th className="px-6 py-3 border text-center w-12">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-3 border-t text-14 border-r cursor-pointer">
                        <p className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label="Select all categories"
                          />
                          {item.name}
                        </p>
                      </td>
                      <td className="text-center px-3 py-3">
                        <div className="flex justify-center items-center">
                          <DeletePayment
                            id={item.id}
                            onDelete={handleDeleteSuccess}
                          />
                        </div>
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
      </div>
    </div>
  );
}

export default PaymentMethods;