/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { fetchShippingProviders } from "../../ApiServices/ShippingProviders";
import DeleteShipping from "./DeleteShipping";
import AddShippingProvider from "./AddShippingProvider";
import { FaShippingFast } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Head from "../../Components/Head/Head";
import Header from "../../Components/Header/Header";
import Pagination from "../../Components/Pagination/Pagination";
import DeleteMultipleProviders from "./DeleteMultipleProviders";

function ShippingProviders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shippingData, setShippingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [selectedShippings, setSelectedShippings] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchShippingProviders(searchQuery);
      setShippingData(response.data || []);
    } catch (error) {
      console.error("Error fetching shipping providers:", error);
      setError(true);
      setShippingData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, i18n.language]);

  const filteredShippingData = useMemo(() => {
    return shippingData.filter((shipping) =>
      shipping.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [shippingData, searchQuery]);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = currentPage * itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredShippingData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredShippingData, indexOfFirstItem, indexOfLastItem]);

  const pageCount = Math.ceil(filteredShippingData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeleteSuccess = (deletedId) => {
    const updatedData = shippingData.filter((item) => item.id !== deletedId);
    setShippingData(updatedData);
    setSelectedShippings(prev => prev.filter(id => id !== deletedId));
    if (currentItems.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    fetchData();
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allShippingIds = currentItems.map((shipping) => shipping.id);
      setSelectedShippings(allShippingIds);
    } else {
      setSelectedShippings([]);
    }
  };

  const handleSelectShipping = (shippingId, isChecked) => {
    if (isChecked) {
      setSelectedShippings((prev) => [...prev, shippingId]);
    } else {
      setSelectedShippings((prev) => prev.filter((id) => id !== shippingId));
      setSelectAll(false);
    }
  };

  const handleDeleteMultiple = () => {
    setShippingData((prevShippings) =>
      prevShippings.filter((shipping) => !selectedShippings.includes(shipping.id))
    );
    setSelectedShippings([]);
    setSelectAll(false);
    setShowDeleteAllModal(false);

    if (selectedShippings.length === currentItems.length && currentPage > 0) {
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
    <div className="bg-gray-100 pb-10 flex flex-col h-[89vh] ">
      <Helmet>
        <title>
          {t("shippingProvider")} | {t("vertex")}
        </title>
      </Helmet>
      <Header title={t("shippingProvider")} subtitle={t("shippingMenu")} className="mx-5 mt-5 mb-4"/>
      <Head
        icon={FaShippingFast}
        title={t("shippingProvider")}
        value={shippingData.length}
        backgroundColor="bg-customOrange-mediumOrange"
        iconColor="#E0A75E"
        className="mx-5 mb-1"
      />
      <section className="bg-white rounded-md p-5 mx-5 my-2">
        <SearchBar
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
          text={t("addShipping")}
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
        ) : filteredShippingData.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery ? t("noMatchResults") : t("noData")}
          </div>
        ) : (
          <>
            {selectedShippings.length > 0 && (
              <div className="mt-3 flex justify-between items-center bg-gray-50 p-3 rounded">
                <span>
                  {t("selecting")} <span className="font-bold text-primary">{selectedShippings.length}</span> {t("fromitems")}
                </span>
                <button
                  onClick={() => setShowDeleteAllModal(true)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  {t("deleteAll")}
                </button>
              </div>
            )}

            <div className="border border-gray-200 rounded-lg  overflow-hidden">
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
                            aria-label="Select all shipping providers"
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
                        {t("shippingProvider")}
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
                      <td className="px-3 py-3 border-t text-15 text-gray-500 border-r cursor-pointer">
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="hidden peer"
                              checked={selectedShippings.includes(item.id)}
                              onChange={(e) =>
                                handleSelectShipping(item.id, e.target.checked)
                              }
                              aria-label="Select shipping provider"
                            />
                            <span
                              className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                                selectedShippings.includes(item.id)
                                  ? "border-primary bg-primary"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedShippings.includes(item.id) && (
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
                      <td className="text-center px-3 py-3 border-l border-r">
                        <div className="flex justify-center items-center">
                          <DeleteShipping
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
            <Pagination
              pageCount={pageCount}
              onPageChange={handlePageClick}
              currentPage={currentPage}
              isRTL={isRTL}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
            />
          </>
        )}
      </section>
      <DeleteMultipleProviders
        isOpen={showDeleteAllModal}
        onClose={() => setShowDeleteAllModal(false)}
        onConfirm={handleDeleteMultiple}
        count={selectedShippings.length}
      />
    </div>
  );
}
export default ShippingProviders;