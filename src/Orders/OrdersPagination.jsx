import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const OrdersPagination = ({ 
  pagination, 
  handlePageClick 
}) => (
  <ReactPaginate
    pageCount={pagination.total_pages}
    onPageChange={handlePageClick}
    forcePage={pagination.current_page - 1}
    containerClassName="flex items-center justify-end mt-5 space-x-1 text-gray-400 text-14"
    pageClassName="px-3 py-1 rounded"
    activeClassName="bg-customOrange-lightOrange text-primary"
    previousLabel={<ChevronLeft className="w-5 h-5 text-primary"/>}
    nextLabel={<ChevronRight className="w-5 h-5 text-primary" />}
    previousClassName={`px-3 py-1 rounded ${
      !pagination.prev_page_url
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-gray-200"
    }`}
    nextClassName={`px-3 py-1 rounded ${
      !pagination.next_page_url
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-gray-200"
    }`}
    disabledClassName="opacity-50 cursor-not-allowed"
  />
);