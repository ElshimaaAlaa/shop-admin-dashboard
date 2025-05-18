import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { receivedOrders } from "../ApiServices/received-orders";
import { OrdersStatistics } from "./OrdersStatistics";
import { OrdersSearch } from "./OrdersSearch";
import { OrdersTable } from "./OrdersTable";
import { OrdersPagination } from "./OrdersPagination";

function ReceivedOrders() {
  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    count: 0,
    per_page: 5,
    current_page: 1,
    total_pages: 1,
    next_page_url: null,
    prev_page_url: null,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => {
        if (!debouncedSearchQuery) return true;
        const searchTerm = debouncedSearchQuery.toLowerCase();
        const fieldsToSearch = [
          order.order_number?.toString().toLowerCase() || "",
          order.status_name?.toString().toLowerCase() || "",
          order.payment_status?.toString().toLowerCase() || "",
          order.total?.toString().toLowerCase() || "",
          order.date?.toString().toLowerCase() || "",
          order.items_count?.toString().toLowerCase() || "",
        ];
        return fieldsToSearch.some((field) => field.includes(searchTerm));
      })
    : [];

  useEffect(() => {
    const fetchReceivedOrder = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await receivedOrders(pagination.current_page);
        setOrders(response.orders || []);
        setStatistics(response.statistics || {});
        setPagination(
          response.pagination || {
            total: response.orders?.length || 0,
            count: response.orders?.length || 0,
            per_page: 5,
            current_page: 1,
            total_pages: 1,
            next_page_url: null,
            prev_page_url: null,
          }
        );
      } catch (error) {
        console.error("API call failed: ", error);
        setError(true);
        setOrders([]);
        setStatistics({});
      } finally {
        setIsLoading(false);
      }
    };
    fetchReceivedOrder();
  }, [pagination.current_page]);

  const handlePageClick = ({ selected }) => {
    setPagination((prev) => ({
      ...prev,
      current_page: selected + 1,
    }));
  };

  return (
    <div className="bg-gray-100 py-5 mx-5">
      <Helmet>
        <title>Orders | VERTEX</title>
      </Helmet>
      <section className="bg-white mb-3 p-5 rounded-md">
        <p className="text-gray-400 text-13">Menu / Orders / Received Orders</p>
        <h1 className="text-17 mt-2 font-bold">Received Orders</h1>
      </section>
      <div className="bg-white rounded-md p-5 mb-5">
        <OrdersStatistics statistics={statistics} />
        
        <h2 className="text-[18px] font-bold mt-5">Orders</h2>
        <OrdersSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearching={isSearching}
          debouncedSearchQuery={debouncedSearchQuery}
        />
        
        <OrdersTable
          filteredOrders={filteredOrders}
          isLoading={isLoading}
          error={error}
          searchQuery={searchQuery}
          debouncedSearchQuery={debouncedSearchQuery}
        />
        
        {filteredOrders.length > 0 && (
          <OrdersPagination
            pagination={pagination}
            handlePageClick={handlePageClick}
          />
        )}
      </div>
    </div>
  );
}

export default ReceivedOrders;