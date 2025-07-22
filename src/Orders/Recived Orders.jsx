import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { receivedOrders } from "../ApiServices/received-orders";
import { OrdersStatistics } from "./OrdersStatistics";
import { OrdersSearch } from "./OrdersSearch";
import { OrdersTable } from "./OrdersTable";
import { OrdersPagination } from "./OrdersPagination";
import { useTranslation } from "react-i18next";
function ReceivedOrders() {
  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 5,
    total: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  useEffect(() => {
    const fetchReceivedOrder = async () => {
      setIsLoading(true);
      try {
        const response = await receivedOrders(pagination.current_page);
        setOrders(response.orders || []);
        setStatistics(response.statistics || {});
        setPagination((prev) => ({
          ...prev,
          total: response.pagination?.total || response.orders?.length || 0,
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

  const handlePageClick = ({ selected }) => {
    setPagination((prev) => ({ ...prev, current_page: selected + 1 }));
  };

  return (
    <div className="bg-gray-100 py-5 mx-5">
      <Helmet>
        <title>{t("orders")} | {t("vertex")}</title>
      </Helmet>

      <section className="bg-white mb-3 p-5 rounded-md">
        <p className="text-gray-400 text-13">{t("ordersHead")}</p>
        <h1 className="text-17 mt-2 font-bold">{t("recivedOrders")}</h1>
      </section>

      <div className="bg-white rounded-md p-5 mb-5">
        <OrdersStatistics statistics={statistics} />
        <h2 className="text-[18px] font-bold mt-5">{t("orders")}</h2>
        <OrdersSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          debouncedSearchQuery={debouncedSearchQuery}
        />
        <OrdersTable
          filteredOrders={filteredOrders}
          isLoading={isLoading}
          error={error}
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
