import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { receivedOrders } from "../ApiServices/received-orders";
import { OrdersStatistics } from "./OrdersStatistics";
import { OrdersSearch } from "./OrdersSearch";
import { OrdersTable } from "./OrdersTable";
import { OrdersPagination } from "./OrdersPagination";
import { useTranslation } from "react-i18next";
import Header from "../Components/Header/Header";

function ReceivedOrders() {
  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { t } = useTranslation();
  
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,  
    total: 0,
    last_page: 1
  });

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter orders based on search query
  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => {
        if (!debouncedSearchQuery) return true;
        const searchTerm = debouncedSearchQuery.toLowerCase();
        return [
          order.order_number?.toString().toLowerCase(),
          order.status_name?.toString().toLowerCase(),
          order.payment_status?.toString().toLowerCase(),
          order.total?.toString().toLowerCase(),
          order.date?.toString().toLowerCase(),
        ].some((field) => field?.includes(searchTerm));
      })
    : [];

  // Fetch orders from API
  useEffect(() => {
    const fetchReceivedOrder = async () => {
      setIsLoading(true);
      try {
        const response = await receivedOrders(pagination.current_page);
        setOrders(response.orders || []);
        setStatistics(response.statistics || {});
        
        setPagination(prev => ({
          ...prev,
          total: response.pagination?.total || response.orders?.length || 0,
          last_page: response.pagination?.last_page || 
                    Math.ceil((response.pagination?.total || response.orders?.length || 0) / prev.per_page) || 1
        }));
        
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReceivedOrder();
  }, [pagination.current_page]);

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setPagination(prev => ({ ...prev, current_page: selected + 1 }));
  };

  return (
    <div className="bg-gray-100 py-5 mx-5">
      <Helmet>
        <title>
          {t("orders")} | {t("vertex")}
        </title>
      </Helmet>
      
      <Header 
        subtitle={t("ordersHead")} 
        title={t("recivedOrders")} 
        className="mb-3"
      />
      
      <div className="bg-white rounded-md p-5 mb-5">
        <OrdersStatistics statistics={statistics} />
        <h2 className="text-[18px] font-bold mt-5">{t("orders")}</h2>
        
        <OrdersSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
        
        <OrdersTable
          filteredOrders={filteredOrders}
          isLoading={isLoading}
          error={error}
          debouncedSearchQuery={debouncedSearchQuery}
        />
          <OrdersPagination
            pagination={pagination}
            handlePageClick={handlePageClick}
          />
      </div>
    </div>
  );
}
export default ReceivedOrders;