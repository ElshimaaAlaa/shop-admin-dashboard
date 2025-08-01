import { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchShippingProviders } from "../../ApiServices/ShippingProviders";
import DeleteShipping from "./DeleteShipping";
import AddShippingProvider from "./AddShippingProvider";
import { FaShippingFast } from "react-icons/fa";
import { useTranslation } from "react-i18next";
function ShippingProviders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shippingData, setShippingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
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
    setIsRTL(i18n.language === "ar");
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
    <div className="bg-gray-100 pb-10 flex flex-col h-[89vh] ">
      <Helmet>
        <title>
          {t("shippingProvider")} | {t("vertex")}
        </title>
      </Helmet>
      <section className="rounded-md p-5 mx-5 bg-white mt-5">
        <p className="text-gray-400 text-13">{t("shippingMenu")}</p>
        <h1 className="text-17 font-bold mt-2">{t("shippingProvider")}</h1>
      </section>
      <section className="rounded-md bg-customOrange-mediumOrange border mt-3 border-primary p-4 mx-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaShippingFast color="#E0A75E" size={22} />
          <p className="text-gray-500 text-15">{t("shippingProvider")}</p>
        </div>
        <p className="text-16 font-bold">{shippingData.length}</p>
      </section>
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
        ) : shippingData.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery ? t("noMatchResults") : t("noData")}
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
                        {t("shippingProvider")}
                      </p>
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
                        <p className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label="Select all categories"
                          />
                          {item.name}
                        </p>
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
      </section>
    </div>
  );
}
export default ShippingProviders;
