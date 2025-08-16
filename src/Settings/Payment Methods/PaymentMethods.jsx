import { useEffect, useState, useMemo } from "react";
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
import { useTranslation } from "react-i18next";
import Header from "../../Components/Header/Header";
import Head from "../../Components/Head/Head";
import DeleteMultiplePayments from "./DeleteMultiplePayment";

function PaymentMethods() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

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
    setIsRTL(i18n.language === "ar");
  }, [searchQuery, i18n.language]);

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
    setSelectedPayments(prev => prev.filter(id => id !== deletedId));
    if (currentItems.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    fetchData();
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allPaymentIds = currentItems.map((payment) => payment.id);
      setSelectedPayments(allPaymentIds);
    } else {
      setSelectedPayments([]);
    }
  };

  const handleSelectPayment = (paymentId, isChecked) => {
    if (isChecked) {
      setSelectedPayments((prev) => [...prev, paymentId]);
    } else {
      setSelectedPayments((prev) => prev.filter((id) => id !== paymentId));
      setSelectAll(false);
    }
  };

  const handleDeleteMultiple = () => {
    setPaymentData((prevPayments) =>
      prevPayments.filter((payment) => !selectedPayments.includes(payment.id))
    );
    setSelectedPayments([]);
    setSelectAll(false);
    setShowDeleteAllModal(false);

    if (selectedPayments.length === currentItems.length && currentPage > 0) {
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
        <title>
          {t("paymentMethod")} | {t("vertex")}
        </title>
      </Helmet>
      <Header title={t("paymentMethod")} subtitle={t("paymentMethodMenu")} />
      <Head
        icon={MdPayment}
        title={t("shippingProvider")}
        value={filteredPaymentData.length}
        backgroundColor="bg-customOrange-mediumOrange"
        iconColor="#E0A75E"
      />
      <div className="bg-white rounded-md p-5 mx-5 my-3">
        <SearchBar
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
          text={t("addPay")}
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
          <div className="text-red-500 text-center mt-10">{t("error")}</div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : filteredPaymentData.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery ? t("noMatchResults") : t("noData")}
          </div>
        ) : (
          <>
            {selectedPayments.length > 0 && (
              <div className="mt-3 flex justify-between items-center bg-gray-50 p-3 rounded">
                <span className="text-gray-600">
                  {t("selecting")} {selectedPayments.length} {t("fromitems")}
                </span>
                <button
                  onClick={() => setShowDeleteAllModal(true)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  {t("deleteAll")}
                </button>
              </div>
            )}

            <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-t border-b text-left cursor-pointer">
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="hidden peer"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            aria-label="Select all payment methods"
                          />
                          <span
                            className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                              selectAll
                                ? "border-primary bg-primary"
                                : "border-gray-300"
                            }`}
                          >
                            {selectAll && (
                              <svg
                                className="w-3 h-3 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                              </svg>
                            )}
                          </span>
                        </label>
                        {t("paymentMethod")}
                      </div>
                    </th>
                    <th className="px-6 py-3 border text-center w-12">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-3 border-t text-14 border-r cursor-pointer">
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="hidden peer"
                              checked={selectedPayments.includes(item.id)}
                              onChange={(e) =>
                                handleSelectPayment(item.id, e.target.checked)
                              }
                              aria-label="Select payment method"
                            />
                            <span
                              className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                                selectedPayments.includes(item.id)
                                  ? "border-primary bg-primary"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedPayments.includes(item.id) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                </svg>
                              )}
                            </span>
                          </label>
                          {item.name}
                        </div>
                      </td>
                      <td className="text-center px-3 py-3 bordr-l border-r">
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
              containerClassName="flex items-center justify-end mt-5 text-gray-400 text-14"
              pageClassName="mx-1 px-3 py-1 rounded"
              activeClassName="bg-customOrange-lightOrange text-primary"
              previousLabel={
                isRTL ? (
                  <ChevronRight className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-center text-primary" />
                )
              }
              nextLabel={
                isRTL ? (
                  <ChevronLeft className="w-5 h-5 text-center text-primary" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-primary" />
                )
              }
              previousClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
              nextClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
            />
          </>
        )}
      </div>
      <DeleteMultiplePayments
        isOpen={showDeleteAllModal}
        onClose={() => setShowDeleteAllModal(false)}
        onConfirm={handleDeleteMultiple}
        count={selectedPayments.length}
      />
    </div>
  );
}
export default PaymentMethods;