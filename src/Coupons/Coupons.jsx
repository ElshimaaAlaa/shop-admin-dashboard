import { useEffect, useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DeleteCoupons from "./DeleteCoupons";
import { ClipLoader } from "react-spinners";
import { fetchCoupons } from "../ApiServices/Coupons";
import { Helmet } from "react-helmet";
import SearchBar from "../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IoCalendarNumberOutline } from "react-icons/io5";
import AddNewCoupon from "./AddNewCoupons";

function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const getCoupons = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCoupons();
        setCoupons(data);
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCoupons();
  }, []);

  const handleDeleteCoupons = (categoryId) => {
    setCoupons((prevCoupons) => {
      const updatedCoupons = prevCoupons.filter(
        (category) => category.id !== categoryId
      );
      if (
        updatedCoupons.length <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
      return updatedCoupons;
    });
  };

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) =>
      coupon.coupon.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [coupons, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredCoupons.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredCoupons, indexOfFirstItem, indexOfLastItem]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const togglePublishedStatus = async (couponId) => {
    try {
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === couponId
            ? { ...coupon, published: !coupon.is_active }
            : coupon
        )
      );
    } catch (error) {
      console.error("Failed to update published status:", error);
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === couponId
            ? { ...coupon, published: !coupon.is_active }
            : coupon
        )
      );
    }
  };
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
  return (
    <div className="bg-gray-100 p-4 h-[89vh] pt-5">
      <Helmet>
        <title>
          {t("coupons")} | {t("vertex")}
        </title>
      </Helmet>
      <section className="bg-white p-5 rounded-md mb-3">
        <p className="text-gray-400 text-13">{t("couponsHead")}</p>
        <h1 className="font-bold text-17 mt-2">{t("coupons")}</h1>
      </section>
      <section className="bg-white p-5 rounded-md">
        <SearchBar
          value={searchQuery}
          onclick={() => setShowModal(true)}
          onchange={(e) => setSearchQuery(e.target.value)}
          text={t("addNewCoupon")}
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
        />
        <AddNewCoupon
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            // fetchData();
          }}
        />
        {error ? (
          <div className="text-red-500 text-center mt-10">{t("error")}</div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">{t("noData")}</div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-t border-b text-left rtl:text-right w-12">
                      <p className="flex  gap-2 items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all categories"
                        />
                        {t("codes")}
                      </p>
                    </th>
                    <th className="px-6 py-3 text-left border">
                      <p className="flex justify-between items-center">
                        {t("startDate")}
                      </p>
                    </th>
                    <th className="px-6 py-3 text-left border">
                      <p className="flex justify-between items-center">
                        {t("endDate")}
                      </p>
                    </th>
                    <th className="px-6 py-3 text-left border">
                      <p className="flex justify-between items-center">
                        {t("amount")}
                      </p>
                    </th>
                    <th className="px-6 py-3 text-left border">
                      <p className="flex justify-between items-center">
                        {t("publish")}
                      </p>
                    </th>

                    <th className="px-6 py-3 text-left w-5 border-t border-b">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((coupon) => {
                    return (
                      <tr key={coupon.id}>
                        <td className="px-3 py-3 border w-350">
                          <p className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4"
                              aria-label={`Select ${coupon.coupon}`}
                            />
                            {coupon.coupon}
                          </p>
                        </td>
                        <td className="flex gap-3 px-6 py-3 border-t text-gray-600">
                          <p className="flex items-center gap-2">
                            <IoCalendarNumberOutline
                              color="#69ABB5"
                              size={16}
                            />
                            {coupon.start_date || t()}
                          </p>
                        </td>

                        <td className="px-6 py-3 border-t border-l rtl:border-r">
                          <p className="flex items-center gap-2">
                            <IoCalendarNumberOutline
                              color="#69ABB5"
                              size={16}
                            />
                            {coupon.end_date || t()}
                          </p>
                        </td>
                        <td className="px-6 py-3 border-t border-l rtl:border-r">
                          <p className="flex items-center gap-2">
                            {coupon.discount_value || t()}
                          </p>
                        </td>
                        <td className="px-6 py-3 border-t border-l rtl:border-r">
                          <button
                            onClick={() => togglePublishedStatus(coupon.id)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                              coupon.is_active ? "bg-primary" : "bg-gray-300"
                            }`}
                            aria-label={`Toggle publish status for ${coupon.name}`}
                          >
                            <div
                              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                                coupon.is_active
                                  ? "translate-x-6 rtl:-translate-x-0 "
                                  : "translate-x-0 rtl:-translate-x-6"
                              }`}
                            />
                          </button>
                        </td>
                        <td className="px-6 py-3 w-10 border-t border-l rtl:border-r">
                          <div className="flex items-center justify-center gap-2">
                            <DeleteCoupons
                              couponId={coupon.id}
                              id={coupon.id}
                              onDelete={handleDeleteCoupons}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <ReactPaginate
              pageCount={Math.ceil(filteredCoupons.length / itemsPerPage)}
              onPageChange={({ selected }) => paginate(selected + 1)}
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
              previousClassName="mx-1 px-1 py-1 font-bold text-primary text-18 "
              nextClassName="mx-1 px-1 py-1 font-bold text-primary text-18"
            />
          </>
        )}
      </section>
    </div>
  );
}
export default Coupons;