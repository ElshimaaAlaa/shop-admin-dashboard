import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const InvoicePagination = ({
  pageCount,
  handlePageClick,
  currentPage,
}) => (
  <ReactPaginate
    pageCount={pageCount}
    onPageChange={handlePageClick}
    forcePage={currentPage}
    containerClassName="flex items-center justify-end mt-5 text-gray-400 text-14"
    pageClassName="mx-1 px-3 py-1 rounded"
    activeClassName="bg-customOrange-lightOrange text-primary"
    previousLabel={<ChevronLeft className="w-4 h-4 text-center" />}
    nextLabel={<ChevronRight className="w-4 h-4" />}
    previousClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
    nextClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
  />
);
