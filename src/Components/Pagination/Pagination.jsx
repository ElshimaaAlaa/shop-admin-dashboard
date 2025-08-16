import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

const Pagination = ({
  pageCount,
  onPageChange,
  currentPage,
  isRTL,
  containerClassName = "flex items-center justify-end mt-5 text-gray-400 text-14",
  pageClassName = "mx-1 px-3 py-1 rounded",
  activeClassName = "bg-customOrange-lightOrange text-primary",
  previousClassName = "mx-1 px-3 py-1 font-bold text-primary text-18",
  nextClassName = "mx-1 px-3 py-1 font-bold text-primary text-18",
}) => {
  const { t } = useTranslation();

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      forcePage={currentPage}
      containerClassName={containerClassName}
      pageClassName={pageClassName}
      activeClassName={activeClassName}
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
      previousClassName={previousClassName}
      nextClassName={nextClassName}
      breakLabel="..."
      breakClassName={pageClassName}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      ariaLabelBuilder={(page) => t("goToPage", { page })}
    />
  );
};

export default Pagination;
