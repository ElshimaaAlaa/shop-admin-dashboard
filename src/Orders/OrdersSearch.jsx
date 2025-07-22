import { Search } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
export const OrdersSearch = ({
  searchQuery,
  setSearchQuery,
  isSearching,
  debouncedSearchQuery,
  setIsSearching,
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full mt-3">
      <Search
        className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
        color="#E0A75E"
      />
      <input
        type="text"
        placeholder={t("search")}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setIsSearching(true);
        }}
        className="w-full h-12 pl-10 rtl:pr-10 pr-10 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-2 border-gray-200 bg-gray-50 placeholder:text-15 focus:border-primary"
      />
      {searchQuery && (
        <button
          onClick={() => {
            setSearchQuery("");
            setIsSearching(false);
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      )}
      {isSearching && debouncedSearchQuery !== searchQuery && (
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
          <ClipLoader size={20} color="#E0A75E" />
        </div>
      )}
    </div>
  );
};