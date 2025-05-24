// Updated SearchContext.js
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Return as array to allow array destructuring
  return (
    <SearchContext.Provider value={[searchQuery, setSearchQuery]}>
      {children}
    </SearchContext.Provider>
  );
};

// Updated useSearch hook to maintain consistency
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context; // Now returns an array
};