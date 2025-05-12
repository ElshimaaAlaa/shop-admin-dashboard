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
    containerClassName="flex items-center justify-end mt-5 space-x-1"
    pageClassName="px-3 py-1 rounded hover:bg-gray-200"
    activeClassName="bg-customOrange-lightOrange text-primary"
    previousLabel={<ChevronLeft className="w-4 h-4" />}
    nextLabel={<ChevronRight className="w-4 h-4" />}
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