import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const InvoicePagination = ({
  pageCount,
  handlePageClick,
  currentPage,
}) => {
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  return (
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
  );
};
