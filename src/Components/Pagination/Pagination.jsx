import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

const Pagination = ({
  pageCount,
  onPageChange,
  currentPage,
  isRTL,
  containerClassName = "flex items-center  justify-end mt-5 text-gray-400 text-15",
  pageClassName = "mx-1 px- py-1 rounded-md ",
  activeClassName = "bg-customOrange-lightOrange text-primary px-3",
  previousClassName = "mx-1 px-1 py-1 font-bold text-primary ",
  nextClassName = "mx-1 px-1 py-1 font-bold text-primary ",
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