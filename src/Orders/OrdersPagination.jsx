import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
export const OrdersPagination = ({ pagination, handlePageClick }) => {
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <ReactPaginate
      pageCount={pagination.total_pages}
      onPageChange={handlePageClick}
      forcePage={pagination.current_page - 1}
      containerClassName="flex items-center justify-end mt-5  text-gray-400 text-14"
      pageClassName="px-3 py-1 rounded"
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
      previousClassName={`px-3 py-1 rounded ${
        !pagination.prev_page_url ? "opacity-50 cursor-not-allowed" : ""
      }`}
      nextClassName={`px-3 py-1 rounded ${
        !pagination.next_page_url ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
};
