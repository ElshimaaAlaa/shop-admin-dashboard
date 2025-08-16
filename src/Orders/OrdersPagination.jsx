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
    <div className="mt-6 flex justify-end">
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          isRTL ? (
            <ChevronLeft className="w-5 h-5 text-primary" />
          ) : (
            <ChevronRight className="w-5 h-5 text-primary" />
          )
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pagination.last_page}
        previousLabel={
          isRTL ? (
            <ChevronRight className="w-5 h-5 text-primary" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-primary" />
          )
        }
        renderOnZeroPageCount={null}
        forcePage={pagination.current_page - 1}
        containerClassName="flex items-center gap-1"
        pageClassName="flex items-center justify-center w-8 h-8 rounded-md"
        activeClassName="bg-customOrange-lightOrange text-primary"
        previousClassName={`p-1 rounded ${pagination.current_page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
        nextClassName={`p-1 rounded ${pagination.current_page === pagination.last_page ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
        breakClassName="px-2"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};