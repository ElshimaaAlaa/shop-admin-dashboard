import { Search } from "lucide-react";

export const InvoiceSearch = ({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
}) => (
  <div className="relative w-full mt-3">
    <Search
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
      color="#E0A75E"
    />
    <input
      type="text"
      placeholder="Search"
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(0);
      }}
      className="w-full h-12 pl-10 pr-4 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-2 border-gray-200 bg-gray-50 placeholder:text-15 focus:border-primary"
    />
  </div>
);